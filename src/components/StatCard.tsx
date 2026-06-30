import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: { value: number; label: string };
  color?: 'primary' | 'accent' | 'energy' | 'fire';
  className?: string;
  onClick?: () => void;
  delay?: number;
}

const colorMap = {
  primary: { icon: 'bg-primary-100 text-primary-600', glow: 'hover:shadow-primary-200/50' },
  accent: { icon: 'bg-emerald-100 text-emerald-600', glow: 'hover:shadow-emerald-200/50' },
  energy: { icon: 'bg-amber-100 text-amber-600', glow: 'hover:shadow-amber-200/50' },
  fire: { icon: 'bg-red-100 text-red-600', glow: 'hover:shadow-red-200/50' },
};

export default function StatCard({ title, value, subtitle, icon, trend, color = 'primary', className = '', onClick, delay = 0 }: StatCardProps) {
  const colors = colorMap[color];

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-5 border border-gray-100 card-hover hover-glow ${colors.glow} animate-fade-in-up cursor-pointer group ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${colors.icon} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 group-active:scale-95`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trend.value >= 0 ? 'text-emerald-600' : 'text-red-500'} transition-transform group-hover:scale-110`}>
            {trend.value >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-primary-700">{value}</h3>
      <p className="text-sm text-gray-500 mt-0.5">{title}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}
