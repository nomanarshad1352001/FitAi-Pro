import { useState, useCallback } from 'react';
import Sidebar, { MobileHeader } from './components/Sidebar';
import type { Page } from './components/Sidebar';
import { ToastContainer } from './components/Toast';
import type { ToastData } from './components/Toast';
import Dashboard from './pages/Dashboard';
import Workouts from './pages/Workouts';
import Nutrition from './pages/Nutrition';
import Progress from './pages/Progress';
import Analytics from './pages/Analytics';
import Achievements from './pages/Achievements';
import AICoach from './pages/AICoach';
import Subscription from './pages/Subscription';
import Notifications from './pages/Notifications';
import Integrations from './pages/Integrations';
import Settings from './pages/Settings';
import Onboarding from './pages/Onboarding';
import { notifications } from './data/dummyData';

let toastId = 0;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('fitai_onboarded');
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addToast = useCallback((type: ToastData['type'], title: string, message: string) => {
    const id = `toast_${++toastId}`;
    setToasts((prev) => [...prev.slice(-4), { id, type, title, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCompleteOnboarding = useCallback(() => {
    localStorage.setItem('fitai_onboarded', 'true');
    setShowOnboarding(false);
    setTimeout(() => addToast('ai', 'Welcome to FitAI Pro! 🎉', 'Your personalized journey starts now'), 500);
  }, [addToast]);

  if (showOnboarding) {
    return <Onboarding onComplete={handleCompleteOnboarding} />;
  }

  const renderPage = () => {
    const t = addToast;
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} onToast={t} />;
      case 'workouts':
        return <Workouts onToast={t} />;
      case 'nutrition':
        return <Nutrition onToast={t} />;
      case 'progress':
        return <Progress onToast={t} />;
      case 'analytics':
        return <Analytics onToast={t} />;
      case 'achievements':
        return <Achievements onToast={t} />;
      case 'ai-coach':
        return <AICoach onToast={t} />;
      case 'subscription':
        return <Subscription onToast={t} />;
      case 'notifications':
        return <Notifications onToast={t} />;
      case 'integrations':
        return <Integrations onToast={t} />;
      case 'settings':
        return <Settings onToast={t} />;
      default:
        return <Dashboard onNavigate={handleNavigate} onToast={t} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/80">
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        unreadCount={unreadCount}
        onToast={addToast}
      />
      <MobileHeader
        onOpenSidebar={() => setIsMobileOpen(true)}
        unreadCount={unreadCount}
        onNotifications={() => handleNavigate('notifications')}
      />

      {/* Main Content */}
      <main className="lg:ml-72 pt-16 lg:pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8" key={currentPage}>
          {renderPage()}
        </div>
      </main>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
