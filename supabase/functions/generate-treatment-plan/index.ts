import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TreatmentPlanRequest {
  assessmentId: string;
  patientName: string;
  patientAge: number;
  analysisData: any;
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

    const { assessmentId, patientName, patientAge, analysisData }: TreatmentPlanRequest = await req.json();

    console.log('Generating treatment plan for assessment:', assessmentId);

    const systemPrompt = `Eres un cirujano oral y maxilofacial especializado en implantes dentales con más de 20 años de experiencia.
Tu rol es crear planes de tratamiento detallados, realistas y personalizados basados en el análisis clínico del paciente.

Considera:
- Protocolo clínico estándar para implantes
- Necesidad de tratamientos preparatorios (injertos óseos, extracciones, etc.)
- Timeline realista considerando períodos de cicatrización
- Tipo de implante más adecuado (inmediato vs diferido)
- Materiales recomendados (titanio vs zirconio)
- Cuidados pre y post operatorios específicos

El plan debe ser profesional, detallado y comprensible.`;

    const userPrompt = `Genera un plan de tratamiento detallado para el siguiente paciente:

Paciente: ${patientName}
Edad: ${patientAge} años
Nivel de éxito predicho: ${analysisData.successLevel}
Factores de riesgo: ${JSON.stringify(analysisData.riskFactors)}
Factores positivos: ${JSON.stringify(analysisData.positiveFactors)}

Por favor proporciona un plan de tratamiento en el siguiente formato JSON:

{
  "phases": [
    {
      "phase": 1,
      "name": "Nombre de la fase",
      "duration": "Duración estimada",
      "procedures": ["Procedimiento 1", "Procedimiento 2"],
      "description": "Descripción detallada de esta fase"
    }
  ],
  "estimatedTimeline": "Timeline total del tratamiento completo",
  "implantType": "Tipo de implante recomendado (inmediato/diferido) y justificación",
  "preparatoryProcedures": [
    "Procedimiento preparatorio 1 si es necesario",
    "Procedimiento preparatorio 2 si es necesario"
  ],
  "prePostCare": [
    "Cuidado pre-operatorio específico 1",
    "Cuidado post-operatorio específico 1"
  ]
}

IMPORTANTE:
- El plan debe tener al menos 3 fases realistas
- Incluye tiempos de cicatrización ósea si aplica
- Sé específico con los procedimientos
- Considera los factores de riesgo identificados`;

    console.log('Calling Lovable AI for treatment plan...');

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
    console.log('Treatment plan generated');

    const treatmentPlanData = JSON.parse(aiData.choices[0].message.content);

    // Guardar plan de tratamiento en la base de datos
    const { data: savedPlan, error: saveError } = await supabase
      .from('treatment_plans')
      .insert({
        assessment_id: assessmentId,
        phases: treatmentPlanData.phases,
        estimated_timeline: treatmentPlanData.estimatedTimeline,
        implant_type: treatmentPlanData.implantType,
        preparatory_procedures: treatmentPlanData.preparatoryProcedures,
        pre_post_care: treatmentPlanData.prePostCare
      })
      .select()
      .single();

    if (saveError) {
      console.error('Error saving treatment plan:', saveError);
      throw saveError;
    }

    console.log('Treatment plan saved successfully');

    return new Response(
      JSON.stringify({
        ...treatmentPlanData,
        planId: savedPlan.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error in generate-treatment-plan:', error);
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
