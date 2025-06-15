
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu, X, Sparkles, Calculator, Users, Phone, Instagram } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Demo Gratuito", path: "/demo", icon: Instagram, highlight: true },
    { name: "Evaluación", path: "/evaluacion", icon: Sparkles },
    { name: "Calculadora", path: "/calculadora", icon: Calculator },
    { name: "Comparador", path: "/comparador", icon: Users },
    { name: "Contacto", path: "/contacto", icon: Phone },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A1828]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
              alt="ImplantDX Logo"
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm transition-colors ${
                  location.pathname === item.path
                    ? "text-[#178582] bg-[#178582]/10"
                    : item.highlight
                    ? "text-[#BFA181] hover:text-[#BFA181]/80"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#178582]"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                  location.pathname === item.path
                    ? "text-[#178582] bg-[#178582]/10"
                    : item.highlight
                    ? "text-[#BFA181] hover:text-[#BFA181]/80"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
