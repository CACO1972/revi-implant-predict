
import { Hero } from "@/components/LandingPage";
import { motion } from "framer-motion";

export default function Index() {
  return (
    <div className="min-h-screen relative">
      <Hero />
      
      {/* Disclaimer médico */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-4 left-4 right-4 z-50"
      >
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4 text-center">
          <p className="text-white/80 text-sm">
            ⚠️ <strong>Importante:</strong> Esta evaluación es solo orientativa y no constituye un diagnóstico médico. 
            No reemplaza la evaluación profesional de un dentista especialista. 
            Siempre consulta con un profesional para obtener un plan de tratamiento personalizado.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
