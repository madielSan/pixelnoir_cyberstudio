import React, { ButtonHTMLAttributes } from 'react';

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const NeonButton: React.FC<NeonButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-cyberpunk transition-all duration-300 relative overflow-hidden';
  const variantStyles = {
    primary: 'bg-transparent border border-cyan-500 text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:bg-cyan-950/30',
    secondary: 'bg-transparent border border-purple-500 text-purple-400 hover:text-purple-300 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:bg-purple-950/30'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};