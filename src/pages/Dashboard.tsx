import { useState } from 'react';
import { Flame, Footprints, Timer, Droplets, TrendingUp, Sparkles, ChevronRight, PlayCircle, CheckCircle2, Circle, Plus, Eye } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import StatCard from '../components/StatCard';
import CircularProgress from '../components/CircularProgress';
import Modal from '../components/Modal';
import { weeklyActivity, todayNutrition, todayWorkout, aiRecommendations, currentUser } from '../data/dummyData';
import type { Page } from '../components/Sidebar';

interface DashboardProps {
  onNavigate: (page: Page) => void;
  onToast: (type: 'success' | 'info' | 'ai', title: string, msg: string) => void;
}

export default function Dashboard({ onNavigate, onToast }: DashboardProps) {
  const [completedExercises, setCompletedExercises] = useState<string[]>(
    todayWorkout.exercises.filter(e => e.completed).map(e => e.id)
  );
  const [waterCount, setWaterCount] = useState(todayNutrition.water.consumed);
  const [showExerciseModal, setShowExerciseModal] = useState<string | null>(null);
  const [showStatModal, setShowStatModal] = useState<string | null>(null);
  const [dismissedRecs, setDismissedRecs] = useState<string[]>([]);

  const toggleExercise = (id: string) => {
    const exercise = todayWorkout.exercises.find(e => e.id === id);
    setCompletedExercises(prev => {
      const isCompleted = prev.includes(id);
      if (!isCompleted) {
        onToast('success', 'Exercise Complete! 💪', `${exercise?.name} marked as done`);
      }
      return isCompleted ? prev.filter(e => e !== id) : [...prev, id];
    });
  };

  const addWater = () => {
    if (waterCount < todayNutrition.water.target) {
      setWaterCount(prev => prev + 1);
      onToast('success', 'Hydration +1 💧', `${waterCount + 1}/${todayNutrition.water.target} glasses`);
    } else {
      onToast('info', 'Already at target! 🎉', 'You\'ve hit your daily water goal');
    }
  };

  const handleRecAction = (rec: typeof aiRecommendations[0]) => {
    onToast('ai', 'AI Recommendation Applied', rec.title);
    setDismissedRecs(prev => [...prev, rec.id]);
  };

  const activeRecs = aiRecommendations.filter(r => !dismissedRecs.includes(r.id));
  const completedCount = completedExercises.length;
  const totalExercises = todayWorkout.exercises.length;

  const selectedExercise = todayWorkout.exercises.find(e => e.id === showExerciseModal);

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Good Morning, {currentUser.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-500 mt-1">
            You're on a <span className="text-primary-600 font-semibold cursor-pointer hover:underline" onClick={() => onNavigate('achievements')}>{currentUser.streak}-day streak</span>. Keep it up!
          </p>
        </div>
        <button
          onClick={() => onNavigate('workouts')}
          className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm btn-bounce ripple-container self-start"
        >
          <PlayCircle size={18} className="group-hover:animate-spin" /> Start Workout
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Calories Burned" value="2,860" icon={<Flame size={20} />}
          color="fire" trend={{ value: 12, label: 'vs last week' }} subtitle="This week"
          delay={50} onClick={() => setShowStatModal('calories')}
        />
        <StatCard
          title="Steps Today" value="8,240" icon={<Footprints size={20} />}
          color="accent" trend={{ value: 8, label: 'vs yesterday' }} subtitle="Goal: 10,000"
          delay={100} onClick={() => setShowStatModal('steps')}
        />
        <StatCard
          title="Active Minutes" value="305" icon={<Timer size={20} />}
          color="primary" trend={{ value: 15, label: 'vs last week' }} subtitle="This week"
          delay={150} onClick={() => setShowStatModal('minutes')}
        />
        <StatCard
          title="Water Intake" value={`${waterCount}/${todayNutrition.water.target}`}
          icon={<Droplets size={20} />} color="energy" subtitle="Glasses today"
          delay={200} onClick={addWater}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Workout */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden animate-fade-in-up delay-200 card-hover">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between cursor-pointer" onClick={() => onNavigate('workouts')}>
            <div>
              <h2 className="text-lg font-bold text-gray-900 hover:text-primary-700 transition-colors">Today's Workout</h2>
              <p className="text-sm text-gray-500">{todayWorkout.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg clickable-sm">{todayWorkout.estimatedDuration} min</span>
              <span className="text-xs text-fire-500 bg-red-50 px-2.5 py-1 rounded-lg font-medium clickable-sm">{todayWorkout.caloriesBurn} kcal</span>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            {/* Progress bar */}
            <div className="flex items-center gap-3 mb-4 px-1">
              <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full progress-animate"
                  style={{ width: `${(completedCount / totalExercises) * 100}%` }}
                />
              </div>
              <span className="text-sm font-bold text-primary-600 animate-count-up">{completedCount}/{totalExercises}</span>
            </div>

            <div className="space-y-2">
              {todayWorkout.exercises.map((exercise, idx) => {
                const isDone = completedExercises.includes(exercise.id);
                return (
                  <div
                    key={exercise.id}
                    className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 cursor-pointer animate-fade-in-up group ${
                      isDone ? 'bg-emerald-50/60 hover:bg-emerald-50' : 'bg-gray-50/50 hover:bg-primary-50/50'
                    }`}
                    style={{ animationDelay: `${idx * 60 + 200}ms` }}
                  >
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleExercise(exercise.id); }}
                      className="transition-all duration-300 hover:scale-125 active:scale-90"
                    >
                      {isDone ? (
                        <CheckCircle2 size={22} className="text-emerald-500 animate-success-ping" />
                      ) : (
                        <Circle size={22} className="text-gray-300 group-hover:text-primary-400" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0 clickable-sm" onClick={() => setShowExerciseModal(exercise.id)}>
                      <p className={`text-sm font-medium transition-all ${isDone ? 'text-gray-400 line-through' : 'text-gray-900 group-hover:text-primary-700'}`}>
                        {exercise.name}
                      </p>
                      <p className="text-xs text-gray-400">{exercise.muscleGroup}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="clickable-sm hover:text-primary-600 transition-colors" onClick={() => setShowExerciseModal(exercise.id)}>{exercise.sets}×{exercise.reps}</span>
                      <span className="font-medium text-gray-700 clickable-sm hover:text-primary-600 transition-colors" onClick={() => setShowExerciseModal(exercise.id)}>{exercise.weight}</span>
                      <button
                        onClick={() => setShowExerciseModal(exercise.id)}
                        className="p-1 rounded-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100 clickable-sm"
                      >
                        <Eye size={14} className="text-gray-400" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="px-6 pb-5">
            <button
              onClick={() => {
                if (completedCount < totalExercises) {
                  const next = todayWorkout.exercises.find(e => !completedExercises.includes(e.id));
                  if (next) toggleExercise(next.id);
                } else {
                  onToast('success', 'Workout Complete! 🎉', 'Amazing job finishing your session!');
                }
              }}
              className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold text-sm btn-bounce ripple-container"
            >
              {completedCount >= totalExercises ? '✅ Workout Complete!' : `Complete Next Exercise →`}
            </button>
          </div>
        </div>

        {/* Nutrition Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-fade-in-up delay-300 card-hover">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 cursor-pointer hover:text-primary-700 transition-colors" onClick={() => onNavigate('nutrition')}>Nutrition</h2>
            <button onClick={() => onNavigate('nutrition')} className="text-primary-600 text-sm font-medium hover:text-primary-700 clickable-sm flex items-center gap-0.5">
              Details <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex justify-center mb-6">
            <CircularProgress
              value={todayNutrition.calories.consumed} max={todayNutrition.calories.target}
              size={140} strokeWidth={10} color="#6366f1"
              onClick={() => onNavigate('nutrition')}
            >
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{todayNutrition.calories.consumed}</p>
                <p className="text-xs text-gray-400">/ {todayNutrition.calories.target} kcal</p>
              </div>
            </CircularProgress>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Protein', consumed: todayNutrition.protein.consumed, target: todayNutrition.protein.target, color: 'bg-blue-500', unit: 'g' },
              { label: 'Carbs', consumed: todayNutrition.carbs.consumed, target: todayNutrition.carbs.target, color: 'bg-amber-500', unit: 'g' },
              { label: 'Fat', consumed: todayNutrition.fat.consumed, target: todayNutrition.fat.target, color: 'bg-rose-500', unit: 'g' },
              { label: 'Fiber', consumed: todayNutrition.fiber.consumed, target: todayNutrition.fiber.target, color: 'bg-emerald-500', unit: 'g' },
            ].map((macro, i) => (
              <div key={macro.label} className="cursor-pointer group clickable-sm" onClick={() => onNavigate('nutrition')} style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 font-medium group-hover:text-primary-600 transition-colors">{macro.label}</span>
                  <span className="text-gray-400 group-hover:text-gray-600 transition-colors">{macro.consumed}/{macro.target}{macro.unit}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${macro.color} progress-animate group-hover:brightness-110`}
                    style={{ width: `${Math.min((macro.consumed / macro.target) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Water */}
          <div className="mt-5 p-3 bg-blue-50 rounded-xl cursor-pointer group hover:bg-blue-100/80 transition-all clickable-sm" onClick={addWater}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
                <Droplets size={14} className="text-blue-500" /> Water
              </span>
              <span className="text-xs font-bold text-blue-600">{waterCount}/{todayNutrition.water.target}</span>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: todayNutrition.water.target }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-5 rounded transition-all duration-500 ${
                    i < waterCount ? 'bg-blue-400 scale-y-100' : 'bg-blue-200/40 hover:bg-blue-200/70'
                  }`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                />
              ))}
            </div>
            <p className="text-[10px] text-blue-400 mt-1.5 text-center group-hover:text-blue-600 transition-colors flex items-center justify-center gap-1">
              <Plus size={10} /> Tap to add a glass
            </p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-fade-in-up delay-400 card-hover" onClick={() => onNavigate('analytics')}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 cursor-pointer hover:text-primary-700 transition-colors">Weekly Activity</h2>
            <div className="flex items-center gap-1 text-xs clickable-sm">
              <TrendingUp size={14} className="text-emerald-500" />
              <span className="text-emerald-600 font-medium">+12% vs last week</span>
            </div>
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivity} barCategoryGap="25%">
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: '13px' }} cursor={{ fill: 'rgba(99,102,241,0.05)' }} />
                <Bar dataKey="calories" fill="#6366f1" radius={[6, 6, 0, 0]} name="Calories" className="cursor-pointer" />
                <Bar dataKey="duration" fill="#a5b4fc" radius={[6, 6, 0, 0]} name="Duration (min)" className="cursor-pointer" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-fade-in-up delay-500 card-hover" onClick={() => onNavigate('progress')}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 cursor-pointer hover:text-primary-700 transition-colors">Steps Overview</h2>
            <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg clickable-sm">This Week</span>
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyActivity}>
                <defs>
                  <linearGradient id="stepsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: '13px' }} />
                <Area type="monotone" dataKey="steps" stroke="#10b981" fill="url(#stepsGrad)" strokeWidth={2.5} name="Steps" className="cursor-pointer" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-fade-in-up delay-500">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between cursor-pointer" onClick={() => onNavigate('ai-coach')}>
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-primary-500 animate-float" />
            <h2 className="text-lg font-bold text-gray-900 hover:text-primary-700 transition-colors">AI Recommendations</h2>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onNavigate('ai-coach'); }} className="text-primary-600 text-sm font-medium hover:text-primary-700 flex items-center gap-1 clickable-sm">
            View All <ChevronRight size={16} />
          </button>
        </div>
        <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 stagger-children">
          {activeRecs.slice(0, 3).map((rec) => (
            <div key={rec.id} className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 card-hover group">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">{rec.icon}</span>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary-700 transition-colors cursor-pointer" onClick={() => handleRecAction(rec)}>{rec.title}</h3>
                  <span className={`text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded cursor-pointer clickable-sm ${
                    rec.priority === 'high' ? 'bg-red-100 text-red-600' : rec.priority === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-500'
                  }`} onClick={() => handleRecAction(rec)}>
                    {rec.priority}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed cursor-pointer" onClick={() => handleRecAction(rec)}>{rec.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-400 clickable-sm" onClick={() => onNavigate('ai-coach')}>
                  {rec.confidence}% confidence
                </span>
                <button onClick={() => handleRecAction(rec)} className="text-xs font-medium text-primary-600 hover:text-primary-700 btn-bounce px-2 py-1 rounded-lg hover:bg-primary-50 transition-all">
                  {rec.actionLabel} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exercise Detail Modal */}
      <Modal isOpen={!!showExerciseModal} onClose={() => setShowExerciseModal(null)} title="Exercise Details" size="sm">
        {selectedExercise && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-3 animate-pop-in">
                <Flame size={28} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{selectedExercise.name}</h3>
              <p className="text-sm text-gray-500">{selectedExercise.muscleGroup}</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Sets', value: selectedExercise.sets },
                { label: 'Reps', value: selectedExercise.reps },
                { label: 'Weight', value: selectedExercise.weight },
              ].map((s) => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center clickable-sm hover:bg-primary-50 transition-colors">
                  <p className="text-lg font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 rounded-xl p-3 clickable-sm hover:bg-gray-100 transition-colors">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Rest Time</span>
                <span className="font-medium text-gray-900">{selectedExercise.rest}</span>
              </div>
            </div>
            <button
              onClick={() => { toggleExercise(selectedExercise.id); setShowExerciseModal(null); }}
              className={`w-full py-3 rounded-xl font-semibold text-sm btn-bounce ripple-container ${
                completedExercises.includes(selectedExercise.id)
                  ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  : 'bg-gradient-to-r from-primary-600 to-primary-700 text-white'
              }`}
            >
              {completedExercises.includes(selectedExercise.id) ? 'Mark as Incomplete' : 'Mark as Complete ✓'}
            </button>
          </div>
        )}
      </Modal>

      {/* Stat Detail Modal */}
      <Modal isOpen={!!showStatModal} onClose={() => setShowStatModal(null)} title={
        showStatModal === 'calories' ? 'Calories Burned' : showStatModal === 'steps' ? 'Steps Today' : 'Active Minutes'
      } size="sm">
        <div className="space-y-4 animate-fade-in-up">
          <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-indigo-50 rounded-2xl">
            <p className="text-4xl font-black text-primary-700 animate-count-up">
              {showStatModal === 'calories' ? '2,860' : showStatModal === 'steps' ? '8,240' : '305'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {showStatModal === 'calories' ? 'kcal this week' : showStatModal === 'steps' ? 'steps today' : 'minutes this week'}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 text-center clickable-sm hover:bg-primary-50 transition-colors">
              <p className="text-lg font-bold text-gray-900">+12%</p>
              <p className="text-xs text-emerald-500">vs last week</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center clickable-sm hover:bg-primary-50 transition-colors">
              <p className="text-lg font-bold text-gray-900">Top 15%</p>
              <p className="text-xs text-gray-500">community rank</p>
            </div>
          </div>
          <button onClick={() => { setShowStatModal(null); onNavigate('analytics'); }} className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold text-sm btn-bounce ripple-container">
            View Full Analytics →
          </button>
        </div>
      </Modal>
    </div>
  );
}
