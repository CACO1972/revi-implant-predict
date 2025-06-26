
import React from "react";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqData } from "@/data/faqData";

export default function FAQSection() {
  return (
    <motion.div
      className="glass-panel p-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-[#178582]/20 flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-8 h-8 text-[#178582]" />
        </div>
        <h2 className="text-xl font-bold text-[#178582] mb-2">
          Preguntas Frecuentes
        </h2>
        <p className="text-white/70 text-sm">
          Respuestas a las dudas más comunes sobre implantes dentales
        </p>
      </div>
      
      <Accordion type="single" collapsible className="space-y-2">
        {faqData.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="border-white/10"
          >
            <AccordionTrigger className="text-white hover:text-[#178582] text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-white/80 leading-relaxed text-sm">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  );
}
