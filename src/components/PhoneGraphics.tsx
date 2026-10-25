import React from 'react';
import { TechGraphic } from './TechGraphics';

export const PhoneGraphic: React.FC<{ type: string; className?: string }> = ({ type, className = '' }) => {
  return <TechGraphic type={type} className={className} />;
};

export { TechGraphic };
