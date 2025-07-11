
"use client";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimelineItem } from "./types";

interface OrbitalNodeProps {
  item: TimelineItem;
  timelineData: TimelineItem[];
  position: { x: number; y: number; zIndex: number; opacity: number };
  isExpanded: boolean;
  isRelated: boolean;
  isPulsing: boolean;
  onToggle: (id: number) => void;
}

export default function OrbitalNode({
  item,
  timelineData,
  position,
  isExpanded,
  isRelated,
  isPulsing,
  onToggle,
}: OrbitalNodeProps) {
  const Icon = item.icon;

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-[#040D18] bg-[#5BCBFF] border-[#5BCBFF]";
      case "in-progress":
        return "text-white bg-[#178582] border-[#178582]";
      case "pending":
        return "text-white bg-[#FF8C42]/60 border-[#FF8C42]";
      default:
        return "text-white bg-[#040D18]/40 border-white/50";
    }
  };

  const nodeStyle = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    zIndex: isExpanded ? 200 : position.zIndex,
    opacity: isExpanded ? 1 : position.opacity,
  };

  return (
    <div
      className="absolute transition-all duration-700 cursor-pointer"
      style={nodeStyle}
      onClick={(e) => {
        e.stopPropagation();
        onToggle(item.id);
      }}
    >
      <div
        className={`absolute rounded-full -inset-1 ${
          isPulsing ? "animate-pulse duration-1000" : ""
        }`}
        style={{
          background: `radial-gradient(circle, rgba(91,203,255,0.2) 0%, rgba(91,203,255,0) 70%)`,
          width: `${item.energy * 0.5 + 40}px`,
          height: `${item.energy * 0.5 + 40}px`,
          left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
          top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
        }}
      ></div>

      <div
        className={`
        w-10 h-10 rounded-full flex items-center justify-center
        ${
          isExpanded
            ? "bg-[#5BCBFF] text-[#040D18]"
            : isRelated
            ? "bg-[#178582] text-white"
            : "bg-[#040D18] text-[#5BCBFF]"
        }
        border-2 
        ${
          isExpanded
            ? "border-[#5BCBFF] shadow-lg shadow-[#5BCBFF]/30"
            : isRelated
            ? "border-[#178582] animate-pulse"
            : "border-[#5BCBFF]/40"
        }
        transition-all duration-300 transform
        ${isExpanded ? "scale-150" : ""}
      `}
      >
        <Icon size={16} />
      </div>

      <div
        className={`
        absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap
        text-xs font-semibold tracking-wider
        transition-all duration-300
        ${isExpanded ? "text-[#5BCBFF] scale-125" : "text-white/70"}
      `}
      >
        {item.title}
      </div>

      {isExpanded && (
        <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-[#040D18]/90 backdrop-blur-lg border-[#5BCBFF]/30 shadow-xl shadow-[#5BCBFF]/10 overflow-visible">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-[#5BCBFF]/50"></div>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <Badge
                className={`px-2 text-xs ${getStatusStyles(
                  item.status
                )}`}
              >
                {item.status === "completed"
                  ? "COMPLETADO"
                  : item.status === "in-progress"
                  ? "EN PROCESO"
                  : "PENDIENTE"}
              </Badge>
              <span className="text-xs font-mono text-[#5BCBFF]/50">
                {item.date}
              </span>
            </div>
            <CardTitle className="text-sm mt-2 text-white">
              {item.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-white/80">
            <p>{item.content}</p>

            <div className="mt-4 pt-3 border-t border-[#5BCBFF]/10">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="flex items-center text-[#5BCBFF]">
                  <Zap size={10} className="mr-1" />
                  Precisión IA
                </span>
                <span className="font-mono text-[#5BCBFF]">{item.energy}%</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#5BCBFF] to-[#178582]"
                  style={{ width: `${item.energy}%` }}
                ></div>
              </div>
            </div>

            {item.relatedIds.length > 0 && (
              <div className="mt-4 pt-3 border-t border-[#5BCBFF]/10">
                <div className="flex items-center mb-2">
                  <Link size={10} className="text-[#5BCBFF]/70 mr-1" />
                  <h4 className="text-xs uppercase tracking-wider font-medium text-[#5BCBFF]/70">
                    Procesos Conectados
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1">
                  {item.relatedIds.map((relatedId) => {
                    const relatedItem = timelineData.find(
                      (i) => i.id === relatedId
                    );
                    return (
                      <Button
                        key={relatedId}
                        variant="outline"
                        size="sm"
                        className="flex items-center h-6 px-2 py-0 text-xs rounded-none border-[#5BCBFF]/20 bg-transparent hover:bg-[#5BCBFF]/10 text-white/80 hover:text-white transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggle(relatedId);
                        }}
                      >
                        {relatedItem?.title}
                        <ArrowRight
                          size={8}
                          className="ml-1 text-[#5BCBFF]/60"
                        />
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
