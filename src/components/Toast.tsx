import { useEffect, useState } from 'react';
import { CheckCircle2, X, AlertTriangle, Info, Sparkles } from 'lucide-react';

export interface ToastData {
  id: string;
  type: 'success' | 'error' | 'info' | 'ai';
  title: string;
  message: string;
}

const icons = {
  success: <CheckCircle2 size={20} className="text-emerald-500" />,
  error: <AlertTriangle size={20} className="text-red-500" />,
  info: <Info size={20} className="text-blue-500" />,
  ai: <Sparkles size={20} className="text-purple-500" />,
};

const bgColors = {
  success: 'bg-emerald-50 border-emerald-200',
  error: 'bg-red-50 border-red-200',
  info: 'bg-blue-50 border-blue-200',
  ai: 'bg-purple-50 border-purple-200',
};

export function ToastContainer({ toasts, onRemove }: { toasts: ToastData[]; onRemove: (id: string) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] space-y-3 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: ToastData; onRemove: (id: string) => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onRemove(toast.id), 300);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-2xl border shadow-lg shadow-gray-200/50 max-w-sm ${bgColors[toast.type]} ${
        exiting ? 'toast-exit' : 'toast-enter'
      }`}
    >
      <span className="mt-0.5 shrink-0">{icons[toast.type]}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">{toast.title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{toast.message}</p>
      </div>
      <button
        onClick={() => {
          setExiting(true);
          setTimeout(() => onRemove(toast.id), 300);
        }}
        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-white/50 clickable-sm shrink-0"
      >
        <X size={14} />
      </button>
    </div>
  );
}
