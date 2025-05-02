
import { useEffect, useRef } from 'react';

export default function AnimatedStarryBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current || !starsRef.current) return;
    
    const container = containerRef.current;
    const starsContainer = starsRef.current;
    const starCount = 200; // Aumentamos la cantidad de estrellas
    
    // Limpiar estrellas existentes
    starsContainer.innerHTML = '';
    
    // Crear estrellas
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      const size = Math.random();
      
      // Determinar tamaño y brillo
      if (size > 0.95) {
        star.className = 'star large bright';
      } else if (size > 0.8) {
        star.className = 'star large';
      } else if (size > 0.5) {
        star.className = 'star medium';
      } else {
        star.className = 'star small';
      }
      
      // Posicionar aleatoriamente
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      // Animar con delays aleatorios
      star.style.animationDelay = `${Math.random() * 5}s`;
      star.style.animationDuration = `${3 + Math.random() * 7}s`; // Duración más larga para un efecto más suave
      
      starsContainer.appendChild(star);
    }
    
    // Crear nebulosas o cúmulos estelares (grupos de estrellas)
    for (let i = 0; i < 5; i++) {
      const nebula = document.createElement('div');
      nebula.className = 'nebula';
      
      // Posicionar aleatoriamente
      nebula.style.left = `${Math.random() * 100}%`;
      nebula.style.top = `${Math.random() * 100}%`;
      nebula.style.opacity = `${0.2 + Math.random() * 0.3}`;
      nebula.style.transform = `scale(${0.5 + Math.random() * 1.5})`;
      
      // Animar con delays aleatorios
      nebula.style.animationDelay = `${Math.random() * 5}s`;
      
      container.appendChild(nebula);
    }
    
    // Mover estrellas suavemente al mover el cursor o al hacer scroll
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      starsContainer.style.transform = `translate(${x * -10}px, ${y * -10}px)`;
      container.style.backgroundPosition = `${x * 5}px ${y * 5}px`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <>
      <div 
        ref={containerRef} 
        className="fixed inset-0 z-[-2] pointer-events-none bg-gradient-to-br from-[#0A1828] to-[#06111E]"
      >
        <div className="absolute inset-0 bg-[url('/lovable-uploads/dcc0db4b-004a-4bd8-824f-557417aa8a9c.png')] bg-cover opacity-40 mix-blend-soft-light"></div>
      </div>
      <div ref={starsRef} className="fixed inset-0 z-[-1] pointer-events-none"></div>
    </>
  );
}
