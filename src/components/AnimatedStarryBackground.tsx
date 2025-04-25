
import { useEffect, useRef } from 'react';

export default function AnimatedStarryBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const starCount = 150;
    
    // Limpiar estrellas existentes
    container.innerHTML = '';
    
    // Crear estrellas
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      const size = Math.random();
      
      // Determinar tamaño
      if (size > 0.8) {
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
      star.style.animationDelay = `${Math.random() * 3}s`;
      star.style.animationDuration = `${2 + Math.random() * 3}s`;
      
      container.appendChild(star);
    }
    
    // Mover estrellas suavemente al mover el cursor
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      container.style.transform = `translate(${x * -10}px, ${y * -10}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <>
      <div className="animated-stars"></div>
      <div ref={containerRef} className="fixed inset-0 z-[-1] pointer-events-none"></div>
    </>
  );
}
