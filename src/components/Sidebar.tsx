import React, { useState } from 'react';
import {
  LayoutDashboard, Dumbbell, Apple, TrendingUp, BarChart3, Trophy,
  CreditCard, Settings, Bell, Plug, Sparkles, LogOut, X, Menu, Zap, ChevronDown,
} from 'lucide-react';

export type Page =
  | 'dashboard' | 'workouts' | 'nutrition' | 'progress' | 'analytics'
  | 'achievements' | 'ai-coach' | 'subscription' | 'notifications'
  | 'integrations' | 'settings' | 'onboarding';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  unreadCount: number;
  onToast: (type: 'success' | 'info', title: string, msg: string) => void;
}

const navItems: { page: Page; label: string; icon: React.ReactNode; section?: string }[] = [
  { page: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { page: 'workouts', label: 'Workouts', icon: <Dumbbell size={20} /> },
  { page: 'nutrition', label: 'Nutrition', icon: <Apple size={20} /> },
  { page: 'progress', label: 'Progress', icon: <TrendingUp size={20} /> },
  { page: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} />, section: 'Insights' },
  { page: 'ai-coach', label: 'AI Coach', icon: <Sparkles size={20} /> },
  { page: 'achievements', label: 'Achievements', icon: <Trophy size={20} /> },
  { page: 'subscription', label: 'Subscription', icon: <CreditCard size={20} />, section: 'Account' },
  { page: 'integrations', label: 'Integrations', icon: <Plug size={20} /> },
  { page: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
  { page: 'settings', label: 'Settings', icon: <Settings size={20} /> },
];

export default function Sidebar({ currentPage, onNavigate, isMobileOpen, onCloseMobile, unreadCount, onToast }: SidebarProps) {
  let lastSection = '';
  const [userDropdown, setUserDropdown] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <>
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-fade-in" onClick={onCloseMobile} />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-100 z-50 flex flex-col transition-transform duration-300 ease-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b border-gray-100 cursor-pointer group"
          onClick={() => { onNavigate('dashboard'); onCloseMobile(); }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/25 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 group-active:scale-90">
              <Zap size={20} className="text-white" />
            </div>
            <div className="transition-transform duration-200 group-hover:translate-x-0.5">
              <span className="text-lg font-bold text-gray-900">Fit</span>
              <span className="text-lg font-bold gradient-text">AI</span>
              <span className="text-lg font-bold text-gray-900"> Pro</span>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onCloseMobile(); }}
            className="lg:hidden p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-all clickable-sm"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {navItems.map((item, idx) => {
            const showSection = item.section && item.section !== lastSection;
            if (item.section) lastSection = item.section;

            return (
              <React.Fragment key={item.page}>
                {showSection && (
                  <div className="pt-4 pb-1 px-3 animate-fade-in" style={{ animationDelay: `${idx * 30}ms` }}>
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{item.section}</span>
                  </div>
                )}
                <button
                  onClick={() => { onNavigate(item.page); onCloseMobile(); }}
                  onMouseEnter={() => setHoveredItem(item.page)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ripple-container ${
                    currentPage === item.page
                      ? 'bg-primary-50 text-primary-700 shadow-sm shadow-primary-100'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  style={{ animationDelay: `${idx * 30}ms` }}
                >
                  {/* Active indicator */}
                  {currentPage === item.page && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-600 rounded-r-full animate-slide-in-left" />
                  )}
                  <span className={`transition-all duration-200 ${
                    currentPage === item.page
                      ? 'text-primary-600 scale-110'
                      : hoveredItem === item.page
                        ? 'text-gray-700 scale-110 rotate-6'
                        : 'text-gray-400'
                  }`}>
                    {item.icon}
                  </span>
                  <span className={`transition-transform duration-150 ${hoveredItem === item.page ? 'translate-x-0.5' : ''}`}>
                    {item.label}
                  </span>
                  {item.page === 'notifications' && unreadCount > 0 && (
                    <span className="ml-auto bg-fire-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center animate-pop-in animate-heartbeat">
                      {unreadCount}
                    </span>
                  )}
                  {item.page === 'ai-coach' && (
                    <span className="ml-auto bg-gradient-to-r from-primary-500 to-purple-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-shimmer bg-[length:200%_100%] bg-[linear-gradient(90deg,#6366f1,#8b5cf6,#a855f7,#6366f1)]">
                      AI
                    </span>
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-gray-100 p-4 relative">
          {/* User dropdown */}
          {userDropdown && (
            <div className="absolute bottom-full left-3 right-3 mb-2 bg-white rounded-2xl shadow-xl shadow-gray-200/80 border border-gray-100 overflow-hidden animate-fade-in-scale z-10">
              {[
                { label: 'View Profile', action: () => { onNavigate('settings'); setUserDropdown(false); onCloseMobile(); } },
                { label: 'Subscription', action: () => { onNavigate('subscription'); setUserDropdown(false); onCloseMobile(); } },
                { label: 'Help Center', action: () => { onToast('info', 'Help Center', 'Help documentation coming soon!'); setUserDropdown(false); } },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors clickable-sm"
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t border-gray-100">
                <button
                  onClick={() => { onToast('info', 'Signed Out', 'You have been logged out (demo)'); setUserDropdown(false); }}
                  className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors clickable-sm flex items-center gap-2"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>
          )}

          <button
            onClick={() => setUserDropdown(!userDropdown)}
            className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-gray-50 transition-all clickable-sm group"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
              AJ
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-semibold text-gray-900 truncate">Alex Johnson</p>
              <p className="text-xs text-gray-500">Pro Plan</p>
            </div>
            <ChevronDown
              size={16}
              className={`text-gray-400 transition-transform duration-200 ${userDropdown ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </aside>
    </>
  );
}

export function MobileHeader({ onOpenSidebar, unreadCount, onNotifications }: {
  onOpenSidebar: () => void;
  unreadCount: number;
  onNotifications: () => void;
}) {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-xl border-b border-gray-100 z-30 flex items-center justify-between px-4 animate-fade-in-down">
      <button onClick={onOpenSidebar} className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-all clickable-sm active:rotate-90">
        <Menu size={22} />
      </button>
      <div className="flex items-center gap-2 clickable-sm" onClick={onOpenSidebar}>
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
          <Zap size={14} className="text-white" />
        </div>
        <span className="font-bold text-gray-900">FitAI Pro</span>
      </div>
      <button onClick={onNotifications} className="relative p-2 rounded-lg hover:bg-gray-100 transition-all clickable-sm">
        <Bell size={20} className="text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-fire-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pop-in">
            {unreadCount}
          </span>
        )}
      </button>
    </header>
  );
}
