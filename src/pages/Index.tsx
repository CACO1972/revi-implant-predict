
import React, { useState } from "react";
import { motion } from "framer-motion";
import RioAvatar from "@/components/question/RioAvatar";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";
import InteractiveOdontogramDemo from "@/components/demo/InteractiveOdontogramDemo";
import HeroSection from "@/components/hero/HeroSection";
import FeatureCards from "@/components/hero/FeatureCards";
import OdontogramDemoSection from "@/components/hero/OdontogramDemoSection";
import CtaSection from "@/components/hero/CtaSection";
import FooterSection from "@/components/hero/FooterSection";

export default function Index() {
  const [showOdontogramDemo, setShowOdontogramDemo] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative bg-[#0A1828] overflow-hidden">
      {/* Fondo animado */}
      <AnimatedStarryBackground />

      {/* HERO PRINCIPAL - Espaciado reducido */}
      <section className="w-full max-w-4xl mx-auto flex flex-col items-center py-4 md:py-8 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center space-y-8"
        >
          <HeroSection />
          <FeatureCards />
          <OdontogramDemoSection onOpenDemo={() => setShowOdontogramDemo(true)} />
          <CtaSection />
        </motion.div>
      </section>

      {/* Río en esquina - menos intrusivo */}
      <motion.div 
        className="fixed bottom-4 right-4 z-20"
        initial={{ opacity: 0, scale: 0.7, x: 30, y: 30 }}
        animate={{ opacity: 0.8, scale: 0.8, x: 0, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <div className="scale-50 opacity-60">
          <RioAvatar />
        </div>
      </motion.div>

      <FooterSection />

      {/* Modal del Odontograma Interactivo */}
      <InteractiveOdontogramDemo />
    </div>
  );
}
