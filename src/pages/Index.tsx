import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, Clock, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Index() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sparkles,
      title: "IA Clínica Avanzada",
      description: "Algoritmo validado científicamente para evaluación predictiva"
    },
    {
      icon: Clock,
      title: "2 Minutos",
      description: "Evaluación completa sin salir de casa"
    },
    {
      icon: Shield,
      title: "Confidencial",
      description: "Tus datos están protegidos y seguros"
    },
    {
      icon: CheckCircle,
      title: "Personalizado",
      description: "Plan adaptado a tu perfil clínico único"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
              alt="ImplantX"
              className="h-10 w-auto"
            />
            <span className="font-display text-xl font-semibold text-foreground">ImplantX</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => navigate('/recursos-educativos')}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              Recursos
            </button>
            <button 
              onClick={() => navigate('/quienes-somos')}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              Quiénes Somos
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 badge badge-primary">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse-subtle" />
                Evaluación gratuita disponible
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-foreground leading-tight">
                ¿Necesitas{" "}
                <span className="text-primary">implantes</span>
                {" "}dentales?
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Descubre tu nivel de éxito estimado antes de ir al dentista. 
                Evaluación clínica con inteligencia artificial en solo 2 minutos.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate('/evaluacion')}
                size="lg"
                className="btn-primary text-base px-8 py-6 rounded-xl group"
              >
                Comenzar evaluación gratuita
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                onClick={() => navigate('/recursos-educativos')}
                variant="outline"
                size="lg"
                className="btn-outline text-base px-8 py-6 rounded-xl"
              >
                Ver guía educativa
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Sin registro</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Sin radiografías</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Resultados inmediatos</span>
              </div>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main card visual */}
              <div className="clinical-card shadow-clinical-lg p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Evaluación Predictiva</h3>
                    <p className="text-sm text-muted-foreground">Basada en evidencia científica</p>
                  </div>
                </div>
                
                {/* Sample progress */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Probabilidad de éxito</span>
                    <span className="font-semibold text-success">87%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill bg-success" style={{ width: '87%' }} />
                  </div>
                </div>

                {/* Sample factors */}
                <div className="space-y-3">
                  {['Densidad ósea estimada', 'Factores de riesgo', 'Plan personalizado'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-success" />
                      </div>
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/5 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-muted/30 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="section-title">¿Por qué ImplantX?</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              La primera herramienta de evaluación dental con IA diseñada para 
              democratizar el acceso a orientación clínica profesional
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="clinical-card text-center p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="clinical-card shadow-clinical-lg p-8 md:p-12 text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 badge badge-secondary mb-2">
            <Sparkles className="w-4 h-4" />
            Incluye guía educativa gratuita
          </div>
          
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
            Obtén tu plan de tratamiento personalizado
          </h2>
          
          <p className="text-muted-foreground max-w-xl mx-auto">
            Responde 9 preguntas simples y recibe una estimación de tu nivel de éxito 
            clínico, factores de riesgo y recomendaciones personalizadas.
          </p>
          
          <Button
            onClick={() => navigate('/evaluacion')}
            size="lg"
            className="btn-primary text-base px-10 py-6 rounded-xl group"
          >
            Comenzar ahora
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-border bg-card/50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
                alt="ImplantX"
                className="h-8 w-auto opacity-70"
              />
              <span className="text-sm text-muted-foreground">© 2025 ImplantX</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <a
                href="https://instagram.com/reviveai.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                @reviveai.cl
              </a>
              <a
                href="https://instagram.com/thehumanupgrade"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                @thehumanupgrade
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
