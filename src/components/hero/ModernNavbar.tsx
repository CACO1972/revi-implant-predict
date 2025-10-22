import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function ModernNavbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Inicio", path: "/" },
    { label: "Quiénes Somos", path: "/quienes-somos" },
    { label: "Recursos", path: "/recursos-educativos" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-primary/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 group"
          >
            <img 
              src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
              alt="ImplantX"
              className="h-8 w-auto transition-transform group-hover:scale-105"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => navigate("/auth")}
              className="bg-primary hover:bg-primary-glow text-primary-foreground font-semibold shadow-glow"
            >
              Comenzar
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-primary/10">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="px-4 pt-2">
              <Button
                onClick={() => {
                  navigate("/auth");
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-primary hover:bg-primary-glow text-primary-foreground"
              >
                Comenzar Evaluación
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
