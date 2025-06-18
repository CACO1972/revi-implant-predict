
import { useEffect, useRef } from 'react';

export default function AnimatedStarryBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const circuitsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current || !starsRef.current || !circuitsRef.current) return;
    
    const container = containerRef.current;
    const starsContainer = starsRef.current;
    const circuitsContainer = circuitsRef.current;
    const starCount = 250;
    
    // Limpiar contenido existente
    starsContainer.innerHTML = '';
    circuitsContainer.innerHTML = '';
    
    // Crear estrellas con efecto de IA
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      const size = Math.random();
      
      // Determinar tamaño y brillo con colores de IA
      if (size > 0.95) {
        star.className = 'star large bright ai-pulse';
      } else if (size > 0.8) {
        star.className = 'star large ai-glow';
      } else if (size > 0.5) {
        star.className = 'star medium';
      } else {
        star.className = 'star small';
      }
      
      // Agregar colores asociados a IA
      if (Math.random() > 0.7) {
        star.style.backgroundColor = '#5BCBFF'; // Azul neón
        star.style.boxShadow = '0 0 8px 2px rgba(91, 203, 255, 0.4)';
      } else if (Math.random() > 0.8) {
        star.style.backgroundColor = '#178582'; // Turquesa IA
        star.style.boxShadow = '0 0 6px 2px rgba(23, 133, 130, 0.4)';
      }
      
      // Posicionar aleatoriamente
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      // Animar con delays aleatorios
      star.style.animationDelay = `${Math.random() * 5}s`;
      star.style.animationDuration = `${2 + Math.random() * 6}s`;
      
      starsContainer.appendChild(star);
    }
    
    // Crear líneas de conexión tipo circuito/red neuronal
    for (let i = 0; i < 15; i++) {
      const circuit = document.createElement('div');
      circuit.className = 'neural-line';
      
      const angle = Math.random() * 360;
      const length = 50 + Math.random() * 150;
      
      circuit.style.left = `${Math.random() * 100}%`;
      circuit.style.top = `${Math.random() * 100}%`;
      circuit.style.width = `${length}px`;
      circuit.style.height = '1px';
      circuit.style.background = `linear-gradient(90deg, transparent, rgba(91, 203, 255, 0.3), transparent)`;
      circuit.style.transform = `rotate(${angle}deg)`;
      circuit.style.transformOrigin = 'left center';
      circuit.style.animationDelay = `${Math.random() * 3}s`;
      
      circuitsContainer.appendChild(circuit);
    }
    
    // Crear nodos de red neuronal
    for (let i = 0; i < 8; i++) {
      const node = document.createElement('div');
      node.className = 'neural-node';
      
      node.style.left = `${Math.random() * 100}%`;
      node.style.top = `${Math.random() * 100}%`;
      node.style.animationDelay = `${Math.random() * 2}s`;
      
      circuitsContainer.appendChild(node);
    }
    
    // Crear ondas de datos tipo matrix
    for (let i = 0; i < 5; i++) {
      const wave = document.createElement('div');
      wave.className = 'data-wave';
      
      wave.style.left = `${Math.random() * 100}%`;
      wave.style.top = `${Math.random() * 100}%`;
      wave.style.animationDelay = `${Math.random() * 4}s`;
      
      circuitsContainer.appendChild(wave);
    }
    
    // Movimiento suave con el cursor
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      starsContainer.style.transform = `translate(${x * -15}px, ${y * -15}px)`;
      circuitsContainer.style.transform = `translate(${x * -8}px, ${y * -8}px)`;
      container.style.backgroundPosition = `${x * 10}px ${y * 10}px`;
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
        className="fixed inset-0 z-[-3] pointer-events-none bg-gradient-to-br from-[#0A1828] via-[#06111E] to-[#0A1828]"
      >
        {/* Patrón de fondo tipo matriz */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(91,203,255,0.1)_0%,transparent_25%),radial-gradient(circle_at_75%_75%,rgba(23,133,130,0.1)_0%,transparent_25%)] opacity-60"></div>
      </div>
      
      {/* Estrellas animadas */}
      <div ref={starsRef} className="fixed inset-0 z-[-2] pointer-events-none"></div>
      
      {/* Elementos de circuito/IA */}
      <div ref={circuitsRef} className="fixed inset-0 z-[-1] pointer-events-none"></div>
    </>
  );
}
