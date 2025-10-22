import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CostEstimateRequest {
  assessmentId: string;
  treatmentPlanData: any;
  patientAge: number;
  location?: string;
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

    const { assessmentId, treatmentPlanData, patientAge, location = 'Chile' }: CostEstimateRequest = await req.json();

    console.log('Estimating costs for assessment:', assessmentId);

    const systemPrompt = `Eres un experto en costos y gestión de tratamientos dentales en Chile con conocimiento actualizado del mercado odontológico.
Tu rol es proporcionar estimaciones de costo realistas y detalladas para tratamientos con implantes dentales.

Considera:
- Precios de mercado en Chile (2024)
- Diferencias entre clínicas privadas, instituciones y centros especializados
- Costos de materiales (implantes, pilares, coronas)
- Costos de procedimientos preparatorios
- Honorarios profesionales
- Exámenes pre-operatorios
- Medicamentos y cuidados post-operatorios
- Opciones de financiamiento disponibles

Proporciona rangos de precios realistas en pesos chilenos (CLP).`;

    const userPrompt = `Estima los costos del siguiente plan de tratamiento:

Ubicación: ${location}
Edad del paciente: ${patientAge} años
Fases del tratamiento: ${JSON.stringify(treatmentPlanData.phases)}
Tipo de implante: ${treatmentPlanData.implantType}
Procedimientos preparatorios: ${JSON.stringify(treatmentPlanData.preparatoryProcedures)}

Por favor proporciona una estimación de costos en el siguiente formato JSON:

{
  "totalMin": monto_minimo_en_CLP,
  "totalMax": monto_maximo_en_CLP,
  "breakdown": [
    {
      "item": "Nombre del item/procedimiento",
      "costMin": monto_minimo,
      "costMax": monto_maximo,
      "description": "Descripción de qué incluye"
    }
  ],
  "financingOptions": [
    {
      "option": "Nombre de opción de financiamiento",
      "description": "Descripción de la opción",
      "example": "Ejemplo de cuotas o pago"
    }
  ],
  "notes": "Notas importantes sobre los costos y factores que pueden afectarlos"
}

IMPORTANTE:
- Usa precios realistas del mercado chileno
- Incluye todos los componentes del costo
- Proporciona rangos (mínimo y máximo) realistas
- Incluye al menos 3 opciones de financiamiento comunes en Chile
- Sé transparente sobre qué puede aumentar o disminuir los costos`;

    console.log('Calling Lovable AI for cost estimation...');

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
    console.log('Cost estimation generated');

    const costData = JSON.parse(aiData.choices[0].message.content);

    // Guardar estimación de costos en la base de datos
    const { data: savedCost, error: saveError } = await supabase
      .from('cost_estimates')
      .insert({
        assessment_id: assessmentId,
        total_min: costData.totalMin,
        total_max: costData.totalMax,
        currency: 'CLP',
        breakdown: costData.breakdown,
        financing_options: costData.financingOptions
      })
      .select()
      .single();

    if (saveError) {
      console.error('Error saving cost estimate:', saveError);
      throw saveError;
    }

    console.log('Cost estimate saved successfully');

    return new Response(
      JSON.stringify({
        ...costData,
        estimateId: savedCost.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error in estimate-costs:', error);
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
