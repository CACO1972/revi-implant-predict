import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";

export default function Auth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    // Verificar si ya está autenticado
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/evaluacion");
      }
    });

    // Escuchar cambios en autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/evaluacion");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión exitosamente.",
        });
      } else {
        // Registro
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
            emailRedirectTo: `${window.location.origin}/evaluacion`,
          },
        });

        if (error) throw error;

        toast({
          title: "¡Registro exitoso!",
          description: "Tu cuenta ha sido creada. Ahora puedes iniciar sesión.",
        });
        
        // En modo auto-confirm, el usuario ya está autenticado
        // El redirect se manejará por el onAuthStateChange
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      toast({
        title: "Error",
        description: error.message || "Ocurrió un error durante la autenticación",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <AnimatedStarryBackground />
      
      <Card className="w-full max-w-md z-10 bg-background/95 backdrop-blur-sm border-primary/20">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
              alt="ImplantX Logo"
              className="h-20 w-auto"
            />
          </div>
          <CardTitle className="text-2xl text-center">
            {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin 
              ? "Ingresa tus credenciales para continuar" 
              : "Crea tu cuenta para comenzar tu evaluación"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Nombre Completo</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Juan Pérez"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required={!isLogin}
                  className="bg-background/50"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="bg-background/50"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading 
                ? "Procesando..." 
                : isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline"
            >
              {isLogin 
                ? "¿No tienes cuenta? Regístrate" 
                : "¿Ya tienes cuenta? Inicia sesión"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="w-full"
            >
              Volver al Inicio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
