
import React, { useState } from "react";
import { motion } from "framer-motion";
import RioAvatar from "@/components/question/RioAvatar";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";
import InteractiveOdontogramDemo from "@/components/demo/InteractiveOdontogramDemo";
import ImplantXOrbitalTimeline from "@/components/demo/implantx-orbital-timeline";
import BenefitsSection from "@/components/hero/BenefitsSection";
import CtaSection from "@/components/hero/CtaSection";
import FooterSection from "@/components/hero/FooterSection";

export default function Index() {
  const [showOdontogramDemo, setShowOdontogramDemo] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative bg-[#040D18] overflow-hidden">
      {/* Fondo animado con luces doradas */}
      <AnimatedStarryBackground />

      {/* HERO SIMPLIFICADO */}
      <section className="w-full max-w-6xl mx-auto flex flex-col items-center py-6 md:py-12 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center space-y-8 md:space-y-12"
        >
          <ImplantXOrbitalTimeline />
          <BenefitsSection />
          <CtaSection />
        </motion.div>
      </section>

      {/* Río en esquina inferior derecha */}
      <motion.div 
        className="fixed bottom-6 right-6 z-20"
        initial={{ opacity: 0, scale: 0.8, x: 50, y: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <div className="scale-75">
          <RioAvatar />
        </div>
      </motion.div>

      <FooterSection />

      {/* Modal del Odontograma Interactivo */}
      <InteractiveOdontogramDemo />
    </div>
  );
}
