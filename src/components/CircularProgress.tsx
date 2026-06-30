import { useEffect, useState } from 'react';

interface CircularProgressProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  animated?: boolean;
}

export default function CircularProgress({
  value,
  max,
  size = 120,
  strokeWidth = 8,
  color = '#6366f1',
  bgColor = '#e0e7ff',
  children,
  onClick,
  animated = true,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min(value / max, 1);

  const [animatedOffset, setAnimatedOffset] = useState(circumference);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedOffset(circumference - percentage * circumference);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setAnimatedOffset(circumference - percentage * circumference);
    }
  }, [circumference, percentage, animated]);

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center group ${onClick ? 'cursor-pointer' : ''}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={bgColor} strokeWidth={strokeWidth}
          className="transition-all duration-300 group-hover:opacity-60"
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={animatedOffset}
          strokeLinecap="round"
          className="transition-all duration-[1200ms] ease-out"
          style={{ filter: onClick ? 'drop-shadow(0 0 4px rgba(99,102,241,0.3))' : undefined }}
        />
      </svg>
      <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-200 ${onClick ? 'group-hover:scale-105 group-active:scale-95' : ''}`}>
        {children}
      </div>
    </div>
  );
}
