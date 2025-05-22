
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PriceCalculator from "./pages/PriceCalculator";
import Assessment from "./pages/Assessment";
import Odontogram from "./pages/Odontogram";
import Results from "./pages/Results";
import TreatmentComparison from "./pages/TreatmentComparison";
import ContactForm from "./pages/ContactForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipPrimitive.Provider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/evaluacion" element={<Assessment />} />
          <Route path="/odontograma" element={<Odontogram />} />
          <Route path="/resultados" element={<Results />} />
          <Route path="/comparador" element={<TreatmentComparison />} />
          <Route path="/calculadora" element={<PriceCalculator />} />
          <Route path="/contacto" element={<ContactForm />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipPrimitive.Provider>
  </QueryClientProvider>
);

export default App;
