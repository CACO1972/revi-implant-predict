
import { useEffect, useRef } from 'react';

export default function AnimatedStarryBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current || !starsRef.current) return;
    
    const container = containerRef.current;
    const starsContainer = starsRef.current;
    const starCount = 200;
    
    // Limpiar contenido existente
    starsContainer.innerHTML = '';
    
    // Crear luces doradas en movimiento (estrellas diminutas)
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      const size = Math.random();
      
      // Diferentes tamaños de estrellas doradas
      if (size > 0.95) {
        star.className = 'golden-star large bright';
      } else if (size > 0.8) {
        star.className = 'golden-star medium glow';
      } else {
        star.className = 'golden-star small';
      }
      
      // Color dorado principal con variaciones
      const goldVariations = [
        '#BFA181', // Dorado principal
        '#D4BC9A', // Dorado claro
        '#A68A6B', // Dorado oscuro
        '#E6D5B8', // Dorado muy claro
        '#8C7357'  // Dorado profundo
      ];
      
      const randomGold = goldVariations[Math.floor(Math.random() * goldVariations.length)];
      star.style.backgroundColor = randomGold;
      star.style.boxShadow = `0 0 ${2 + Math.random() * 6}px 1px ${randomGold}66`;
      
      // Posición aleatoria
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      // Animación con delays aleatorios para efecto orgánico
      star.style.animationDelay = `${Math.random() * 8}s`;
      star.style.animationDuration = `${3 + Math.random() * 8}s`;
      
      starsContainer.appendChild(star);
    }
    
    // Crear algunas estrellas fugaces ocasionales
    for (let i = 0; i < 3; i++) {
      const shootingStar = document.createElement('div');
      shootingStar.className = 'shooting-star';
      
      shootingStar.style.left = `${Math.random() * 100}%`;
      shootingStar.style.top = `${Math.random() * 50}%`;
      shootingStar.style.animationDelay = `${Math.random() * 15}s`;
      
      starsContainer.appendChild(shootingStar);
    }
    
    // Crear nebulosas doradas sutiles
    for (let i = 0; i < 4; i++) {
      const nebula = document.createElement('div');
      nebula.className = 'golden-nebula';
      
      nebula.style.left = `${Math.random() * 100}%`;
      nebula.style.top = `${Math.random() * 100}%`;
      nebula.style.animationDelay = `${Math.random() * 10}s`;
      
      starsContainer.appendChild(nebula);
    }
    
    // Movimiento suave con el cursor (parallax sutil)
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      starsContainer.style.transform = `translate(${x * -20}px, ${y * -20}px)`;
      container.style.backgroundPosition = `${x * 15}px ${y * 15}px`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <>
      {/* Fondo azul oscuro como cielo nocturno */}
      <div 
        ref={containerRef} 
        className="fixed inset-0 z-[-3] pointer-events-none bg-gradient-to-br from-[#061524] via-[#040D18] to-[#061524]"
      >
        {/* Patrón de fondo sutil */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(191,161,129,0.08)_0%,transparent_30%),radial-gradient(circle_at_80%_70%,rgba(191,161,129,0.06)_0%,transparent_25%)] opacity-40"></div>
      </div>
      
      {/* Estrellas doradas en movimiento */}
      <div ref={starsRef} className="fixed inset-0 z-[-2] pointer-events-none"></div>
    </>
  );
}
