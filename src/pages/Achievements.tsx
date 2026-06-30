import { useState } from 'react';
import { Trophy, Star, Lock, TrendingUp } from 'lucide-react';
import Modal from '../components/Modal';
import Confetti from '../components/Confetti';
import { achievements, leaderboard, currentUser } from '../data/dummyData';

interface AchievementsProps {
  onToast: (type: 'success' | 'info' | 'ai', title: string, msg: string) => void;
}

export default function Achievements({ onToast }: AchievementsProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'earned' | 'locked'>('all');

  const totalXP = achievements.filter(a => a.earned).reduce((sum, a) => sum + a.xp, 0);
  const earnedCount = achievements.filter(a => a.earned).length;

  const filtered = filter === 'all' ? achievements : filter === 'earned' ? achievements.filter(a => a.earned) : achievements.filter(a => !a.earned);
  const selected = achievements.find(a => a.id === selectedAchievement);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 100);
  };

  return (
    <div className="space-y-6">
      <Confetti active={showConfetti} />

      <div className="animate-fade-in-up">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Achievements & Gamification</h1>
        <p className="text-gray-500 mt-1">Track your milestones and compete with others</p>
      </div>

      {/* XP Summary */}
      <div
        className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl p-6 text-white relative overflow-hidden animate-fade-in-up delay-100 cursor-pointer group"
        onClick={() => { triggerConfetti(); onToast('success', 'Level Up! 🎉', 'You\'re an amazing athlete!'); }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 transition-transform duration-700 group-hover:scale-150" />
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 group-active:scale-95">
            <Trophy size={40} className="text-amber-200" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-black">{totalXP} XP</h2>
            <p className="text-amber-100 text-sm mb-2">Level 12 Fitness Warrior</p>
            <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm clickable-sm hover:bg-white/30 transition-all">{earnedCount}/{achievements.length} Unlocked</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm clickable-sm hover:bg-white/30 transition-all animate-heartbeat">{currentUser.streak} Day Streak 🔥</span>
            </div>
          </div>
          <div className="sm:ml-auto text-center cursor-pointer clickable-sm" onClick={(e) => { e.stopPropagation(); onToast('info', 'Leaderboard Rank', '#3 globally!'); }}>
            <div className="w-20 h-20 rounded-full border-4 border-white/30 flex items-center justify-center bg-white/10 transition-transform group-hover:scale-110">
              <span className="text-2xl font-black">#3</span>
            </div>
            <p className="text-xs text-amber-200 mt-1">Leaderboard</p>
          </div>
        </div>
        <div className="relative z-10 mt-4">
          <div className="flex justify-between text-xs text-amber-200 mb-1">
            <span className="clickable-sm">Level 12</span>
            <span className="clickable-sm">Level 13 — 200 XP needed</span>
          </div>
          <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full progress-animate" style={{ width: '72%' }} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 animate-fade-in-up delay-150">
        {(['all', 'earned', 'locked'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all clickable-sm capitalize ${filter === f ? 'bg-primary-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {f} {f === 'earned' ? `(${earnedCount})` : f === 'locked' ? `(${achievements.length - earnedCount})` : ''}
          </button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
        {filtered.map((achievement) => (
          <div
            key={achievement.id}
            onClick={() => { setSelectedAchievement(achievement.id); if (achievement.earned) triggerConfetti(); }}
            className={`rounded-2xl border p-5 card-hover cursor-pointer group ${
              achievement.earned ? 'bg-white border-gray-100' : 'bg-gray-50 border-gray-200/50'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">{achievement.icon}</span>
              {achievement.earned ? (
                <div className="flex items-center gap-1 bg-emerald-100 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded-full clickable-sm hover:bg-emerald-200 transition-colors">
                  <Star size={10} /> Earned
                </div>
              ) : (
                <Lock size={16} className="text-gray-300 group-hover:text-primary-400 transition-colors" />
              )}
            </div>
            <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary-700 transition-colors">{achievement.name}</h3>
            <p className="text-xs text-gray-500 mt-1 mb-3">{achievement.description}</p>
            {achievement.earned ? (
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 clickable-sm hover:text-gray-600 transition-colors">{achievement.date}</span>
                <span className="text-xs font-bold text-amber-600 clickable-sm hover:text-amber-700 transition-colors">+{achievement.xp} XP</span>
              </div>
            ) : (
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-primary-600 font-medium">{achievement.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-500 rounded-full progress-animate" style={{ width: `${achievement.progress}%` }} />
                </div>
                <p className="text-xs text-amber-500 font-medium mt-2 clickable-sm hover:text-amber-600 transition-colors">+{achievement.xp} XP on completion</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-2xl border border-gray-100 animate-fade-in-up delay-300">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between cursor-pointer" onClick={() => onToast('info', 'Leaderboard', 'Updated in real-time')}>
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-primary-500" />
            <h2 className="text-lg font-bold text-gray-900 hover:text-primary-700 transition-colors">Global Leaderboard</h2>
          </div>
          <span className="text-xs bg-gray-50 text-gray-500 px-2.5 py-1 rounded-lg clickable-sm">This Month</span>
        </div>
        <div className="divide-y divide-gray-50">
          {leaderboard.map((user) => (
            <div
              key={user.rank}
              onClick={() => onToast('info', user.name, `${user.score.toLocaleString()} points • ${user.workouts} workouts`)}
              className={`flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-all cursor-pointer clickable-sm ${
                user.isCurrentUser ? 'bg-primary-50/50' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-transform hover:scale-125 ${
                user.rank === 1 ? 'bg-amber-100 text-amber-700' : user.rank === 2 ? 'bg-gray-200 text-gray-600' : user.rank === 3 ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'
              }`}>
                {user.rank <= 3 ? ['🥇', '🥈', '🥉'][user.rank - 1] : user.rank}
              </div>
              <span className="text-2xl transition-transform hover:scale-125">{user.avatar}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate ${user.isCurrentUser ? 'text-primary-700' : 'text-gray-900'} hover:text-primary-600 transition-colors`}>
                  {user.name} {user.isCurrentUser && <span className="text-primary-500">(You)</span>}
                </p>
                <p className="text-xs text-gray-400">{user.workouts} workouts • {user.streak} day streak</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{user.score.toLocaleString()}</p>
                <p className="text-[11px] text-gray-400">points</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Detail Modal */}
      <Modal isOpen={!!selectedAchievement} onClose={() => setSelectedAchievement(null)} title="Achievement Details" size="sm">
        {selected && (
          <div className="space-y-4 animate-fade-in-up text-center">
            <span className="text-6xl animate-pop-in inline-block">{selected.icon}</span>
            <h3 className="text-xl font-bold text-gray-900">{selected.name}</h3>
            <p className="text-sm text-gray-500">{selected.description}</p>
            <div className="bg-amber-50 rounded-xl p-4">
              <p className="text-2xl font-black text-amber-600">+{selected.xp} XP</p>
              <p className="text-xs text-gray-500">{selected.earned ? `Earned on ${selected.date}` : 'Not yet earned'}</p>
            </div>
            {!selected.earned && selected.progress !== undefined && (
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-bold text-primary-600">{selected.progress}%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full progress-animate" style={{ width: `${selected.progress}%` }} />
                </div>
              </div>
            )}
            <button onClick={() => { setSelectedAchievement(null); if (selected.earned) { triggerConfetti(); } onToast('info', selected.earned ? 'Achievement Shared!' : 'Keep Going!', selected.earned ? 'Shared to your profile' : 'You\'re making progress!'); }}
              className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold text-sm btn-bounce ripple-container">
              {selected.earned ? 'Share Achievement 🎉' : 'View Progress Details'}
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
