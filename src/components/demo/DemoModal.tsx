
import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function DemoModal({ isOpen, onClose, title, children }: DemoModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-gradient-to-b from-[#0A1828] to-[#0A1828]/95 border border-[#178582]/30 rounded-xl p-6 shadow-lg"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#BFA181] mr-2 ai-pulse"></div>
                <h2 className="text-2xl font-bold text-[#BFA181] bg-gradient-to-r from-[#BFA181] to-[#BFA181]/70 bg-clip-text text-transparent">{title}</h2>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5 text-white/80" />
              </button>
            </div>
            <div className="relative">
              {children}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0A1828] to-transparent pointer-events-none opacity-70"></div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
