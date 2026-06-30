import { useState } from 'react';
import { Dumbbell, Clock, Flame, ChevronRight, Sparkles, Play, Star, Filter, Zap, Plus, CheckCircle2, Heart } from 'lucide-react';
import Modal from '../components/Modal';
import { workoutPlans, todayWorkout } from '../data/dummyData';

const workoutTypeColors: Record<string, string> = {
  Strength: 'from-blue-500 to-indigo-600',
  HIIT: 'from-red-500 to-orange-500',
  Flexibility: 'from-emerald-500 to-teal-500',
  Cardio: 'from-purple-500 to-pink-500',
};
const workoutTypeEmoji: Record<string, string> = {
  Strength: '🏋️', HIIT: '⚡', Flexibility: '🧘', Cardio: '🏃',
};

interface WorkoutsProps {
  onToast: (type: 'success' | 'info' | 'ai', title: string, msg: string) => void;
}

export default function Workouts({ onToast }: WorkoutsProps) {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showPlanModal, setShowPlanModal] = useState<string | null>(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [completedEx, setCompletedEx] = useState<string[]>(todayWorkout.exercises.filter(e => e.completed).map(e => e.id));

  const types = ['All', 'Strength', 'HIIT', 'Cardio', 'Flexibility'];
  const filtered = selectedType === 'All' ? workoutPlans : workoutPlans.filter(p => p.type === selectedType);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const isFav = prev.includes(id);
      onToast('success', isFav ? 'Removed from favorites' : 'Added to favorites ❤️', workoutPlans.find(p => p.id === id)?.name || '');
      return isFav ? prev.filter(f => f !== id) : [...prev, id];
    });
  };

  const selectedPlan = workoutPlans.find(p => p.id === showPlanModal);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Workout Plans</h1>
          <p className="text-gray-500 mt-1">AI-optimized training programs for your goals</p>
        </div>
        <button
          onClick={() => setShowGenerateModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm btn-bounce ripple-container self-start"
        >
          <Sparkles size={16} /> Generate AI Plan
        </button>
      </div>

      {/* Active Workout Banner */}
      <div
        className="bg-gradient-to-r from-primary-600 via-primary-700 to-indigo-800 rounded-2xl p-6 text-white relative overflow-hidden animate-fade-in-up delay-100 cursor-pointer group"
        onClick={() => setWorkoutStarted(!workoutStarted)}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 transition-transform duration-700 group-hover:scale-125" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 transition-transform duration-700 group-hover:scale-150" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-amber-300 animate-float" />
            <span className="text-xs font-semibold text-primary-200 uppercase tracking-wider">Active Session</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-1 group-hover:tracking-wide transition-all">{todayWorkout.name}</h2>
          <p className="text-primary-200 text-sm mb-4">{todayWorkout.plan}</p>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {[
              { icon: <Clock size={14} className="text-primary-300" />, text: `${todayWorkout.estimatedDuration} min` },
              { icon: <Flame size={14} className="text-orange-300" />, text: `${todayWorkout.caloriesBurn} kcal` },
              { icon: <Dumbbell size={14} className="text-primary-300" />, text: `${todayWorkout.exercises.length} exercises` },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 clickable-sm bg-white/10 px-2.5 py-1 rounded-lg hover:bg-white/20 transition-all">
                {item.icon}
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-2.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full progress-animate"
                style={{ width: `${(completedEx.length / todayWorkout.exercises.length) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium">{completedEx.length}/{todayWorkout.exercises.length}</span>
          </div>

          {/* Inline exercises */}
          {workoutStarted && (
            <div className="space-y-2 mb-4 stagger-children">
              {todayWorkout.exercises.map((ex) => {
                const done = completedEx.includes(ex.id);
                return (
                  <div
                    key={ex.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCompletedEx(prev => done ? prev.filter(i => i !== ex.id) : [...prev, ex.id]);
                      if (!done) onToast('success', 'Exercise Complete! 💪', ex.name);
                    }}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all cursor-pointer ${done ? 'bg-white/20' : 'bg-white/10 hover:bg-white/15'}`}
                  >
                    <button className="transition-transform hover:scale-125 active:scale-90">
                      {done ? <CheckCircle2 size={18} className="text-emerald-300" /> : <div className="w-[18px] h-[18px] rounded-full border-2 border-white/50" />}
                    </button>
                    <span className={`text-sm flex-1 ${done ? 'line-through opacity-60' : ''}`}>{ex.name}</span>
                    <span className="text-xs opacity-60">{ex.sets}×{ex.reps} • {ex.weight}</span>
                  </div>
                );
              })}
            </div>
          )}

          <button
            onClick={(e) => { e.stopPropagation(); setWorkoutStarted(!workoutStarted); }}
            className="flex items-center gap-2 bg-white text-primary-700 px-6 py-2.5 rounded-xl font-semibold text-sm btn-bounce ripple-container"
          >
            <Play size={16} className={workoutStarted ? 'animate-pulse' : ''} />
            {workoutStarted ? 'Collapse Session' : 'Resume Workout'}
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 animate-fade-in-up delay-200">
        <Filter size={16} className="text-gray-400 shrink-0" />
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 clickable-sm ${
              selectedType === type
                ? 'bg-primary-600 text-white shadow-md shadow-primary-500/25 scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Plans Grid */}
      <div className="grid sm:grid-cols-2 gap-5">
        {filtered.map((plan, i) => (
          <div
            key={plan.id}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover group animate-fade-in-up"
            style={{ animationDelay: `${i * 80 + 200}ms` }}
          >
            <div
              className={`h-32 bg-gradient-to-br ${workoutTypeColors[plan.type] || 'from-gray-500 to-gray-700'} p-5 relative overflow-hidden cursor-pointer`}
              onClick={() => setShowPlanModal(plan.id)}
            >
              <div className="absolute top-3 right-3 text-4xl opacity-30 transition-transform duration-500 group-hover:scale-150 group-hover:rotate-12">
                {workoutTypeEmoji[plan.type]}
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  {plan.aiGenerated && (
                    <span className="flex items-center gap-1 bg-white/20 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded-full clickable-sm hover:bg-white/30 transition-colors">
                      <Sparkles size={10} /> AI Generated
                    </span>
                  )}
                  <span className="bg-white/20 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded-full clickable-sm hover:bg-white/30 transition-colors">
                    {plan.difficulty}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:tracking-wide transition-all">{plan.name}</h3>
              </div>
              {/* Favorite button */}
              <button
                onClick={(e) => { e.stopPropagation(); toggleFavorite(plan.id); }}
                className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/40 transition-all clickable-sm z-10"
              >
                <Heart size={14} className={`transition-all ${favorites.includes(plan.id) ? 'text-red-400 fill-red-400 scale-110' : 'text-white'}`} />
              </button>
            </div>

            <div className="p-5">
              <p className="text-sm text-gray-500 mb-4 line-clamp-2 cursor-pointer hover:text-gray-700 transition-colors" onClick={() => setShowPlanModal(plan.id)}>{plan.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                <span className="flex items-center gap-1 clickable-sm hover:text-primary-600 transition-colors" onClick={() => setShowPlanModal(plan.id)}><Clock size={12} /> {plan.duration}</span>
                <span className="flex items-center gap-1 clickable-sm hover:text-primary-600 transition-colors" onClick={() => setShowPlanModal(plan.id)}><Star size={12} /> {plan.frequency}</span>
              </div>

              <div className="mb-4 cursor-pointer group/progress" onClick={() => setShowPlanModal(plan.id)}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-600 font-medium group-hover/progress:text-primary-600 transition-colors">Progress</span>
                  <span className="text-primary-600 font-semibold">{plan.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${workoutTypeColors[plan.type]} progress-animate`}
                    style={{ width: `${plan.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {plan.equipment.map((eq) => (
                  <span key={eq} className="text-[11px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md clickable-sm hover:bg-primary-100 hover:text-primary-700 transition-all cursor-pointer">{eq}</span>
                ))}
              </div>

              <button
                onClick={() => setShowPlanModal(plan.id)}
                className="w-full flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl text-sm clickable-sm hover:bg-primary-50 transition-all group/next"
              >
                <div>
                  <span className="text-gray-400 text-xs">Next Session</span>
                  <p className="text-gray-700 font-medium group-hover/next:text-primary-700 transition-colors">{plan.nextSession}</p>
                </div>
                <ChevronRight size={16} className="text-gray-400 group-hover/next:text-primary-600 group-hover/next:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        ))}

        {/* Add New Plan Card */}
        <div
          onClick={() => setShowGenerateModal(true)}
          className="rounded-2xl border-2 border-dashed border-gray-200 hover:border-primary-400 flex flex-col items-center justify-center py-16 cursor-pointer transition-all group hover:bg-primary-50/30 card-hover animate-fade-in-up delay-500"
        >
          <div className="w-14 h-14 rounded-2xl bg-gray-100 group-hover:bg-primary-100 flex items-center justify-center mb-3 transition-all group-hover:scale-110 group-hover:rotate-6">
            <Plus size={24} className="text-gray-400 group-hover:text-primary-600 transition-colors" />
          </div>
          <p className="text-sm font-semibold text-gray-500 group-hover:text-primary-700 transition-colors">Create New Plan</p>
          <p className="text-xs text-gray-400 mt-1">AI-generated or custom</p>
        </div>
      </div>

      {/* Plan Detail Modal */}
      <Modal isOpen={!!showPlanModal} onClose={() => setShowPlanModal(null)} title={selectedPlan?.name || ''} size="lg">
        {selectedPlan && (
          <div className="space-y-5 animate-fade-in-up">
            <div className={`h-28 bg-gradient-to-r ${workoutTypeColors[selectedPlan.type]} rounded-2xl flex items-center justify-center relative overflow-hidden`}>
              <span className="text-6xl opacity-30 animate-float">{workoutTypeEmoji[selectedPlan.type]}</span>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <p className="text-gray-600 text-sm">{selectedPlan.description}</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Duration', value: selectedPlan.duration },
                { label: 'Frequency', value: selectedPlan.frequency },
                { label: 'Difficulty', value: selectedPlan.difficulty },
              ].map(s => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center clickable-sm hover:bg-primary-50 transition-colors">
                  <p className="text-sm font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-2">Equipment Needed</h4>
              <div className="flex flex-wrap gap-2">
                {selectedPlan.equipment.map(eq => (
                  <span key={eq} className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-600 clickable-sm hover:bg-primary-100 hover:text-primary-700 transition-all">{eq}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Progress</span>
                <span className="font-bold text-primary-600">{selectedPlan.progress}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full bg-gradient-to-r ${workoutTypeColors[selectedPlan.type]} progress-animate`} style={{ width: `${selectedPlan.progress}%` }} />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { setShowPlanModal(null); onToast('success', 'Workout Started!', `Starting ${selectedPlan.nextSession}`); }}
                className="flex-1 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold text-sm btn-bounce ripple-container"
              >
                Start Next Session →
              </button>
              <button
                onClick={() => { toggleFavorite(selectedPlan.id); setShowPlanModal(null); }}
                className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-red-50 flex items-center justify-center clickable-sm transition-colors"
              >
                <Heart size={18} className={favorites.includes(selectedPlan.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Generate AI Plan Modal */}
      <Modal isOpen={showGenerateModal} onClose={() => setShowGenerateModal(false)} title="Generate AI Workout Plan" size="md">
        <div className="space-y-5 animate-fade-in-up">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center mx-auto animate-pop-in">
            <Sparkles size={28} className="text-white" />
          </div>
          <p className="text-center text-gray-500 text-sm">Our AI will create a personalized workout plan based on your goals and preferences.</p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Focus Area</label>
              <div className="flex flex-wrap gap-2">
                {['Full Body', 'Upper Body', 'Lower Body', 'Core', 'Cardio'].map(area => (
                  <button key={area} className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-700 transition-all clickable-sm">
                    {area}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <div className="flex gap-2">
                {['4 weeks', '6 weeks', '8 weeks', '12 weeks'].map(dur => (
                  <button key={dur} className="flex-1 px-3 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-700 transition-all clickable-sm">
                    {dur}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={() => { setShowGenerateModal(false); onToast('ai', 'AI Plan Generated! 🤖', 'Your new personalized plan is ready'); }}
            className="w-full py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl font-semibold text-sm btn-bounce ripple-container flex items-center justify-center gap-2"
          >
            <Sparkles size={16} /> Generate Plan
          </button>
        </div>
      </Modal>
    </div>
  );
}
