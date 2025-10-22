import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Answer {
  questionId: number;
  selectedValues: (string | number)[];
  score: number;
}

interface AssessmentData {
  patientName: string;
  patientAge: number;
  answers: Answer[];
  assessmentId: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    const { patientName, patientAge, answers, assessmentId }: AssessmentData = await req.json();

    console.log('Analyzing assessment for:', patientName, 'Age:', patientAge);
    console.log('Assessment ID:', assessmentId);
    console.log('Answers:', JSON.stringify(answers, null, 2));

    // Calcular score total
    const totalScore = answers.reduce((sum, a) => sum + a.score, 0);

    // Crear contexto detallado para Claude
    const answersContext = answers.map(a => {
      return `Pregunta ${a.questionId}: Respuestas seleccionadas: ${a.selectedValues.join(', ')} (Score: ${a.score})`;
    }).join('\n');

    const systemPrompt = `Eres un experto en odontología especializado en implantes dentales con amplio conocimiento en evaluación de candidatos para tratamientos con implantes. 
Tu rol es analizar las respuestas del cuestionario de evaluación y proporcionar un análisis profundo, personalizado y basado en evidencia científica.

Considera factores como:
- Salud general y condiciones médicas
- Salud oral y periodontal
- Densidad ósea
- Hábitos que afectan la osteointegración
- Factores de riesgo (tabaquismo, diabetes, etc.)
- Higiene oral
- Expectativas del paciente

Tu análisis debe ser empático, educativo y claro para un paciente no especialista.`;

    const userPrompt = `Analiza la siguiente evaluación de candidato para implantes dentales:

Paciente: ${patientName}
Edad: ${patientAge} años
Score Total: ${totalScore}

Respuestas del cuestionario:
${answersContext}

Por favor proporciona un análisis estructurado en el siguiente formato JSON:

{
  "analysisText": "Análisis general completo y personalizado del caso (mínimo 200 palabras)",
  "riskFactors": [
    "Factor de riesgo 1 identificado",
    "Factor de riesgo 2 identificado"
  ],
  "positiveFactors": [
    "Factor positivo 1",
    "Factor positivo 2"
  ],
  "personalizedExplanation": "Explicación personalizada para el paciente en lenguaje claro y empático",
  "clinicalRecommendations": [
    "Recomendación clínica específica 1",
    "Recomendación clínica específica 2"
  ],
  "successLevel": 1-4 (nivel de éxito predicho, donde 1 es excelente y 4 es requiere tratamiento previo),
  "prediction": "Descripción corta del nivel de éxito"
}

IMPORTANTE: 
- Sé específico con los factores de riesgo y positivos encontrados
- La explicación personalizada debe ser comprensible para el paciente
- Las recomendaciones deben ser accionables
- Base el nivel de éxito en la evidencia científica actual`;

    console.log('Calling Lovable AI with Claude...');

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API Error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Límite de solicitudes alcanzado. Por favor intenta más tarde.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Créditos insuficientes. Por favor contacta al administrador.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(`AI API error: ${errorText}`);
    }

    const aiData = await aiResponse.json();
    console.log('AI Response received');

    const analysisData = JSON.parse(aiData.choices[0].message.content);
    console.log('Parsed analysis:', analysisData);

    // Guardar análisis en la base de datos
    const { data: savedAnalysis, error: saveError } = await supabase
      .from('ai_analysis')
      .insert({
        assessment_id: assessmentId,
        analysis_text: analysisData.analysisText,
        risk_factors: analysisData.riskFactors,
        positive_factors: analysisData.positiveFactors,
        personalized_explanation: analysisData.personalizedExplanation,
        clinical_recommendations: analysisData.clinicalRecommendations
      })
      .select()
      .single();

    if (saveError) {
      console.error('Error saving analysis:', saveError);
      throw saveError;
    }

    // Actualizar assessment con el nivel de éxito
    const { error: updateError } = await supabase
      .from('assessments')
      .update({
        success_level: analysisData.successLevel,
        total_score: totalScore,
        status: 'completed',
        completed_at: new Date().toISOString()
      })
      .eq('id', assessmentId);

    if (updateError) {
      console.error('Error updating assessment:', updateError);
      throw updateError;
    }

    console.log('Analysis saved successfully');

    return new Response(
      JSON.stringify({
        ...analysisData,
        totalScore,
        analysisId: savedAnalysis.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error in analyze-assessment:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Error desconocido',
        details: error
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
