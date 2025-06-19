
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';
import { motion } from 'framer-motion';

interface ToothData {
  name: string;
  number: number;
  position: [number, number, number];
  isMissing: boolean;
}

interface ToothProps extends ThreeElements['mesh'] {
  toothData: ToothData;
  onClick: (tooth: ToothData) => void;
  isHovered: boolean;
  onHover: (tooth: ToothData | null) => void;
}

function Tooth({ toothData, onClick, isHovered, onHover, ...props }: ToothProps) {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && isHovered) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <mesh
      {...props}
      ref={meshRef}
      position={toothData.position}
      onClick={() => onClick(toothData)}
      onPointerOver={() => onHover(toothData)}
      onPointerOut={() => onHover(null)}
    >
      <cylinderGeometry args={[0.5, 0.5, 1, 20]} />
      <meshPhongMaterial 
        color={toothData.isMissing ? '#FF8C42' : '#ffffff'} 
        shininess={70}
      />
    </mesh>
  );
}

interface Odontogram3DProps {
  onSelectionChange: (missingTeeth: number[]) => void;
}

export default function Odontogram3D({ onSelectionChange }: Odontogram3DProps) {
  const [teeth, setTeeth] = useState<ToothData[]>([]);
  const [hoveredTooth, setHoveredTooth] = useState<ToothData | null>(null);
  const [selectedInfo, setSelectedInfo] = useState<string>('');
  const [showInstructions, setShowInstructions] = useState(true);

  // Inicializar dientes con posiciones realistas
  useEffect(() => {
    const teethPositions: Omit<ToothData, 'isMissing'>[] = [
      // Fila superior
      { name: "Molar Superior Izquierdo", number: 18, position: [-7, 3, 0] },
      { name: "Molar Superior Izquierdo", number: 17, position: [-6, 3, 0] },
      { name: "Premolar Superior Izquierdo", number: 16, position: [-5, 3, 0] },
      { name: "Premolar Superior Izquierdo", number: 15, position: [-4, 3, 0] },
      { name: "Canino Superior Izquierdo", number: 13, position: [-3, 3.5, 0] },
      { name: "Incisivo Superior Izquierdo", number: 12, position: [-2, 4, 0] },
      { name: "Incisivo Superior Central", number: 11, position: [-1, 4, 0] },
      { name: "Incisivo Superior Central", number: 21, position: [1, 4, 0] },
      { name: "Incisivo Superior Derecho", number: 22, position: [2, 4, 0] },
      { name: "Canino Superior Derecho", number: 23, position: [3, 3.5, 0] },
      { name: "Premolar Superior Derecho", number: 25, position: [4, 3, 0] },
      { name: "Premolar Superior Derecho", number: 26, position: [5, 3, 0] },
      { name: "Molar Superior Derecho", number: 27, position: [6, 3, 0] },
      { name: "Molar Superior Derecho", number: 28, position: [7, 3, 0] },
      
      // Fila inferior
      { name: "Molar Inferior Izquierdo", number: 48, position: [-7, -3, 0] },
      { name: "Molar Inferior Izquierdo", number: 47, position: [-6, -3, 0] },
      { name: "Premolar Inferior Izquierdo", number: 46, position: [-5, -3, 0] },
      { name: "Premolar Inferior Izquierdo", number: 45, position: [-4, -3, 0] },
      { name: "Canino Inferior Izquierdo", number: 43, position: [-3, -3.5, 0] },
      { name: "Incisivo Inferior Izquierdo", number: 42, position: [-2, -4, 0] },
      { name: "Incisivo Inferior Central", number: 41, position: [-1, -4, 0] },
      { name: "Incisivo Inferior Central", number: 31, position: [1, -4, 0] },
      { name: "Incisivo Inferior Derecho", number: 32, position: [2, -4, 0] },
      { name: "Canino Inferior Derecho", number: 33, position: [3, -3.5, 0] },
      { name: "Premolar Inferior Derecho", number: 35, position: [4, -3, 0] },
      { name: "Premolar Inferior Derecho", number: 36, position: [5, -3, 0] },
      { name: "Molar Inferior Derecho", number: 37, position: [6, -3, 0] },
      { name: "Molar Inferior Derecho", number: 38, position: [7, -3, 0] }
    ];

    const initialTeeth = teethPositions.map(tooth => ({
      ...tooth,
      isMissing: false
    }));

    setTeeth(initialTeeth);
  }, []);

  const handleToothClick = (clickedTooth: ToothData) => {
    const updatedTeeth = teeth.map(tooth => 
      tooth.number === clickedTooth.number 
        ? { ...tooth, isMissing: !tooth.isMissing }
        : tooth
    );
    
    setTeeth(updatedTeeth);
    
    const missingTeethNumbers = updatedTeeth
      .filter(tooth => tooth.isMissing)
      .map(tooth => tooth.number);
    
    onSelectionChange(missingTeethNumbers);
    
    const status = clickedTooth.isMissing ? 'presente' : 'faltante';
    setSelectedInfo(`Diente ${clickedTooth.number} marcado como ${status}`);
    
    // Ocultar mensaje después de 3 segundos
    setTimeout(() => setSelectedInfo(''), 3000);
  };

  const resetSelection = () => {
    const resetTeeth = teeth.map(tooth => ({ ...tooth, isMissing: false }));
    setTeeth(resetTeeth);
    onSelectionChange([]);
    setSelectedInfo('Selección reiniciada');
    setTimeout(() => setSelectedInfo(''), 2000);
  };

  const missingCount = teeth.filter(tooth => tooth.isMissing).length;

  return (
    <div className="w-full h-[500px] relative bg-gradient-to-b from-[#040D18] to-[#0A1828] rounded-xl overflow-hidden">
      {/* Canvas 3D */}
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        {/* Iluminación */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 20, 15]} intensity={0.8} />
        
        {/* Controles de órbita */}
        <OrbitControls 
          enableDamping 
          dampingFactor={0.05}
          enableZoom={true}
          enablePan={false}
          maxDistance={25}
          minDistance={8}
        />
        
        {/* Renderizar dientes */}
        {teeth.map((tooth) => (
          <Tooth
            key={tooth.number}
            toothData={tooth}
            onClick={handleToothClick}
            isHovered={hoveredTooth?.number === tooth.number}
            onHover={setHoveredTooth}
          />
        ))}
        
        {/* Etiquetas de referencia */}
        <Text
          position={[0, 6, 0]}
          fontSize={1}
          color="#5BCBFF"
          anchorX="center"
          anchorY="middle"
        >
          Superior
        </Text>
        
        <Text
          position={[0, -6, 0]}
          fontSize={1}
          color="#5BCBFF"
          anchorX="center"
          anchorY="middle"
        >
          Inferior
        </Text>
      </Canvas>

      {/* Panel de información superpuesto */}
      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-4 text-white max-w-xs">
        {showInstructions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2"
          >
            <h3 className="text-[#5BCBFF] font-bold text-sm">Instrucciones:</h3>
            <ul className="text-xs space-y-1 text-white/80">
              <li>• <span className="text-[#FF8C42]">Toca</span> un diente para marcarlo como faltante</li>
              <li>• <span className="text-[#5BCBFF]">Arrastra</span> para rotar la vista</li>
              <li>• <span className="text-[#178582]">Pellizca</span> para hacer zoom</li>
            </ul>
            <button 
              onClick={() => setShowInstructions(false)}
              className="text-[#BFA181] text-xs hover:text-white transition-colors"
            >
              Cerrar ayuda
            </button>
          </motion.div>
        )}
        
        {!showInstructions && hoveredTooth && (
          <div className="space-y-1">
            <h4 className="text-[#5BCBFF] font-bold text-sm">Diente {hoveredTooth.number}</h4>
            <p className="text-xs text-white/80">{hoveredTooth.name}</p>
            <p className="text-xs text-[#FF8C42]">
              {hoveredTooth.isMissing ? 'Marcado como faltante' : 'Presente'}
            </p>
          </div>
        )}
      </div>

      {/* Panel de estado */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-4">
        <div className="text-white text-sm">
          <span className="text-[#5BCBFF] font-bold">{missingCount}</span> dientes faltantes
        </div>
        
        <button
          onClick={resetSelection}
          className="bg-[#178582] hover:bg-[#178582]/80 text-white px-4 py-2 rounded-full text-xs transition-colors"
        >
          Reiniciar
        </button>
        
        {!showInstructions && (
          <button
            onClick={() => setShowInstructions(true)}
            className="bg-[#FF8C42] hover:bg-[#FF8C42]/80 text-white px-4 py-2 rounded-full text-xs transition-colors"
          >
            Ayuda
          </button>
        )}
      </div>

      {/* Mensaje de feedback */}
      {selectedInfo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#178582] text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          {selectedInfo}
        </motion.div>
      )}
    </div>
  );
}
