import { useState } from 'react';
import { User, Lock, Bell, Palette, Shield, Download, Trash2, Save, Camera, Globe, Eye, EyeOff } from 'lucide-react';
import { currentUser } from '../data/dummyData';

interface SettingsProps {
  onToast: (type: 'success' | 'info' | 'ai', title: string, msg: string) => void;
}

export default function Settings({ onToast }: SettingsProps) {
  const [activeSection, setActiveSection] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState(currentUser.goals);
  const [selectedDiet, setSelectedDiet] = useState(currentUser.preferences.dietType);
  const [selectedTheme, setSelectedTheme] = useState('Light');
  const [selectedColor, setSelectedColor] = useState('#6366f1');

  const [toggles, setToggles] = useState<Record<string, boolean>>({
    'Email Notifications': true, 'Push Notifications': true, 'Workout Reminders': true,
    'Weekly Reports': true, 'AI Insights': true, 'Marketing Emails': false,
    'Profile Visibility': true, 'Activity Sharing': true, 'Data Analytics': true, 'Third-party Sharing': false,
  });

  const sections = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'security', label: 'Security', icon: <Lock size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
    { id: 'privacy', label: 'Privacy', icon: <Shield size={18} /> },
    { id: 'data', label: 'Data', icon: <Download size={18} /> },
  ];

  const toggleGoal = (g: string) => setSelectedGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
  const toggle = (key: string) => { setToggles(prev => ({ ...prev, [key]: !prev[key] })); onToast('success', `${!toggles[key] ? 'Enabled' : 'Disabled'}`, key); };

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account and preferences</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-3 h-fit animate-fade-in-up delay-100">
          <nav className="space-y-0.5">
            {sections.map((s) => (
              <button key={s.id} onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all clickable-sm ${activeSection === s.id ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                <span className={`transition-transform ${activeSection === s.id ? 'text-primary-600 scale-110' : 'text-gray-400'}`}>{s.icon}</span>{s.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="lg:col-span-3 animate-fade-in-scale">
          {activeSection === 'profile' && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
              <h2 className="text-lg font-bold text-gray-900">Profile Information</h2>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-bold relative cursor-pointer group clickable-sm"
                  onClick={() => onToast('info', 'Upload', 'Photo upload coming soon!')}>
                  AJ
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-2xl transition-colors flex items-center justify-center">
                    <Camera size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{currentUser.name}</p>
                  <p className="text-xs text-gray-400">Pro Member since {currentUser.joinDate}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: 'Full Name', value: currentUser.name, type: 'text' },
                  { label: 'Email', value: currentUser.email, type: 'email' },
                  { label: 'Age', value: currentUser.age, type: 'number' },
                  { label: 'Height (cm)', value: currentUser.height, type: 'number' },
                  { label: 'Weight (kg)', value: currentUser.weight, type: 'number' },
                  { label: 'Target Weight (kg)', value: currentUser.targetWeight, type: 'number' },
                ].map(f => (
                  <div key={f.label} className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                    <input type={f.type} defaultValue={f.value} onClick={() => onToast('info', 'Editing', f.label)}
                      className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all hover:border-primary-300 cursor-pointer" />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fitness Goals</label>
                <div className="flex flex-wrap gap-2">
                  {['Weight Loss', 'Muscle Gain', 'Endurance', 'Flexibility', 'Stress Relief', 'Better Sleep'].map(g => (
                    <button key={g} onClick={() => toggleGoal(g)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all clickable-sm ${selectedGoals.includes(g) ? 'bg-primary-100 text-primary-700 border-2 border-primary-300 scale-105' : 'bg-gray-100 text-gray-500 border-2 border-transparent hover:bg-gray-200'}`}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Diet Preferences</label>
                <div className="flex flex-wrap gap-2">
                  {['Balanced', 'Keto', 'Vegan', 'Vegetarian', 'Paleo', 'Mediterranean'].map(d => (
                    <button key={d} onClick={() => { setSelectedDiet(d); onToast('success', 'Diet Updated', d); }}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all clickable-sm ${selectedDiet === d ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-300 scale-105' : 'bg-gray-100 text-gray-500 border-2 border-transparent hover:bg-gray-200'}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button onClick={() => onToast('info', 'Cancelled', 'Changes discarded')} className="text-sm text-gray-500 hover:text-gray-700 clickable-sm">Cancel</button>
                <button onClick={() => onToast('success', 'Saved! ✓', 'Profile updated successfully')}
                  className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm btn-bounce ripple-container"><Save size={16} /> Save Changes</button>
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
              <h2 className="text-lg font-bold text-gray-900">Security Settings</h2>
              <div className="space-y-4">
                {['Current Password', 'New Password', 'Confirm Password'].map(label => (
                  <div key={label} className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" onClick={() => onToast('info', 'Editing', label)}
                      className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all hover:border-primary-300 pr-10" />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 clickable-sm">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                ))}
                <button onClick={() => onToast('success', 'Password Updated', 'Your password has been changed')}
                  className="bg-primary-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm btn-bounce ripple-container">Update Password</button>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Two-Factor Authentication</h3>
                <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-between clickable-sm hover:bg-primary-50 transition-all cursor-pointer" onClick={() => onToast('success', '2FA Enabled', 'Two-factor authentication activated')}>
                  <div><p className="text-sm font-medium text-gray-900">2FA via Authenticator App</p><p className="text-xs text-gray-400">Extra security layer</p></div>
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium btn-bounce">Enable</button>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Active Sessions</h3>
                <div className="space-y-3">
                  {[
                    { device: 'MacBook Pro — Chrome', location: 'San Francisco, CA', active: true },
                    { device: 'iPhone 15 — Safari', location: 'San Francisco, CA', active: true },
                    { device: 'iPad Air — App', location: 'Los Angeles, CA', active: false },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl clickable-sm hover:bg-gray-100 transition-all cursor-pointer" onClick={() => onToast('info', s.device, s.location)}>
                      <div className="flex items-center gap-3">
                        <Globe size={16} className="text-gray-400" />
                        <div><p className="text-sm font-medium text-gray-900">{s.device}</p><p className="text-xs text-gray-400">{s.location}</p></div>
                      </div>
                      <div className="flex items-center gap-2">
                        {s.active && <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />}
                        <button onClick={(e) => { e.stopPropagation(); onToast('info', 'Revoked', `Session on ${s.device} terminated`); }} className="text-xs text-red-500 hover:text-red-700 font-medium clickable-sm">Revoke</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {(activeSection === 'notifications' || activeSection === 'privacy') && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
              <h2 className="text-lg font-bold text-gray-900">{activeSection === 'notifications' ? 'Notification Preferences' : 'Privacy & Data'}</h2>
              <div className="space-y-3">
                {Object.entries(toggles)
                  .filter(([key]) => activeSection === 'notifications'
                    ? ['Email Notifications', 'Push Notifications', 'Workout Reminders', 'Weekly Reports', 'AI Insights', 'Marketing Emails'].includes(key)
                    : ['Profile Visibility', 'Activity Sharing', 'Data Analytics', 'Third-party Sharing'].includes(key))
                  .map(([label, enabled]) => (
                    <div key={label} onClick={() => toggle(label)}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all clickable-sm cursor-pointer">
                      <div><p className="text-sm font-medium text-gray-900">{label}</p></div>
                      <div className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${enabled ? 'bg-primary-600' : 'bg-gray-300'}`}>
                        <div className={`absolute top-[2px] w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${enabled ? 'translate-x-[22px]' : 'translate-x-[2px]'}`} />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
              <h2 className="text-lg font-bold text-gray-900">Appearance</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: 'Light', preview: 'bg-white border-2' },
                    { name: 'Dark', preview: 'bg-gray-900 border-2 border-gray-700' },
                    { name: 'System', preview: 'bg-gradient-to-r from-white to-gray-900 border-2 border-gray-300' },
                  ].map(t => (
                    <button key={t.name} onClick={() => { setSelectedTheme(t.name); onToast('success', 'Theme Changed', t.name); }}
                      className={`p-4 rounded-xl text-center transition-all clickable-sm ${selectedTheme === t.name ? 'ring-2 ring-primary-500 scale-105' : 'hover:bg-gray-50'}`}>
                      <div className={`w-full h-16 rounded-lg mb-2 ${t.preview} ${selectedTheme === t.name ? 'border-primary-500' : ''}`} />
                      <span className="text-sm font-medium text-gray-900">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Accent Color</label>
                <div className="flex gap-3">
                  {['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'].map(c => (
                    <button key={c} onClick={() => { setSelectedColor(c); onToast('success', 'Color Updated', `Accent changed to ${c}`); }}
                      className={`w-10 h-10 rounded-full transition-all clickable-sm hover:scale-125 ${selectedColor === c ? 'ring-2 ring-offset-2 scale-110' : ''}`}
                      style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'data' && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
              <h2 className="text-lg font-bold text-gray-900">Data Management</h2>
              <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-between clickable-sm hover:bg-primary-50 transition-all cursor-pointer"
                onClick={() => onToast('success', 'Export Started', 'Your data is being prepared for download')}>
                <div className="flex items-center gap-3"><Download size={18} className="text-primary-600" /><div><p className="text-sm font-medium text-gray-900">Export Your Data</p><p className="text-xs text-gray-400">Download all data</p></div></div>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium btn-bounce">Export</button>
              </div>
              <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex items-center justify-between clickable-sm hover:bg-red-100 transition-all cursor-pointer"
                onClick={() => onToast('error' as 'info', 'Warning', 'This action cannot be undone')}>
                <div className="flex items-center gap-3"><Trash2 size={18} className="text-red-500" /><div><p className="text-sm font-medium text-red-700">Delete Account</p><p className="text-xs text-red-400">Permanently delete everything</p></div></div>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium btn-bounce">Delete</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
