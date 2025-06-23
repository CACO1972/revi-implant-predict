
import React, { useRef, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";

// Utilidades para generar el odontograma FDI
const getTeethData = () => [
  // Superior derecho (11-18)
  ...Array(8).fill().map((_, i) => ({ fdi: `1${i+1}`, x: -4 + i, y: 1.8, z: 0 })),
  // Superior izquierdo (21-28)
  ...Array(8).fill().map((_, i) => ({ fdi: `2${i+1}`, x: 4 - i, y: 1.8, z: 0 })),
  // Inferior izquierdo (31-38)
  ...Array(8).fill().map((_, i) => ({ fdi: `3${i+1}`, x: 4 - i, y: -1.8, z: 0 })),
  // Inferior derecho (41-48)
  ...Array(8).fill().map((_, i) => ({ fdi: `4${i+1}`, x: -4 + i, y: -1.8, z: 0 })),
];

// Geometría básica para diferentes tipos de dientes
function Tooth({ idx, position, fdi, isMissing, onToggle }) {
  let geometry;
  if ([0, 7, 8, 15, 16, 23, 24, 31].includes(idx))
    geometry = <cylinderGeometry args={[0.28, 0.28, 1.2, 24]} />;
  else if ([2, 5, 10, 13, 18, 21, 26, 29].includes(idx))
    geometry = <cylinderGeometry args={[0.22, 0.22, 1, 20]} />;
  else if ([3, 4, 11, 12, 19, 20, 27, 28].includes(idx))
    geometry = <cylinderGeometry args={[0.18, 0.14, 0.95, 18]} />;
  else geometry = <cylinderGeometry args={[0.15, 0.1, 0.85, 16]} />;

  return (
    <group position={position}>
      <mesh
        onClick={onToggle}
        castShadow
        receiveShadow
        rotation={[Math.PI / 2, 0, 0]}
      >
        {geometry}
        <meshPhongMaterial
          color={isMissing ? "#c22" : "#fafafa"}
          shininess={isMissing ? 5 : 70}
          specular={isMissing ? "#400" : "#cccccc"}
        />
      </mesh>
      {/* Etiqueta FDI */}
      <Html position={[0, 0.75, 1.05]} center>
        <div
          style={{
            background: "#fff9",
            borderRadius: 6,
            fontSize: 13,
            padding: "2px 6px",
            color: "#195",
            border: "1px solid #aaa3",
            fontWeight: "bold",
            userSelect: "none",
            pointerEvents: "none",
            boxShadow: "0 2px 6px #0001",
          }}
        >
          {fdi}
        </div>
      </Html>
    </group>
  );
}

// Componente principal
export default function Odontogram3D({ onChange }) {
  const [missing, setMissing] = useState([]);
  const teeth = getTeethData();

  const handleToggle = useCallback(
    (fdi) => {
      setMissing((prev) => {
        const nuevo = prev.includes(fdi)
          ? prev.filter((v) => v !== fdi)
          : [...prev, fdi];
        onChange && onChange(nuevo);
        return nuevo;
      });
    },
    [onChange]
  );

  // Mantén canvas fullscreen y responsivo
  return (
    <div style={{ width: "100%", height: "60vh", minHeight: 400, background: "#f3f3f3", borderRadius: 16, boxShadow: "0 4px 24px #0002", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 16], fov: 52 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[0, 10, 20]} intensity={1.3} />
        <OrbitControls
          enablePan={false}
          minDistance={9}
          maxDistance={28}
          dampingFactor={0.15}
        />
        {teeth.map((t, idx) => (
          <Tooth
            key={t.fdi}
            idx={idx}
            fdi={t.fdi}
            position={[t.x, t.y, t.z]}
            isMissing={missing.includes(t.fdi)}
            onToggle={() => handleToggle(t.fdi)}
          />
        ))}
      </Canvas>
      {/* Panel lateral: listado de dientes faltantes */}
      <div
        style={{
          position: "absolute",
          top: 18,
          right: 22,
          background: "#fff",
          padding: "14px 18px",
          borderRadius: 10,
          boxShadow: "0 1px 10px #0002",
          minWidth: 120,
        }}
      >
        <div style={{ fontWeight: 700, color: "#0A1828", marginBottom: 7 }}>
          Dientes Faltantes
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: "disc inside" }}>
          {missing.length === 0 && <li style={{ color: "#aaa" }}>Ninguno</li>}
          {missing.map((fdi) => (
            <li key={fdi}>{fdi}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
