
// Function to get detailed explanations for each question
export function getDetailedExplanation(questionId: number) {
  const explanations = {
    1: {
      importance: "El tabaquismo es uno de los factores más significativos que afectan negativamente los resultados de los implantes dentales.",
      impact: "El tabaco reduce el flujo sanguíneo a las encías y huesos, disminuye la capacidad de cicatrización y aumenta el riesgo de infecciones. Los componentes tóxicos del tabaco interfieren directamente con el proceso de oseointegración (fusión del implante con el hueso).",
      clinicalImplications: [
        "Tasa de fracaso de implantes 2-3 veces mayor en fumadores",
        "Mayor riesgo de periimplantitis (infección alrededor del implante)",
        "Cicatrización más lenta y menos predecible",
        "Mayor pérdida ósea alrededor del implante con el tiempo"
      ],
      professionalAdvice: "Se recomienda suspender el consumo de tabaco al menos 1 semana antes y 2 meses después de la cirugía de implantes. Idealmente, usar esta oportunidad para dejar de fumar permanentemente."
    },
    2: {
      importance: "La diabetes afecta la cicatrización de tejidos y puede comprometer la respuesta inmune, factores fundamentales para el éxito de los implantes.",
      impact: "La diabetes mal controlada reduce la capacidad del cuerpo para combatir infecciones, altera la cicatrización y puede comprometer la calidad ósea. Todo esto puede afectar la oseointegración del implante.",
      clinicalImplications: [
        "Mayor riesgo de infecciones post-operatorias",
        "Cicatrización más lenta de tejidos blandos y duros",
        "Posible retraso en los tiempos de carga del implante",
        "Mayor vigilancia necesaria durante la fase de mantenimiento"
      ],
      professionalAdvice: "Los pacientes con diabetes bien controlada (HbA1c < 7%) pueden recibir implantes con tasas de éxito similares a los no diabéticos. Es esencial mantener un control glucémico estricto antes, durante y después del procedimiento."
    },
    3: {
      importance: "El bruxismo (rechinar o apretar los dientes) somete a los implantes y sus componentes protésicos a fuerzas excesivas que pueden comprometer su éxito a largo plazo.",
      impact: "Las fuerzas generadas durante el bruxismo pueden ser hasta 6 veces mayores que durante la masticación normal. Estas fuerzas excesivas pueden provocar aflojamiento de componentes, fracturas de la porcelana o incluso fracaso del implante.",
      clinicalImplications: [
        "Mayor riesgo de complicaciones mecánicas (aflojamiento de tornillos, fracturas)",
        "Posible pérdida ósea acelerada alrededor del implante",
        "Necesidad de componentes más robustos y diseños específicos",
        "Mayor frecuencia de mantenimiento y revisiones"
      ],
      professionalAdvice: "El uso de una férula de descarga nocturna (plano oclusal) es fundamental para proteger los implantes. En casos severos, puede ser necesario considerar un mayor número de implantes o materiales más resistentes."
    },
    4: {
      importance: "El tiempo transcurrido desde la pérdida dental influye directamente en la cantidad y calidad del hueso disponible para colocar implantes.",
      impact: "Tras la extracción dental, el hueso alveolar comienza a reabsorberse. El 50% del ancho óseo se pierde en los primeros 12 meses, y este proceso continúa a un ritmo más lento posteriormente. La calidad ósea también puede deteriorarse con el tiempo.",
      clinicalImplications: [
        "Mayor probabilidad de necesitar procedimientos de aumento óseo",
        "Posible comprometimiento estético por deficiencias de volumen",
        "Mayor complejidad quirúrgica",
        "Potencial aumento de costos y tiempo de tratamiento"
      ],
      professionalAdvice: "Idealmente, la planificación de implantes debería iniciarse poco después de la pérdida dental. Para casos de pérdida antigua, existen técnicas avanzadas de regeneración ósea que pueden recuperar el volumen perdido."
    },
    5: {
      importance: "La cantidad de dientes a reemplazar determina el diseño del plan de tratamiento, número de implantes y tipo de prótesis más adecuados.",
      impact: "El reemplazo de múltiples dientes requiere consideraciones biomecánicas específicas para distribuir adecuadamente las fuerzas masticatorias y garantizar la longevidad del tratamiento.",
      clinicalImplications: [
        "Diferentes relaciones implante-corona según el caso",
        "Consideraciones estéticas más complejas en zonas múltiples",
        "Necesidad de evaluar la oclusión global",
        "Diferentes opciones protésicas disponibles (coronas individuales vs. puentes)"
      ],
      professionalAdvice: "No siempre es necesario un implante por cada diente perdido. En muchos casos, se pueden utilizar diseños optimizados que requieren menos implantes, reduciendo costos y complejidad sin comprometer la funcionalidad."
    },
    6: {
      importance: "Cada zona de la boca presenta diferentes características de hueso, estética y fuerzas masticatorias, lo que influye directamente en el enfoque quirúrgico y protésico.",
      impact: "La densidad ósea varía significativamente entre las diferentes zonas de la boca. El maxilar posterior suele tener la menor densidad, mientras que la mandíbula anterior presenta la mayor. Esto afecta la estabilidad inicial del implante y los protocolos de carga.",
      clinicalImplications: [
        "Diferentes protocolos quirúrgicos según la zona",
        "Variación en los tiempos de oseointegración",
        "Consideraciones estéticas específicas en zona anterior",
        "Posible necesidad de técnicas avanzadas en zonas posteriores"
      ],
      professionalAdvice: "La planificación 3D y las guías quirúrgicas personalizadas han revolucionado la precisión en la colocación de implantes en todas las zonas, permitiendo aprovechar al máximo el hueso disponible y optimizar resultados estéticos y funcionales."
    },
    7: {
      importance: "Las condiciones orales actuales pueden indicar problemas subyacentes que afectarían negativamente al éxito de los implantes si no se tratan previamente.",
      impact: "Condiciones como caries, enfermedad periodontal activa o movilidad dental sugieren un entorno oral desfavorable que podría comprometer la salud de los implantes si no se estabiliza primero.",
      clinicalImplications: [
        "Necesidad de fase higiénica previa al tratamiento con implantes",
        "Posible modificación del plan de tratamiento",
        "Mayor riesgo de complicaciones si no se tratan estos problemas",
        "Importancia del mantenimiento periodontal a largo plazo"
      ],
      professionalAdvice: "Antes de proceder con los implantes, es fundamental tratar todas las patologías orales existentes para crear un ambiente favorable. Un enfoque integral mejora significativamente el pronóstico a largo plazo."
    },
    8: {
      importance: "La causa de la pérdida dental puede revelar factores de riesgo subyacentes que podrían afectar también a los implantes si no se controlan adecuadamente.",
      impact: "Si la pérdida dental fue causada por enfermedad periodontal, existe un riesgo mayor de desarrollar periimplantitis (infección similar alrededor de los implantes). Si fue por trauma, podrían existir consideraciones específicas de volumen óseo o tejidos blandos.",
      clinicalImplications: [
        "Protocolos específicos según etiología de la pérdida",
        "Mayor vigilancia en casos de antecedentes de enfermedad periodontal",
        "Posible necesidad de injertos en casos de trauma severo",
        "Educación personalizada para prevenir problemas similares"
      ],
      professionalAdvice: "Identificar y controlar la causa original de la pérdida dental es crucial para el éxito a largo plazo. Esto podría incluir terapia periodontal, control de hábitos parafuncionales o estabilización de la oclusión."
    },
    9: {
      importance: "La higiene oral es el factor más importante para el mantenimiento a largo plazo de los implantes, incluso más que las consideraciones técnicas del tratamiento.",
      impact: "Una higiene deficiente lleva a la acumulación de biofilm (placa bacteriana) alrededor del implante, lo que puede provocar inflamación de tejidos blandos (mucositis) y eventualmente periimplantitis con pérdida ósea irreversible.",
      clinicalImplications: [
        "Mayor riesgo de complicaciones biológicas con higiene deficiente",
        "Necesidad de programas de mantenimiento personalizados",
        "Posible modificación de diseños protésicos para facilitar la higiene",
        "Importancia de revisiones profesionales regulares"
      ],
      professionalAdvice: "Se recomienda cepillado al menos dos veces al día con técnicas específicas, uso de cepillos interdentales o irrigadores, y visitas de mantenimiento profesional cada 3-6 meses según el perfil de riesgo individual."
    },
    10: {
      importance: "La motivación del paciente influye en sus expectativas, compromiso con el tratamiento y satisfacción final con los resultados.",
      impact: "Entender las motivaciones permite personalizar el enfoque comunicativo, educacional y terapéutico, asegurando que los resultados se alineen con las expectativas del paciente.",
      clinicalImplications: [
        "Enfoque personalizado en aspectos estéticos vs. funcionales",
        "Adaptación de la comunicación a las expectativas individuales",
        "Mejor adherencia al tratamiento cuando se atienden las preocupaciones principales",
        "Mayor satisfacción a largo plazo"
      ],
      professionalAdvice: "Es importante mantener expectativas realistas sobre los resultados del tratamiento. Los implantes modernos ofrecen resultados excepcionales, pero tienen limitaciones específicas que deben comprenderse desde el inicio."
    },
    11: {
      importance: "Identificar las preocupaciones principales del paciente permite abordarlas directamente durante la planificación y ejecución del tratamiento.",
      impact: "Muchas preocupaciones comunes sobre los implantes (como el dolor) están basadas en ideas erróneas. Abordarlas adecuadamente mejora la experiencia del paciente y reduce la ansiedad.",
      clinicalImplications: [
        "Adaptación de protocolos anestésicos y de sedación según nivel de ansiedad",
        "Estrategias de financiamiento para preocupaciones económicas",
        "Planificación de tiempos de tratamiento según urgencia percibida",
        "Educación específica para disipar mitos comunes"
      ],
      professionalAdvice: "La odontología implantológica moderna ofrece soluciones para prácticamente todas las preocupaciones comunes. Desde técnicas mínimamente invasivas hasta opciones de sedación avanzadas, existen alternativas para hacer el tratamiento cómodo y accesible."
    }
  };

  return explanations[questionId as keyof typeof explanations] || {
    importance: "Esta información es relevante para tu evaluación.",
    impact: "Este factor puede influir en el éxito de tu tratamiento con implantes.",
    clinicalImplications: [],
    professionalAdvice: "Consulta con un especialista para una evaluación personalizada."
  };
}
