
export const treatmentTypes = {
  unitario: {
    title: "Implante Unitario",
    description: "Reemplazo de un solo diente",
    icon: "🦷",
    conventional: {
      duration: "3-4 meses",
      success: "96%",
      cost: "$$",
      steps: ["Cirugía de implante", "Cicatrización (3-4 meses)", "Corona definitiva"],
      benefits: ["Máxima predictibilidad", "Mejor integración ósea"],
      drawbacks: ["Tiempo más largo", "Sin diente temporal estético"]
    },
    immediate: {
      duration: "1 día + 3 meses",
      success: "92%",
      cost: "$$$",
      steps: ["Cirugía + corona temporal", "Cicatrización (3 meses)", "Corona definitiva"],
      benefits: ["Estética inmediata", "Una sola cirugía"],
      drawbacks: ["Mayor costo", "Requiere condiciones ideales"]
    }
  },
  multiple: {
    title: "Implantes Múltiples",
    description: "Reemplazo de 2-6 dientes",
    icon: "🦷🦷🦷",
    conventional: {
      duration: "4-6 meses",
      success: "95%",
      cost: "$$$",
      steps: ["Cirugía de implantes", "Cicatrización (4-6 meses)", "Puente o coronas"],
      benefits: ["Alta predictibilidad", "Mejor distribución de fuerzas"],
      drawbacks: ["Tiempo prolongado", "Múltiples citas"]
    },
    immediate: {
      duration: "1-2 días + 4 meses",
      success: "90%",
      cost: "$$$$",
      steps: ["Cirugía + puente temporal", "Cicatrización (4 meses)", "Restauración definitiva"],
      benefits: ["Función inmediata", "Menos molestias"],
      drawbacks: ["Mayor complejidad", "Criterios estrictos"]
    }
  },
  total: {
    title: "All-on-4 / Rehabilitación Total",
    description: "Arcada completa con 4-6 implantes",
    icon: "😁",
    conventional: {
      duration: "6-8 meses",
      success: "94%",
      cost: "$$$$",
      steps: ["Cirugía de implantes", "Cicatrización (6-8 meses)", "Prótesis definitiva"],
      benefits: ["Máxima estabilidad", "Resultado duradero"],
      drawbacks: ["Tiempo muy largo", "Sin prótesis funcional"]
    },
    immediate: {
      duration: "1 día + 6 meses",
      success: "89%",
      cost: "$$$$$",
      steps: ["Cirugía + prótesis temporal", "Cicatrización (6 meses)", "Prótesis definitiva"],
      benefits: ["Dientes el mismo día", "Calidad de vida inmediata"],
      drawbacks: ["Más costoso", "Dieta especial inicial"]
    }
  }
};

export const reconstructionTreatments = [
  {
    name: "Injerto Óseo",
    description: "Regeneración de hueso perdido",
    duration: "4-6 meses",
    indication: "Falta de volumen óseo",
    success: "92%"
  },
  {
    name: "Elevación de Seno",
    description: "Aumento de hueso en zona posterior superior",
    duration: "6-8 meses",
    indication: "Poco hueso en premolares/molares superiores",
    success: "94%"
  },
  {
    name: "Regeneración Guiada",
    description: "Técnica con membranas para regenerar tejidos",
    duration: "6-9 meses",
    indication: "Defectos óseos localizados",
    success: "88%"
  },
  {
    name: "Injerto de Tejido Blando",
    description: "Mejora de encías alrededor del implante",
    duration: "2-3 meses",
    indication: "Falta de encía adherida",
    success: "96%"
  }
];
