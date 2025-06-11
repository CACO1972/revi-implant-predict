
import { motion } from "framer-motion";
import { Heart, Lightbulb, CheckCircle, AlertTriangle, User } from "lucide-react";

interface PersonalizedRecommendationsProps {
  recommendations: string[];
  patientName: string;
  level: number;
}

export default function PersonalizedRecommendations({ 
  recommendations, 
  patientName, 
  level 
}: PersonalizedRecommendationsProps) {
  const firstName = patientName.split(' ')[0];
  
  console.log("DEBUG - PersonalizedRecommendations recibió:", {
    recommendations,
    patientName,
    level
  });
  
  const getIconForRecommendation = (rec: string) => {
    if (rec.includes('🎉') || rec.includes('✅') || rec.includes('🌟')) {
      return <CheckCircle className="w-5 h-5 text-emerald-400" />;
    } else if (rec.includes('⚠️') || rec.includes('🚭') || rec.includes('🔧')) {
      return <AlertTriangle className="w-5 h-5 text-orange-400" />;
    } else if (rec.includes('💪') || rec.includes('🤝') || rec.includes('🌈')) {
      return <Heart className="w-5 h-5 text-pink-400" />;
    }
    return <Lightbulb className="w-5 h-5 text-[#1EAEDB]" />;
  };

  const getMessageTone = () => {
    switch (level) {
      case 1:
        return {
          title: `¡Excelente noticia, ${firstName}!`,
          subtitle: "Eres un candidato ideal para implantes dentales",
          bgColor: "bg-gradient-to-r from-emerald-500/10 to-green-500/10",
          borderColor: "border-emerald-400/30"
        };
      case 2:
        return {
          title: `¡Muy bien, ${firstName}!`,
          subtitle: "Estás en muy buenas condiciones para el tratamiento",
          bgColor: "bg-gradient-to-r from-[#1EAEDB]/10 to-blue-500/10",
          borderColor: "border-[#1EAEDB]/30"
        };
      case 3:
        return {
          title: `${firstName}, tienes un buen potencial`,
          subtitle: "Con algunos ajustes, lograrás excelentes resultados",
          bgColor: "bg-gradient-to-r from-[#BFA181]/10 to-yellow-500/10",
          borderColor: "border-[#BFA181]/30"
        };
      case 4:
        return {
          title: `${firstName}, hay un camino para ti`,
          subtitle: "Aunque requiere preparación, es totalmente posible",
          bgColor: "bg-gradient-to-r from-orange-500/10 to-red-500/10",
          borderColor: "border-orange-400/30"
        };
      default:
        return {
          title: `Hola ${firstName}`,
          subtitle: "Aquí tienes tu evaluación personalizada",
          bgColor: "bg-white/5",
          borderColor: "border-white/20"
        };
    }
  };

  const tone = getMessageTone();

  // Si no hay recomendaciones, mostrar un mensaje por defecto
  if (!recommendations || recommendations.length === 0) {
    console.warn("DEBUG - No hay recomendaciones disponibles");
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/20 rounded-2xl p-6 mb-8"
      >
        <p className="text-white/70 text-center">
          Estamos procesando tus recomendaciones personalizadas...
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`${tone.bgColor} ${tone.borderColor} border rounded-2xl p-6 mb-8`}
    >
      {/* Header empático */}
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1EAEDB]/20 to-[#BFA181]/20 flex items-center justify-center mr-4">
          <User className="w-6 h-6 text-[#1EAEDB]" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">
            {tone.title}
          </h3>
          <p className="text-white/70 text-sm">
            {tone.subtitle}
          </p>
        </div>
      </div>

      {/* Recomendaciones personalizadas */}
      <div className="space-y-4">
        <h4 className="font-semibold text-[#BFA181] mb-4 flex items-center">
          <Heart className="w-5 h-5 mr-2" />
          Tus recomendaciones personalizadas:
        </h4>
        
        {recommendations.map((rec, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="flex-shrink-0 mt-0.5">
              {getIconForRecommendation(rec)}
            </div>
            <p className="text-white/85 text-sm leading-relaxed font-light">
              {rec}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Mensaje de cierre empático */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 pt-4 border-t border-white/10"
      >
        <p className="text-white/60 text-xs italic text-center">
          {level <= 2 
            ? `${firstName}, tu compromiso con la salud bucal es admirable. Estás tomando las decisiones correctas.`
            : `${firstName}, recuerda que cada paso hacia una mejor salud bucal es una inversión en tu bienestar y confianza.`
          }
        </p>
      </motion.div>
    </motion.div>
  );
}
