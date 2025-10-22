import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-20">
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-primary/20 p-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center space-y-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comienza tu evaluación
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Sistema predictivo basado en IA para determinar el nivel de éxito en tratamientos con implantes dentales
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Button
              onClick={() => navigate('/evaluacion')}
              size="lg"
              variant="gold"
              className="group"
            >
              Comenzar ahora
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-8 text-sm text-muted-foreground pt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>Sin registro</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span>Resultados inmediatos</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
