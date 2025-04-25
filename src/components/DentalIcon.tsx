
import React from 'react';
import { Activity, Stethoscope, Trophy, Award, Shield } from "lucide-react";

interface DentalIconProps {
  className?: string;
  size?: number;
  score?: number;
  totalScore?: number;
}

const DentalIcon: React.FC<DentalIconProps> = ({ className = "", size = 240, score, totalScore }) => {
  // Usar totalScore si está presente, de lo contrario usar score
  const finalScore = totalScore !== undefined ? totalScore : score;
  
  // Choose appropriate icon based on score
  const renderIcon = () => {
    if (!finalScore && finalScore !== 0) return <Activity className={className} size={size} />;
    
    if (finalScore <= 3) return <Trophy className={`text-emerald-400 ${className}`} size={size} />;
    if (finalScore <= 6) return <Award className={`text-primary ${className}`} size={size} />;
    if (finalScore <= 9) return <Shield className={`text-gold ${className}`} size={size} />;
    return <Stethoscope className={`text-red-400 ${className}`} size={size} />;
  };

  return (
    <div className="relative flex items-center justify-center rounded-full bg-white/5 p-10 border border-white/10 shadow-lg">
      {renderIcon()}
    </div>
  );
};

export default DentalIcon;
