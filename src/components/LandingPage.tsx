import { Button } from "@/components/ui/button";
import DentalIcon from "@/components/DentalIcon";
import { motion } from "framer-motion";
interface LandingPageProps {
  onStart: () => void;
}
export default function LandingPage({
  onStart
}: LandingPageProps) {
  return <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 animated-bg">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.8
    }} className="w-full max-w-2xl space-y-8">
        <motion.div className="space-y-6" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.3,
        duration: 0.8
      }}>
          
          
          <h1 className="text-4xl md:text-5xl font-bold text-gold">
            Bienvenido a ImplantDX
          </h1>
          
          <h2 className="text-xl md:text-2xl text-primary font-light max-w-xl mx-auto">
            Una herramienta clínica predictiva basada en IA
          </h2>
          
          <p className="text-[15px] text-white/85 max-w-lg mx-auto font-light">
            Te ayudaremos a saber si eres un buen candidato para implantes dentales
          </p>
        </motion.div>

        <motion.div className="space-y-6" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.6,
        duration: 0.8
      }}>
          <Button onClick={onStart} className="bg-primary hover:bg-primary-dark text-white px-8 py-6 rounded-xl text-lg shadow-glow transition-all duration-300 border border-gold/30">
            Comenzar evaluación
          </Button>

          <p className="text-[11px] text-white/50 mt-6 max-w-md mx-auto">
            *Versión beta. Esta herramienta no reemplaza una evaluación profesional.
          </p>
        </motion.div>
      </motion.div>
    </div>;
}