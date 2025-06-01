
import { motion } from "framer-motion";
import { CheckCircle, Clock, Camera, Zap, Heart } from "lucide-react";

export default function ClinicalFlowDemo() {
  const stages = [
    {
      id: 1,
      title: "Evaluación inicial",
      description: "Diagnóstico completo del caso mediante examen clínico detallado",
      icon: CheckCircle,
      image: "/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png", // Logo ImplantDX
      status: "completed",
      timeframe: "Hoy",
      color: "emerald"
    },
    {
      id: 2,
      title: "Toma de RX y evaluación especialista",
      description: "Radiografías, tomografías y análisis por especialista en implantología",
      icon: Camera,
      image: "/lovable-uploads/19481b4c-abe4-45b5-849c-180b7603e111.png", // Imagen disponible
      status: "current",
      timeframe: "1-2 semanas",
      color: "blue"
    },
    {
      id: 3,
      title: "Planificación y ejecución cirugía",
      description: "Diseño digital del tratamiento y colocación quirúrgica de los implantes",
      icon: Zap,
      image: "/lovable-uploads/3d3b8ce7-1789-4fd0-ba94-16d161132e7e.png", // Imagen disponible
      status: "pending",
      timeframe: "2-4 semanas",
      color: "purple"
    },
    {
      id: 4,
      title: "Período de oseointegración",
      description: "Tiempo de espera para la integración del implante con el hueso",
      icon: Clock,
      image: "/lovable-uploads/4340a4e4-45cd-474b-ad0d-10e701b4f2b4.png", // Imagen disponible
      status: "pending",
      timeframe: "2-6 meses",
      color: "green"
    },
    {
      id: 5,
      title: "Rehabilitación definitiva",
      description: "Colocación de la corona o prótesis final sobre los implantes",
      icon: Heart,
      image: "/lovable-uploads/846506fe-9bf3-421d-913e-bfd48b9feb05.png", // Imagen disponible
      status: "pending",
      timeframe: "2-4 semanas",
      color: "gold"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-emerald-500";
      case "current": return "bg-[#178582] animate-pulse";
      case "pending": return "bg-white/20";
      default: return "bg-white/20";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "✅ Completado";
      case "current": return "🎯 TÚ ESTÁS AQUÍ";
      case "pending": return "⏳ Pendiente";
      default: return "";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header con Río */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          {/* Avatar de Río */}
          <motion.div
            animate={{ 
              y: [0, -5, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-16 h-16 mr-4"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-blue-600 p-2 shadow-glow">
              <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="45" fill="#3B82F6" />
                  <path d="M 30 30 Q 50 10 70 30" stroke="#60A5FA" strokeWidth="8" fill="none" />
                  <circle cx="35" cy="45" r="6" fill="white" />
                  <circle cx="65" cy="45" r="6" fill="white" />
                  <circle cx="35" cy="45" r="3" fill="#1E3A8A" />
                  <circle cx="65" cy="45" r="3" fill="#1E3A8A" />
                  <path d="M 43 60 Q 50 70 57 60" stroke="#F59E0B" strokeWidth="3" fill="none" />
                </svg>
              </div>
            </div>
          </motion.div>
          
          <div>
            <h3 className="text-2xl text-[#178582] font-semibold mb-1">Tu viaje hacia una nueva sonrisa</h3>
            <p className="text-white/80 text-sm">Cada etapa diseñada para tu éxito</p>
          </div>
        </div>
      </div>
      
      {/* Timeline de etapas */}
      <div className="relative">
        {/* Línea de tiempo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#178582] via-[#BFA181] to-white/20"></div>
        
        {stages.map((stage, index) => (
          <motion.div 
            key={stage.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className={`relative mb-12 flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
          >
            {/* Contenido de la etapa */}
            <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 border border-white/20 backdrop-blur-sm"
              >
                {/* Imagen de la etapa */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg overflow-hidden bg-white/10 p-2">
                  <img 
                    src={stage.image} 
                    alt={stage.title}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      console.log(`Error loading image for ${stage.title}:`, stage.image);
                    }}
                  />
                </div>
                
                <h4 className="text-[#BFA181] font-semibold text-lg mb-2">{stage.title}</h4>
                <p className="text-white/70 text-sm mb-3 leading-relaxed">{stage.description}</p>
                
                {/* Estado y tiempo */}
                <div className="space-y-2">
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    stage.status === 'current' ? 'bg-[#178582]/20 text-[#178582]' :
                    stage.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                    'bg-white/10 text-white/60'
                  }`}>
                    {getStatusText(stage.status)}
                  </div>
                  <div className="text-xs text-white/50">{stage.timeframe}</div>
                </div>
              </motion.div>
            </div>

            {/* Punto en la línea de tiempo */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
              className={`absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-4 border-[#0A1828] flex items-center justify-center ${getStatusColor(stage.status)}`}
            >
              <stage.icon className={`w-6 h-6 ${stage.status === 'current' ? 'text-white' : stage.status === 'completed' ? 'text-white' : 'text-white/70'}`} />
            </motion.div>

            {/* Espacio para el otro lado */}
            <div className="w-5/12"></div>
          </motion.div>
        ))}
      </div>
      
      {/* Mensaje de Río */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="flex items-start gap-3 bg-gradient-to-r from-blue-500/15 to-transparent p-6 rounded-xl border border-blue-500/20 max-w-2xl mx-auto"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 p-1 flex-shrink-0">
          <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center text-sm">
            💙
          </div>
        </div>
        <div>
          <p className="text-sm text-blue-400 font-medium mb-2">Río te explica:</p>
          <p className="text-sm text-white/90 leading-relaxed mb-3">
            Estás actualmente en la evaluación inicial. Cada caso es único y los tiempos pueden variar según tus necesidades específicas. 
            <span className="text-[#BFA181] font-medium"> La carga inmediata (dientes el mismo día) es otro tema que evaluaremos según tu caso particular.</span>
          </p>
          <p className="text-xs text-white/70 italic">
            Recuerda: este proceso está diseñado para garantizar el máximo éxito de tu tratamiento.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
