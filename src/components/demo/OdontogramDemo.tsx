
import { motion } from "framer-motion";

export default function OdontogramDemo() {
  const renderTooth = (number: number, isMissing: boolean = false) => (
    <motion.div 
      whileHover={{ scale: 1.1 }}
      className={`w-10 h-14 flex flex-col items-center ${isMissing ? 'opacity-50' : ''}`}
    >
      <div className={`w-8 h-8 ${isMissing ? 'bg-red-500/30 border-red-500' : 'bg-white/20'} border rounded-md flex items-center justify-center`}>
        {isMissing && <span className="text-red-500 text-xs">X</span>}
      </div>
      <span className="text-xs mt-1 text-white/80">{number}</span>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      <div className="text-center mb-4">
        <h3 className="text-xl text-[#178582] mb-2">Odontograma Interactivo</h3>
        <p className="text-white/80">Seleccione los dientes que le faltan para un análisis más preciso</p>
      </div>
      
      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <div className="flex justify-center mb-6">
          <div className="bg-[#0A1828] border border-[#178582]/20 p-3 rounded-lg">
            <div className="flex justify-center mb-6">
              <p className="text-[#BFA181] text-sm font-medium">Superior</p>
            </div>
            
            <div className="flex justify-center gap-1">
              {[18, 17, 16, 15, 14, 13, 12, 11].map(num => renderTooth(num, [16, 14].includes(num)))}
              {[21, 22, 23, 24, 25, 26, 27, 28].map(num => renderTooth(num, [25].includes(num)))}
            </div>
            
            <div className="border-t border-dashed border-white/20 my-4"></div>
            
            <div className="flex justify-center gap-1">
              {[48, 47, 46, 45, 44, 43, 42, 41].map(num => renderTooth(num, [46].includes(num)))}
              {[31, 32, 33, 34, 35, 36, 37, 38].map(num => renderTooth(num, [36, 37].includes(num)))}
            </div>
            
            <div className="flex justify-center mt-6">
              <p className="text-[#BFA181] text-sm font-medium">Inferior</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <div className="flex items-start gap-3 bg-gradient-to-r from-[#178582]/15 to-transparent p-4 rounded-lg max-w-md">
            <img src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png" alt="Rio Assistant" className="w-8 h-8 mr-2" />
            <p className="text-sm text-white/90">
              <span className="text-[#178582] font-medium">Río:</span> Estás viendo tu boca como en un espejo. El lado izquierdo de la pantalla corresponde a tu lado derecho. Toca los dientes que te faltan.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-6">
        <Button className="bg-gradient-to-r from-[#178582] to-[#BFA181] hover:from-[#178582]/90 hover:to-[#BFA181]/90 text-white shadow-glow">
          Continuar
        </Button>
      </div>
    </div>
  );
}
