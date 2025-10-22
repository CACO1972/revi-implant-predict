import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PatientInfo } from "@/types/implant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PatientInfoFormProps {
  patientInfo: PatientInfo;
  setPatientInfo: (info: PatientInfo) => void;
  onSubmit: (e: React.FormEvent) => void;
}

interface ExtendedPatientInfo extends PatientInfo {
  email?: string;
  phone?: string;
}

export default function PatientInfoForm({ patientInfo, setPatientInfo, onSubmit }: PatientInfoFormProps) {
  const [extendedInfo, setExtendedInfo] = React.useState<ExtendedPatientInfo>({
    ...patientInfo,
    email: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPatientInfo(extendedInfo);
    onSubmit(e);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-lg z-10 px-4"
    >
      <Card className="bg-card/60 backdrop-blur-xl border-primary/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-foreground font-semibold">
            Comencemos tu evaluación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name" className="text-foreground/90 text-sm font-medium">Nombre completo</Label>
              <Input
                id="name"
                type="text"
                value={extendedInfo.name}
                onChange={(e) => setExtendedInfo({ ...extendedInfo, name: e.target.value })}
                className="bg-input/50 backdrop-blur-sm border-border/50 text-foreground placeholder:text-muted-foreground mt-2 h-12"
                placeholder="María González"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-foreground/90 text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={extendedInfo.email || ''}
                onChange={(e) => setExtendedInfo({ ...extendedInfo, email: e.target.value })}
                className="bg-input/50 backdrop-blur-sm border-border/50 text-foreground placeholder:text-muted-foreground mt-2 h-12"
                placeholder="maria@ejemplo.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-foreground/90 text-sm font-medium">Teléfono</Label>
              <Input
                id="phone"
                type="tel"
                value={extendedInfo.phone || ''}
                onChange={(e) => setExtendedInfo({ ...extendedInfo, phone: e.target.value })}
                className="bg-input/50 backdrop-blur-sm border-border/50 text-foreground placeholder:text-muted-foreground mt-2 h-12"
                placeholder="+56 9 1234 5678"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="age" className="text-foreground/90 text-sm font-medium">Edad</Label>
              <Input
                id="age"
                type="number"
                value={extendedInfo.age || ""}
                onChange={(e) => setExtendedInfo({ ...extendedInfo, age: parseInt(e.target.value) })}
                className="bg-input/50 backdrop-blur-sm border-border/50 text-foreground placeholder:text-muted-foreground mt-2 h-12"
                placeholder="35"
                min={18}
                max={99}
                required
              />
            </div>

            <Button type="submit" variant="gold" size="lg" className="w-full mt-8">
              Comenzar evaluación
              <ChevronRight className="ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
