
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ContactFormProps {
  patientName: string;
  email: string;
  phone: string;
  message: string;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setMessage: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function ContactForm({
  patientName,
  email,
  phone,
  message,
  setEmail,
  setPhone,
  setMessage,
  onSubmit,
  onCancel,
}: ContactFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-gold">Solicitar evaluación profesional</h3>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="tucorreo@ejemplo.com"
          required
          className="bg-white/5 border-white/10 text-white placeholder-white/40"
        />
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-1">
            Teléfono
          </label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="+1234567890"
            required
            className="bg-white/5 border-white/10 text-white placeholder-white/40"
          />
        </div>
        <div className="flex items-end">
          <Button
            type="button"
            variant="outline"
            className="h-10 px-3 border-white/20 text-white hover:bg-white/5"
            onClick={() => window.open(`https://wa.me/${phone.replace(/\D/g, "")}`, "_blank")}
          >
            WhatsApp
          </Button>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-1">
          Mensaje (opcional)
        </label>
        <textarea
          id="message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Quiero más información sobre..."
          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
          rows={3}
        />
      </div>
      <div className="flex gap-4">
        <Button
          type="submit"
          className="flex-1 bg-primary hover:bg-primary-dark text-white shadow-glow border border-gold/30"
        >
          Enviar solicitud
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1 border-white/20 text-white hover:bg-white/5"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
