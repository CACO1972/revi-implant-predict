
"use client";
import { useRef } from "react";
import OrbitalCenter from "@/components/orbital/OrbitalCenter";
import OrbitalNode from "@/components/orbital/OrbitalNode";
import { useOrbitalState } from "@/components/orbital/useOrbitalState";
import { calculateNodePosition, getRelatedItems, isRelatedToActive } from "@/components/orbital/orbitalUtils";
import { RadialOrbitalTimelineProps, TimelineItem } from "@/components/orbital/types";

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const {
    expandedItems,
    setExpandedItems,
    rotationAngle,
    setRotationAngle,
    autoRotate,
    setAutoRotate,
    pulseEffect,
    setPulseEffect,
    centerOffset,
    activeNodeId,
    setActiveNodeId,
  } = useOrbitalState();

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id, timelineData);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  return (
    <div
      className="w-full h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-[#040D18] to-[#0A1828] overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <OrbitalCenter />

          {/* Órbita visible */}
          <div className="absolute w-96 h-96 rounded-full border border-[#5BCBFF]/10"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length, rotationAngle, centerOffset);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id, activeNodeId, timelineData);
            const isPulsing = pulseEffect[item.id];

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
              >
                <OrbitalNode
                  item={item}
                  timelineData={timelineData}
                  position={position}
                  isExpanded={isExpanded}
                  isRelated={isRelated}
                  isPulsing={isPulsing}
                  onToggle={toggleItem}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
