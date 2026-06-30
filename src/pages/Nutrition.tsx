import { useState } from 'react';
import { Plus, ChevronRight, Droplets, TrendingUp, Flame, Apple, Search, Check, X, Minus } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import CircularProgress from '../components/CircularProgress';
import Modal from '../components/Modal';
import { todayNutrition, mealLog } from '../data/dummyData';

const macroData = [
  { name: 'Protein', value: todayNutrition.protein.consumed, color: '#6366f1' },
  { name: 'Carbs', value: todayNutrition.carbs.consumed, color: '#f59e0b' },
  { name: 'Fat', value: todayNutrition.fat.consumed, color: '#ef4444' },
];

const suggestedMeals = [
  { name: 'Grilled Chicken Bowl', cal: 450, protein: 40, time: '15 min', emoji: '🍗' },
  { name: 'Quinoa Veggie Wrap', cal: 380, protein: 18, time: '10 min', emoji: '🌯' },
  { name: 'Protein Smoothie', cal: 280, protein: 30, time: '5 min', emoji: '🥤' },
  { name: 'Tuna Salad', cal: 320, protein: 35, time: '8 min', emoji: '🥗' },
];

interface NutritionProps {
  onToast: (type: 'success' | 'info' | 'ai', title: string, msg: string) => void;
}

export default function Nutrition({ onToast }: NutritionProps) {
  const [activeTab, setActiveTab] = useState<'today' | 'plan'>('today');
  const [waterCount, setWaterCount] = useState(todayNutrition.water.consumed);
  const [loggedMeals, setLoggedMeals] = useState<string[]>(mealLog.filter(m => !m.upcoming).map(m => m.id));
  const [showMealModal, setShowMealModal] = useState<string | null>(null);
  const [showAddMealModal, setShowAddMealModal] = useState(false);
  const [showSuggestionModal, setShowSuggestionModal] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const remaining = todayNutrition.calories.target - todayNutrition.calories.consumed;

  const toggleMealLogged = (id: string) => {
    setLoggedMeals(prev => {
      const meal = mealLog.find(m => m.id === id);
      if (prev.includes(id)) {
        return prev.filter(m => m !== id);
      } else {
        onToast('success', `${meal?.meal} logged! 🍽️`, `${meal?.totalCalories} kcal tracked`);
        return [...prev, id];
      }
    });
  };

  const addWater = () => {
    if (waterCount < todayNutrition.water.target) {
      setWaterCount(prev => prev + 1);
      onToast('success', 'Hydration +1 💧', `${waterCount + 1}/${todayNutrition.water.target} glasses`);
    }
  };
  const removeWater = () => {
    if (waterCount > 0) setWaterCount(prev => prev - 1);
  };

  const selectedMeal = mealLog.find(m => m.id === showMealModal);
  const selectedSuggestion = suggestedMeals.find(m => m.name === showSuggestionModal);

  const filteredSuggestions = suggestedMeals.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Nutrition Tracker</h1>
          <p className="text-gray-500 mt-1">Track your meals and hit your macros</p>
        </div>
        <button
          onClick={() => setShowAddMealModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm btn-bounce ripple-container self-start"
        >
          <Plus size={16} /> Log Meal
        </button>
      </div>

      {/* Tab Switch */}
      <div className="bg-gray-100 p-1 rounded-xl inline-flex animate-fade-in-up delay-100">
        {(['today', 'plan'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 clickable-sm ${
              activeTab === tab ? 'bg-white text-gray-900 shadow-sm scale-105' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'today' ? "Today's Log" : 'Meal Plan'}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left — Calorie Overview */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-fade-in-up delay-150 card-hover">
          <h2 className="text-lg font-bold text-gray-900 mb-6 cursor-pointer hover:text-primary-700 transition-colors" onClick={() => setShowAddMealModal(true)}>Daily Summary</h2>
          <div className="flex justify-center mb-6">
            <CircularProgress value={todayNutrition.calories.consumed} max={todayNutrition.calories.target} size={160} strokeWidth={12} color="#10b981" onClick={() => setShowAddMealModal(true)}>
              <div className="text-center cursor-pointer">
                <p className="text-3xl font-bold text-gray-900">{remaining}</p>
                <p className="text-xs text-gray-400">kcal remaining</p>
              </div>
            </CircularProgress>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6 stagger-children">
            {[
              { label: 'Protein', value: `${todayNutrition.protein.consumed}g`, bg: 'bg-primary-50 hover:bg-primary-100', color: 'text-primary-700' },
              { label: 'Carbs', value: `${todayNutrition.carbs.consumed}g`, bg: 'bg-amber-50 hover:bg-amber-100', color: 'text-amber-700' },
              { label: 'Fat', value: `${todayNutrition.fat.consumed}g`, bg: 'bg-red-50 hover:bg-red-100', color: 'text-red-600' },
            ].map(m => (
              <div key={m.label} className={`text-center p-3 ${m.bg} rounded-xl clickable-sm transition-all cursor-pointer`} onClick={() => setShowAddMealModal(true)}>
                <p className={`text-lg font-bold ${m.color}`}>{m.value}</p>
                <p className="text-[11px] text-gray-500">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Macro Pie Chart */}
          <div className="h-40 cursor-pointer" onClick={() => setShowAddMealModal(true)}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={macroData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" strokeWidth={0}>
                  {macroData.map((entry, i) => <Cell key={i} fill={entry.color} className="hover:opacity-80 transition-opacity cursor-pointer" />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: '13px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Water Tracker */}
          <div className="mt-4 p-4 bg-blue-50 rounded-xl transition-all hover:bg-blue-100/80">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Droplets size={16} className="text-blue-500" />
                <span className="text-sm font-medium text-gray-700">Water Intake</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={removeWater} className="w-6 h-6 rounded-full bg-blue-200 hover:bg-blue-300 flex items-center justify-center clickable-sm transition-all">
                  <Minus size={12} className="text-blue-700" />
                </button>
                <span className="text-sm font-bold text-blue-600">{waterCount}/{todayNutrition.water.target}</span>
                <button onClick={addWater} className="w-6 h-6 rounded-full bg-blue-400 hover:bg-blue-500 flex items-center justify-center clickable-sm transition-all">
                  <Plus size={12} className="text-white" />
                </button>
              </div>
            </div>
            <div className="flex gap-1.5">
              {Array.from({ length: todayNutrition.water.target }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setWaterCount(i + 1)}
                  className={`flex-1 h-6 rounded-md transition-all duration-300 clickable-sm ${
                    i < waterCount ? 'bg-blue-400 hover:bg-blue-500' : 'bg-blue-200/50 hover:bg-blue-300/50'
                  }`}
                  style={{ transitionDelay: `${i * 40}ms` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Middle — Meal Log */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 animate-fade-in-up delay-200">
            <div className="px-6 py-4 border-b border-gray-50 cursor-pointer" onClick={() => setShowAddMealModal(true)}>
              <h2 className="text-lg font-bold text-gray-900 hover:text-primary-700 transition-colors">
                {activeTab === 'today' ? "Today's Meals" : 'Weekly Meal Plan'}
              </h2>
            </div>
            <div className="p-4 space-y-3 stagger-children">
              {mealLog.map((meal) => (
                <div
                  key={meal.id}
                  className={`p-4 rounded-xl border transition-all card-hover group cursor-pointer ${
                    meal.upcoming ? 'border-dashed border-gray-300 bg-gray-50/50' : loggedMeals.includes(meal.id) ? 'border-emerald-200 bg-emerald-50/30' : 'border-gray-100 bg-white'
                  }`}
                  onClick={() => setShowMealModal(meal.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">{meal.icon}</span>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">{meal.meal}</h3>
                        <p className="text-xs text-gray-400">{meal.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-sm font-semibold text-gray-700 clickable-sm">
                        <Flame size={14} className="text-orange-400" /> {meal.totalCalories} kcal
                      </span>
                      {meal.upcoming && (
                        <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium animate-pulse">Upcoming</span>
                      )}
                      {loggedMeals.includes(meal.id) && !meal.upcoming && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-0.5">
                          <Check size={8} /> Logged
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {meal.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-sm pl-10 clickable-sm hover:bg-gray-50 rounded-lg px-2 py-1 -mx-2 transition-all">
                        <span className="text-gray-600 hover:text-primary-600 transition-colors">{item.name}</span>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="hover:text-blue-600 transition-colors cursor-pointer">P: {item.protein}g</span>
                          <span className="hover:text-amber-600 transition-colors cursor-pointer">C: {item.carbs}g</span>
                          <span className="hover:text-red-600 transition-colors cursor-pointer">F: {item.fat}g</span>
                          <span className="font-medium text-gray-500">{item.calories} kcal</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Log button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleMealLogged(meal.id); }}
                    className={`mt-3 w-full py-2 rounded-lg text-xs font-medium transition-all clickable-sm ${
                      loggedMeals.includes(meal.id)
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-700'
                    }`}
                  >
                    {loggedMeals.includes(meal.id) ? '✓ Logged — tap to undo' : 'Tap to log this meal'}
                  </button>
                </div>
              ))}

              <button
                onClick={() => setShowAddMealModal(true)}
                className="w-full p-4 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50/30 transition-all clickable-sm flex items-center justify-center gap-2 text-sm font-medium"
              >
                <Plus size={18} /> Add Meal or Snack
              </button>
            </div>
          </div>

          {/* AI Suggested Meals */}
          <div className="bg-white rounded-2xl border border-gray-100 animate-fade-in-up delay-300">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2 cursor-pointer clickable-sm" onClick={() => onToast('ai', 'AI Refresh', 'Generating new meal suggestions...')}>
                <Apple size={18} className="text-emerald-500" />
                <h2 className="text-lg font-bold text-gray-900 hover:text-primary-700 transition-colors">AI Meal Suggestions</h2>
              </div>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text" placeholder="Search foods..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 text-sm bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-primary-500 focus:bg-white w-40 sm:w-52 outline-none transition-all"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 clickable-sm">
                    <X size={14} className="text-gray-400" />
                  </button>
                )}
              </div>
            </div>
            <div className="p-4 grid sm:grid-cols-2 gap-3 stagger-children">
              {filteredSuggestions.map((meal) => (
                <div
                  key={meal.name}
                  onClick={() => setShowSuggestionModal(meal.name)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-all card-hover cursor-pointer group"
                >
                  <span className="text-3xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">{meal.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate group-hover:text-emerald-700 transition-colors">{meal.name}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="clickable-sm hover:text-orange-500 transition-colors">{meal.cal} kcal</span>
                      <span>•</span>
                      <span className="clickable-sm hover:text-blue-500 transition-colors">{meal.protein}g protein</span>
                      <span>•</span>
                      <span className="clickable-sm hover:text-emerald-500 transition-colors">{meal.time}</span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              ))}
              {filteredSuggestions.length === 0 && (
                <p className="text-sm text-gray-400 col-span-2 text-center py-8">No meals found for "{searchQuery}"</p>
              )}
            </div>
            <div className="px-6 pb-4 flex justify-between items-center">
              <p className="text-xs text-gray-400 flex items-center gap-1 clickable-sm hover:text-emerald-600 transition-colors cursor-pointer" onClick={() => onToast('ai', 'Macro Analysis', 'Suggestions are based on remaining macros')}>
                <TrendingUp size={12} className="text-emerald-500" /> Based on your remaining macros
              </p>
              <button onClick={() => onToast('ai', 'Loading...', 'Fetching more meal suggestions')} className="text-sm font-medium text-primary-600 hover:text-primary-700 clickable-sm">See All →</button>
            </div>
          </div>
        </div>
      </div>

      {/* Meal Detail Modal */}
      <Modal isOpen={!!showMealModal} onClose={() => setShowMealModal(null)} title={selectedMeal?.meal || 'Meal Details'}>
        {selectedMeal && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="text-center">
              <span className="text-5xl animate-pop-in inline-block">{selectedMeal.icon}</span>
              <h3 className="text-xl font-bold text-gray-900 mt-2">{selectedMeal.meal}</h3>
              <p className="text-sm text-gray-400">{selectedMeal.time}</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 text-center clickable-sm hover:bg-orange-100 transition-colors">
              <p className="text-3xl font-black text-orange-600">{selectedMeal.totalCalories}</p>
              <p className="text-xs text-gray-500">total calories</p>
            </div>
            <div className="space-y-2">
              {selectedMeal.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl clickable-sm hover:bg-primary-50 transition-all">
                  <span className="text-sm font-medium text-gray-900">{item.name}</span>
                  <span className="text-sm text-gray-500">{item.calories} kcal</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => { toggleMealLogged(selectedMeal.id); setShowMealModal(null); }}
              className={`w-full py-3 rounded-xl font-semibold text-sm btn-bounce ripple-container ${
                loggedMeals.includes(selectedMeal.id)
                  ? 'bg-gray-200 text-gray-600'
                  : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'
              }`}
            >
              {loggedMeals.includes(selectedMeal.id) ? 'Remove from Log' : 'Log This Meal ✓'}
            </button>
          </div>
        )}
      </Modal>

      {/* Suggestion Detail Modal */}
      <Modal isOpen={!!showSuggestionModal} onClose={() => setShowSuggestionModal(null)} title={selectedSuggestion?.name || ''} size="sm">
        {selectedSuggestion && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="text-center">
              <span className="text-6xl animate-pop-in inline-block">{selectedSuggestion.emoji}</span>
              <h3 className="text-xl font-bold text-gray-900 mt-2">{selectedSuggestion.name}</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-orange-50 rounded-xl p-3 text-center clickable-sm hover:bg-orange-100 transition-colors">
                <p className="text-lg font-bold text-orange-600">{selectedSuggestion.cal}</p>
                <p className="text-[11px] text-gray-500">Calories</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 text-center clickable-sm hover:bg-blue-100 transition-colors">
                <p className="text-lg font-bold text-blue-600">{selectedSuggestion.protein}g</p>
                <p className="text-[11px] text-gray-500">Protein</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3 text-center clickable-sm hover:bg-emerald-100 transition-colors">
                <p className="text-lg font-bold text-emerald-600">{selectedSuggestion.time}</p>
                <p className="text-[11px] text-gray-500">Prep Time</p>
              </div>
            </div>
            <button
              onClick={() => { setShowSuggestionModal(null); onToast('success', 'Meal Added! 🍽️', `${selectedSuggestion.name} logged`); }}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold text-sm btn-bounce ripple-container"
            >
              Add to Today's Log
            </button>
          </div>
        )}
      </Modal>

      {/* Add Meal Modal */}
      <Modal isOpen={showAddMealModal} onClose={() => setShowAddMealModal(false)} title="Log a Meal">
        <div className="space-y-4 animate-fade-in-up">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search food or scan barcode..." className="w-full pl-9 pr-4 py-3 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
          </div>
          <div className="space-y-2">
            {['Quick Add Calories', 'Scan Barcode', 'Create Custom Meal', 'Browse Recipes'].map(option => (
              <button
                key={option}
                onClick={() => { setShowAddMealModal(false); onToast('info', option, 'Feature coming soon!'); }}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-primary-50 rounded-xl text-sm font-medium text-gray-700 hover:text-primary-700 transition-all clickable-sm"
              >
                {option}
                <ChevronRight size={16} className="text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
