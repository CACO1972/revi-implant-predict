
import React from "react";
import { motion } from "framer-motion";
import { Bird } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ReviAssistantProps {
  message?: string;
  isVisible: boolean;
}

export default function ReviAssistant({ message, isVisible }: ReviAssistantProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.8 }}
      className="fixed bottom-4 right-4 flex items-end z-10 pointer-events-none"
    >
      {message && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="mr-3 mb-2 max-w-[250px] bg-primary/80 backdrop-blur-sm p-4 rounded-xl rounded-br-none text-white text-sm shadow-lg pointer-events-none"
        >
          {message}
        </motion.div>
      )}

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative pointer-events-none"
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-starry z-10"></div>
        <Avatar className="w-16 h-16 bg-gradient-to-br from-[#1EAEDB] to-[#33C3F0] p-1 shadow-glow">
          <AvatarImage src="/lovable-uploads/846506fe-9bf3-421d-913e-bfd48b9feb05.png" alt="Blu" />
          <AvatarFallback className="bg-[#1EAEDB] text-white">
            <Bird className="w-8 h-8" />
          </AvatarFallback>
        </Avatar>
      </motion.div>
    </motion.div>
  );
}
