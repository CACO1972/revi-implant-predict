
export const treatmentTypes = {
  unitario: {
    title: "Implante Unitario",
    icon: "🦷",
    description: "Reemplazo de un solo diente perdido",
    conventional: {
      title: "Carga Convencional",
      duration: "4-6 meses",
      sessions: "3-4 sesiones",
      success: "98%",
      healing: "Cicatrización completa antes de la corona",
      advantages: [
        "Mayor tiempo de osteointegración",
        "Menor riesgo de complicaciones",
        "Protocolo más predecible"
      ],
      disadvantages: [
        "Más tiempo sin diente",
        "Mayor número de citas",
        "Posible uso de prótesis temporal"
      ],
      price: "$800-1200"
    },
    immediate: {
      title: "Carga Inmediata",
      duration: "1-2 días",
      sessions: "1-2 sesiones",
      success: "95%",
      healing: "Corona provisional el mismo día",
      advantages: [
        "Diente inmediato",
        "Menos citas",
        "Mejor estética desde el inicio"
      ],
      disadvantages: [
        "Requiere buena calidad ósea",
        "Mayor costo inicial",
        "Restricciones alimentarias"
      ],
      price: "$1200-1800"
    }
  },
  multiple: {
    title: "Implantes Múltiples",
    icon: "🦷🦷🦷",
    description: "Reemplazo de varios dientes adyacentes",
    conventional: {
      title: "Carga Convencional",
      duration: "4-8 meses",
      sessions: "4-6 sesiones",
      success: "97%",
      healing: "Cicatrización completa antes del puente",
      advantages: [
        "Osteointegración óptima",
        "Menor riesgo por implante",
        "Protocolo bien establecido"
      ],
      disadvantages: [
        "Período prolongado sin dientes",
        "Más visitas al dentista",
        "Prótesis temporal necesaria"
      ],
      price: "$2500-4500"
    },
    immediate: {
      title: "Carga Inmediata",
      duration: "2-3 días",
      sessions: "2-3 sesiones",
      success: "93%",
      healing: "Puente provisional inmediato",
      advantages: [
        "Función inmediata",
        "Estética preservada",
        "Menos tiempo de tratamiento"
      ],
      disadvantages: [
        "Selección estricta de casos",
        "Mayor complejidad técnica",
        "Cuidados postoperatorios rigurosos"
      ],
      price: "$4000-7000"
    }
  },
  total: {
    title: "All-on-4",
    icon: "😁",
    description: "Rehabilitación completa con 4 implantes",
    conventional: {
      title: "Carga Convencional",
      duration: "6-12 meses",
      sessions: "5-8 sesiones",
      success: "96%",
      healing: "Prótesis removible durante cicatrización",
      advantages: [
        "Integración ósea completa",
        "Ajuste perfecto de la prótesis",
        "Menor riesgo de fracaso"
      ],
      disadvantages: [
        "Largo período de adaptación",
        "Prótesis removible temporal",
        "Múltiples citas de ajuste"
      ],
      price: "$8000-12000"
    },
    immediate: {
      title: "Carga Inmediata",
      duration: "24-48 horas",
      sessions: "2-4 sesiones",
      success: "92%",
      healing: "Prótesis fija provisional inmediata",
      advantages: [
        "Dientes fijos inmediatos",
        "Una sola cirugía",
        "Recuperación más rápida"
      ],
      disadvantages: [
        "Criterios de selección estrictos",
        "Mayor costo inicial",
        "Dieta líquida inicial"
      ],
      price: "$12000-18000"
    }
  }
};

export const reconstructionTreatments = [
  {
    name: "Injerto Óseo",
    description: "Aumento del volumen óseo insuficiente",
    duration: "3-6 meses",
    success: "95%",
    indication: "Pérdida ósea vertical u horizontal significativa"
  },
  {
    name: "Elevación de Seno",
    description: "Aumento óseo en sector posterior superior",
    duration: "4-8 meses", 
    success: "94%",
    indication: "Altura ósea insuficiente en molares superiores"
  },
  {
    name: "Injerto de Tejido Blando",
    description: "Aumento del grosor gingival",
    duration: "2-4 meses",
    success: "97%",
    indication: "Encía delgada o recesiones gingivales"
  },
  {
    name: "Regeneración Ósea Guiada",
    description: "Técnica con membranas para regenerar hueso",
    duration: "4-6 meses",
    success: "93%",
    indication: "Defectos óseos localizados o pérdida ósea compleja"
  }
];
