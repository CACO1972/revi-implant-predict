
import React from 'react';
import { Activity } from "lucide-react";

interface DentalIconProps {
  className?: string;
  size?: number;
}

const DentalIcon: React.FC<DentalIconProps> = ({ className = "", size = 24 }) => {
  return (
    <Activity className={className} size={size} />
  );
};

export default DentalIcon;
