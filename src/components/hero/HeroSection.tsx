
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.div 
      className="flex flex-col items-center space-y-12"
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Logo ImplantX más grande */}
      <motion.div 
        className="mb-8"
        animate={{ 
          y: [0, -15, 0],
          filter: ["drop-shadow(0 0 25px rgba(91, 203, 255, 0.4))", 
                   "drop-shadow(0 0 40px rgba(91, 203, 255, 0.6))", 
                   "drop-shadow(0 0 25px rgba(91, 203, 255, 0.4))"]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img 
          src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
          alt="ImplantX Logo"
          className="h-60 md:h-80 w-auto mx-auto"
        />
      </motion.div>

      {/* Slogan principal */}
      <motion.div 
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl leading-tight font-montserrat">
          <span className="text-[#5BCBFF]">IA</span> que evalúa tu sonrisa,
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-2xl leading-tight font-montserrat">
          predice el <span className="text-[#5BCBFF]">éxito</span> de tus implantes
        </h2>
        <p className="text-xl md:text-2xl text-[#5BCBFF] font-light mt-4">
          y crea tu plan personalizado en <span className="text-white font-semibold">2 minutos</span>
        </p>
      </motion.div>
    </motion.div>
  );
}
