import { useState } from 'react';
import { Bell, Check, CheckCheck, Trash2, Settings } from 'lucide-react';
import { notifications as initialNotifications } from '../data/dummyData';

interface NotificationsProps {
  onToast: (type: 'success' | 'info' | 'ai', title: string, msg: string) => void;
}

export default function Notifications({ onToast }: NotificationsProps) {
  const [notifs, setNotifs] = useState(initialNotifications.map(n => ({ ...n })));
  const [filter, setFilter] = useState('All');
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    'Workout Reminders': true, 'Meal Logging': true, 'AI Insights': true,
    'Achievement Alerts': true, 'Community Updates': false, 'Marketing': false,
  });

  const unread = notifs.filter(n => !n.read).length;
  const filtered = filter === 'All' ? notifs : notifs.filter(n => n.type.toLowerCase() === filter.toLowerCase());

  const markRead = (id: string) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    onToast('success', 'Marked as read', 'Notification dismissed');
  };

  const deleteNotif = (id: string) => {
    setNotifs(prev => prev.filter(n => n.id !== id));
    onToast('info', 'Deleted', 'Notification removed');
  };

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
    onToast('success', 'All Read ✓', 'All notifications marked as read');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 mt-1">{unread} unread notification{unread !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={markAllRead} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 bg-gray-100 px-4 py-2 rounded-xl transition-all clickable-sm hover:bg-primary-50 hover:text-primary-700">
            <CheckCheck size={16} /> Mark All Read
          </button>
          <button onClick={() => onToast('info', 'Preferences', 'Notification settings below')} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 bg-gray-100 px-4 py-2 rounded-xl transition-all clickable-sm hover:bg-primary-50 hover:text-primary-700">
            <Settings size={16} /> Preferences
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 animate-fade-in-up delay-100">
        {['All', 'Workout', 'Nutrition', 'Achievement', 'AI', 'System'].map((cat) => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all clickable-sm ${filter === cat ? 'bg-primary-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 animate-fade-in-up delay-150">
        {filtered.map((notification) => (
          <div key={notification.id}
            onClick={() => { if (!notification.read) markRead(notification.id); onToast('info', notification.title, notification.message); }}
            className={`flex items-start gap-4 p-5 hover:bg-gray-50 transition-all cursor-pointer clickable-sm ${!notification.read ? 'bg-primary-50/30' : ''}`}>
            <span className="text-2xl shrink-0 transition-transform hover:scale-125">{notification.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className={`text-sm font-semibold hover:text-primary-700 transition-colors ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>{notification.title}</h3>
                {!notification.read && <span className="w-2 h-2 bg-primary-500 rounded-full shrink-0 mt-1.5 animate-pulse" />}
              </div>
              <p className="text-sm text-gray-500 mt-0.5">{notification.message}</p>
              <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={(e) => { e.stopPropagation(); markRead(notification.id); }} className="p-1.5 text-gray-300 hover:text-emerald-500 rounded-lg hover:bg-emerald-50 transition-all clickable-sm" title="Mark as read"><Check size={14} /></button>
              <button onClick={(e) => { e.stopPropagation(); deleteNotif(notification.id); }} className="p-1.5 text-gray-300 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all clickable-sm" title="Delete"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="p-12 text-center text-gray-400 animate-fade-in">
            <Bell size={32} className="mx-auto mb-3 text-gray-300" />
            <p className="text-sm">No notifications in this category</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-fade-in-up delay-200">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 cursor-pointer clickable-sm hover:text-primary-700 transition-colors" onClick={() => onToast('info', 'Settings', 'Toggle your notification preferences')}>
          <Bell size={18} className="text-primary-500" /> Push Notification Settings
        </h2>
        <div className="space-y-3">
          {Object.entries(toggles).map(([label, enabled]) => (
            <div key={label} className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all clickable-sm cursor-pointer"
              onClick={() => { setToggles(prev => ({ ...prev, [label]: !prev[label] })); onToast('success', `${!enabled ? 'Enabled' : 'Disabled'}`, `${label} notifications ${!enabled ? 'on' : 'off'}`); }}>
              <div><p className="text-sm font-medium text-gray-900">{label}</p></div>
              <div className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${enabled ? 'bg-primary-600' : 'bg-gray-300'}`}>
                <div className={`absolute top-[2px] w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${enabled ? 'translate-x-[22px]' : 'translate-x-[2px]'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
