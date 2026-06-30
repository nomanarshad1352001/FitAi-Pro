import { useState } from 'react';
import { ChevronRight, ChevronLeft, Zap, Target, Dumbbell, Apple, Sparkles, Check } from 'lucide-react';

const steps = [
  { id: 1, title: 'Welcome', icon: <Zap size={24} /> },
  { id: 2, title: 'Goals', icon: <Target size={24} /> },
  { id: 3, title: 'Fitness Level', icon: <Dumbbell size={24} /> },
  { id: 4, title: 'Nutrition', icon: <Apple size={24} /> },
  { id: 5, title: 'AI Setup', icon: <Sparkles size={24} /> },
];

interface OnboardingProps { onComplete: () => void; }

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState('');
  const [goals, setGoals] = useState<string[]>([]);
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [diet, setDiet] = useState('');
  const [workoutDays, setWorkoutDays] = useState(4);

  const toggleGoal = (g: string) => setGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in-down">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center gap-2">
              <button
                onClick={() => step.id <= currentStep && setCurrentStep(step.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 clickable-sm ${
                  step.id < currentStep ? 'bg-primary-600 text-white scale-100' : step.id === currentStep ? 'bg-primary-600 text-white animate-pulse-glow scale-110' : 'bg-gray-200 text-gray-400'
                }`}
              >
                {step.id < currentStep ? <Check size={18} className="animate-success-ping" /> : step.id}
              </button>
              {step.id < steps.length && <div className={`w-8 h-0.5 transition-colors duration-500 ${step.id < currentStep ? 'bg-primary-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 sm:p-10 animate-fade-in-scale" key={currentStep}>
          {currentStep === 1 && (
            <div className="text-center space-y-6 animate-fade-in-up">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mx-auto shadow-lg shadow-primary-500/30 animate-float">
                <Zap size={36} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">Welcome to <span className="gradient-text">FitAI Pro</span></h1>
                <p className="text-gray-500">Your AI-powered fitness & wellness companion. Let's personalize your experience.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">What should we call you?</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name"
                  className="w-full px-5 py-3 bg-gray-50 rounded-xl text-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-center hover:border-primary-300" />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">What are your goals?</h2>
                <p className="text-gray-500 text-sm">Select all that apply</p>
              </div>
              <div className="grid grid-cols-2 gap-3 stagger-children">
                {[
                  { label: 'Lose Weight', emoji: '🏃' }, { label: 'Build Muscle', emoji: '💪' },
                  { label: 'Improve Endurance', emoji: '🚴' }, { label: 'Increase Flexibility', emoji: '🧘' },
                  { label: 'Better Nutrition', emoji: '🥗' }, { label: 'Reduce Stress', emoji: '🧠' },
                  { label: 'Better Sleep', emoji: '😴' }, { label: 'General Fitness', emoji: '⚡' },
                ].map((goal) => (
                  <button key={goal.label} onClick={() => toggleGoal(goal.label)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-300 clickable-sm ${
                      goals.includes(goal.label) ? 'border-primary-500 bg-primary-50 scale-105 shadow-md shadow-primary-100' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                    <span className={`text-2xl mb-1 block transition-transform duration-300 ${goals.includes(goal.label) ? 'scale-125' : ''}`}>{goal.emoji}</span>
                    <span className={`text-sm font-medium ${goals.includes(goal.label) ? 'text-primary-700' : 'text-gray-700'}`}>{goal.label}</span>
                    {goals.includes(goal.label) && <Check size={14} className="inline ml-1 text-primary-600 animate-success-ping" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Your fitness level?</h2>
                <p className="text-gray-500 text-sm">This helps us create the right plan</p>
              </div>
              <div className="space-y-3 stagger-children">
                {[
                  { level: 'Beginner', desc: 'New to fitness or returning', emoji: '🌱' },
                  { level: 'Intermediate', desc: 'Regular workouts for 6+ months', emoji: '🌿' },
                  { level: 'Advanced', desc: 'Consistent training for 2+ years', emoji: '🌳' },
                  { level: 'Athlete', desc: 'Competitive or professional', emoji: '🏆' },
                ].map((opt) => (
                  <button key={opt.level} onClick={() => setFitnessLevel(opt.level)}
                    className={`w-full p-5 rounded-xl border-2 text-left transition-all duration-300 flex items-center gap-4 clickable-sm ${
                      fitnessLevel === opt.level ? 'border-primary-500 bg-primary-50 scale-[1.02] shadow-md' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                    <span className={`text-3xl transition-transform duration-300 ${fitnessLevel === opt.level ? 'scale-125 rotate-12' : ''}`}>{opt.emoji}</span>
                    <div className="flex-1">
                      <p className={`font-semibold ${fitnessLevel === opt.level ? 'text-primary-700' : 'text-gray-900'}`}>{opt.level}</p>
                      <p className="text-sm text-gray-500">{opt.desc}</p>
                    </div>
                    {fitnessLevel === opt.level && <Check size={20} className="text-primary-600 animate-success-ping" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Dietary preference?</h2>
                <p className="text-gray-500 text-sm">We'll customize your meal suggestions</p>
              </div>
              <div className="grid grid-cols-2 gap-3 stagger-children">
                {[
                  { d: 'Balanced', emoji: '🍽️' }, { d: 'Keto', emoji: '🥑' },
                  { d: 'Vegan', emoji: '🌱' }, { d: 'Vegetarian', emoji: '🥕' },
                  { d: 'Paleo', emoji: '🥩' }, { d: 'Mediterranean', emoji: '🫒' },
                ].map((opt) => (
                  <button key={opt.d} onClick={() => setDiet(opt.d)}
                    className={`p-4 rounded-xl border-2 text-center transition-all duration-300 clickable-sm ${
                      diet === opt.d ? 'border-primary-500 bg-primary-50 scale-105 shadow-md' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                    <span className={`text-3xl block mb-1 transition-transform duration-300 ${diet === opt.d ? 'scale-125' : ''}`}>{opt.emoji}</span>
                    <span className={`text-sm font-medium ${diet === opt.d ? 'text-primary-700' : 'text-gray-700'}`}>{opt.d}</span>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Days per week?</label>
                <div className="flex items-center gap-3 justify-center">
                  <button onClick={() => setWorkoutDays(prev => Math.max(1, prev - 1))}
                    className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 text-lg font-bold clickable-sm active:scale-90">−</button>
                  <span className="text-4xl font-black text-primary-600 w-14 text-center animate-count-up">{workoutDays}</span>
                  <button onClick={() => setWorkoutDays(prev => Math.min(7, prev + 1))}
                    className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 text-lg font-bold clickable-sm active:scale-90">+</button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="text-center space-y-6 animate-fade-in-up">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center mx-auto shadow-lg shadow-primary-500/30 animate-pulse-glow">
                <Sparkles size={36} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your AI Coach is Ready! 🎉</h2>
                <p className="text-gray-500">We've analyzed your preferences and created a personalized plan.</p>
              </div>
              <div className="bg-gradient-to-r from-primary-50 to-indigo-50 rounded-2xl p-6 text-left space-y-3 stagger-children">
                <h3 className="text-sm font-bold text-primary-700 mb-2">Your personalized plan includes:</h3>
                {[
                  'Custom workout plan based on your goals',
                  'AI-powered nutrition recommendations',
                  'Smart progress tracking & analytics',
                  'Personalized recovery suggestions',
                  'Adaptive difficulty adjustments',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-700 clickable-sm hover:text-primary-700 transition-colors cursor-pointer">
                    <Check size={16} className="text-emerald-500 shrink-0" />{item}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <button onClick={() => setCurrentStep(s => Math.max(1, s - 1))}
              className={`flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700 transition-all clickable-sm ${currentStep === 1 ? 'invisible' : ''}`}>
              <ChevronLeft size={18} /> Back
            </button>
            <button onClick={() => currentStep < 5 ? setCurrentStep(s => s + 1) : onComplete()}
              className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3 rounded-xl font-semibold text-sm btn-bounce ripple-container">
              {currentStep === 5 ? '🚀 Get Started' : 'Continue'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
