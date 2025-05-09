
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Bot, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

interface ReviAssistantProps {
  messages?: string[];
  currentStep?: number;
  totalSteps?: number;
  onClose?: () => void;
}

export default function ReviAssistant({
  messages = ["¡Hola! Soy Revi, tu asistente IA dental. Estoy aquí para guiarte en tu evaluación de implantes."],
  currentStep = 0,
  totalSteps = 0,
  onClose
}: ReviAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [typing, setTyping] = useState(false);
  const [typedText, setTypedText] = useState('');

  const toggleOpen = () => setIsOpen(!isOpen);

  const getQuestionPrompts = () => {
    return [
      "¿Te quedó clara esta pregunta? Puedo explicártela mejor si lo necesitas.",
      "¿Quieres saber más sobre este tema?",
      "¿Necesitas ayuda para responder esta pregunta?",
      "¿Te gustaría ver información adicional sobre este aspecto?"
    ];
  };

  useEffect(() => {
    if (isOpen && messages.length > 0) {
      setTyping(true);
      let i = 0;
      const text = messages[currentMessage];
      const typingInterval = setInterval(() => {
        if (i <= text.length) {
          setTypedText(text.slice(0, i));
          i++;
        } else {
          clearInterval(typingInterval);
          setTyping(false);
        }
      }, 20);
      return () => clearInterval(typingInterval);
    }
  }, [isOpen, currentMessage, messages]);

  useEffect(() => {
    if (currentStep > 0) {
      const prompts = getQuestionPrompts();
      const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
      messages = [...messages, randomPrompt];
    }
  }, [currentStep]);

  return <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && <motion.div initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} exit={{
          scale: 0
        }} className="relative">
              <motion.div animate={{
            scale: [1, 1.1, 1]
          }} transition={{
            repeat: Infinity,
            duration: 3
          }} className="absolute -inset-1 bg-gradient-to-r from-[#1EAEDB] to-[#33C3F0] rounded-full opacity-70 blur" />
              <Button onClick={toggleOpen} size="icon" className="w-14 h-14 rounded-full text-starry shadow-glow border-none relative z-10 bg-[#1EAEDB] hover:bg-[#33C3F0]">
                <img 
                  src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png" 
                  alt="ImplantX Logo" 
                  className="w-8 h-8"
                />
                <span className="sr-only">Abrir asistente</span>
                
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#33C3F0] rounded-full animate-pulse" />
              </Button>
            </motion.div>}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0,
        y: 20,
        scale: 0.9
      }} animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }} exit={{
        opacity: 0,
        y: 20,
        scale: 0.9
      }} className="fixed bottom-24 right-6 w-80 glass-panel shadow-lg overflow-hidden z-50">
            <div className="bg-[#1EAEDB]/20 p-3 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#1EAEDB]/20 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png" 
                    alt="ImplantX Logo" 
                    className="w-5 h-5" 
                  />
                </div>
                <div>
                  <h4 className="text-[#1EAEDB] font-medium text-sm">Revi</h4>
                  <p className="text-xs text-white/70">Asistente dental IA</p>
                </div>
              </div>
              <Button onClick={toggleOpen} variant="ghost" size="sm" className="text-white/70 hover:text-white h-8 w-8 p-0">
                &times;
              </Button>
            </div>
            
            <div className="p-4 h-64 overflow-y-auto">
              <div className="flex space-x-3">
                <div className="flex-shrink-0 h-9 w-9 rounded-full bg-gradient-to-r from-[#1EAEDB] to-[#33C3F0] p-1">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <img 
                      src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png" 
                      alt="ImplantX Logo" 
                      className="w-5 h-5" 
                    />
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-sm relative">
                  <div className="absolute left-[-5px] top-4 w-2 h-2 bg-white/5 rotate-45" />
                  <p className={typing ? "animate-pulse" : ""}>
                    {typedText}
                    {typing && <span className="animate-pulse">|</span>}
                  </p>
                </div>
              </div>

              {totalSteps > 0 && <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="flex justify-between text-xs text-white/50">
                    <span>Progreso</span>
                    <span>{currentStep}/{totalSteps} completado</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
                    <div className="bg-gradient-to-r from-[#1EAEDB] to-[#33C3F0] h-1.5 rounded-full transition-all duration-500" style={{
                width: `${currentStep / totalSteps * 100}%`
              }} />
                  </div>
                </div>}
            </div>
            
            <div className="flex justify-between border-t border-white/10 p-3 bg-white/5">
              {messages.length > 1 && <div className="flex space-x-2">
                  <Button onClick={() => setCurrentMessage(prev => Math.max(0, prev - 1))} disabled={currentMessage <= 0} size="sm" variant="ghost" className="h-8 px-2 text-white/70">
                    &lt;
                  </Button>
                  <Button onClick={() => setCurrentMessage(prev => Math.min(messages.length - 1, prev + 1))} disabled={currentMessage >= messages.length - 1} size="sm" variant="ghost" className="h-8 px-2 text-white/70">
                    &gt;
                  </Button>
                </div>}
              <Button variant="ghost" size="sm" onClick={onClose || toggleOpen} className="ml-auto h-8 text-xs text-white/70">
                Cerrar
              </Button>
            </div>
          </motion.div>}
      </AnimatePresence>
    </>;
}
