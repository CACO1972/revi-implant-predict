
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const treatments = [
  {
    title: "Implante Unitario",
    description: "Solución ideal para reemplazar un solo diente perdido.",
    image: "/treatments/single.png"
  },
  {
    title: "Implantes Múltiples",
    description: "Perfectos para reemplazar varios dientes contiguos.",
    image: "/treatments/multiple.png"
  },
  {
    title: "Rehabilitación Total",
    description: "Solución completa para toda la arcada dental.",
    image: "/treatments/full.png"
  },
  {
    title: "Carga Inmediata",
    description: "Implantes y corona provisional en el mismo día.",
    image: "/treatments/immediate.png"
  }
];

export default function TreatmentCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {treatments.map((treatment, index) => (
        <motion.div
          key={treatment.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="glass-panel p-6 hover:bg-white/10 transition-colors">
            <h3 className="text-xl font-semibold text-gold mb-2">{treatment.title}</h3>
            <p className="text-white/80 text-sm">{treatment.description}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
