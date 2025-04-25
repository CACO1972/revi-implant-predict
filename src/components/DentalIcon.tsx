
import React from 'react';
import { Tooth } from "lucide-react";

interface DentalIconProps {
  className?: string;
  size?: number;
}

const DentalIcon: React.FC<DentalIconProps> = ({ className = "", size = 24 }) => {
  return (
    <Tooth className={className} size={size} />
  );
};

export default DentalIcon;
