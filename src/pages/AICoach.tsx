import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, Lightbulb, TrendingUp, Zap, Brain, ArrowRight, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { aiRecommendations } from '../data/dummyData';

interface Message {
  role: 'bot' | 'user';
  message: string;
  time: string;
}

const initialMessages: Message[] = [
  { role: 'bot', message: "Hey Alex! 👋 I've analyzed your latest workout and nutrition data. Here's what I found:", time: '10:30 AM' },
  { role: 'bot', message: "Your bench press has improved 12% over the last month! 💪 However, your protein intake has been inconsistent. Want me to suggest some meal adjustments?", time: '10:30 AM' },
  { role: 'user', message: "Yes, please! I've been struggling with hitting my protein targets especially post-workout.", time: '10:32 AM' },
  { role: 'bot', message: "I recommend adding a whey protein shake (30g protein) immediately post-workout, and consider prepping Greek yogurt parfaits for snacks. This alone would add ~50g of protein to your daily intake. Want me to create a meal plan?", time: '10:33 AM' },
  { role: 'user', message: "That sounds great! Can you also look at my recovery data?", time: '10:35 AM' },
  { role: 'bot', message: "Sure! Looking at your sleep data, you're averaging 7.2 hours but your deep sleep is only 24% — ideally it should be 30-35%. I suggest:\n\n1. Stop screens 1 hour before bed\n2. Keep your room at 65-68°F\n3. Consider magnesium supplementation\n\nThis could improve your recovery score by 15-20%! 🌙", time: '10:36 AM' },
];

const aiResponses = [
  "Great question! Based on your data, I'd recommend increasing your training volume by 10% over the next 2 weeks. Your body has adapted well to the current load. 📈",
  "I've analyzed your nutrition patterns and notice you tend to undereat on rest days. Try maintaining at least 80% of your training day calories to support recovery. 🥗",
  "Your sleep consistency has improved! The key now is to focus on sleep quality. Have you tried limiting caffeine after 2 PM? Studies show this can improve deep sleep by 20%. ☕",
  "Looking at your workout splits, I'd suggest swapping to an upper/lower split for the next 4 weeks. This will allow better recovery between sessions. 💪",
  "Your heart rate variability shows you're ready for a deload week. I recommend reducing volume by 40% this week to supercompensate. 🔄",
];

const quickActions = [
  { label: 'Generate Workout', icon: <Zap size={16} />, color: 'from-blue-500 to-indigo-500' },
  { label: 'Meal Suggestions', icon: <Lightbulb size={16} />, color: 'from-emerald-500 to-teal-500' },
  { label: 'Analyze Progress', icon: <TrendingUp size={16} />, color: 'from-amber-500 to-orange-500' },
  { label: 'Recovery Tips', icon: <Brain size={16} />, color: 'from-purple-500 to-pink-500' },
];

interface AICoachProps {
  onToast: (type: 'success' | 'info' | 'ai', title: string, msg: string) => void;
}

export default function AICoach({ onToast }: AICoachProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text?: string) => {
    const msg = text || inputValue.trim();
    if (!msg) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [...prev, { role: 'user', message: msg, time: timeStr }]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setMessages(prev => [...prev, { role: 'bot', message: response, time: timeStr }]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={24} className="text-primary-500 animate-float" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Fitness Coach</h1>
        </div>
        <p className="text-gray-500">Your personalized AI-powered training assistant</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 stagger-children">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => sendMessage(`Help me with: ${action.label}`)}
            className={`bg-gradient-to-r ${action.color} text-white p-4 rounded-xl text-left card-hover ripple-container`}
          >
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center mb-2 transition-transform group-hover:scale-110">
              {action.icon}
            </div>
            <p className="text-sm font-semibold">{action.label}</p>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 flex flex-col h-[600px] animate-fade-in-up delay-200">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3 cursor-pointer clickable-sm" onClick={() => onToast('ai', 'FitAI Status', 'AI Coach is online and ready!')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center animate-pulse-glow">
              <Bot size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">FitAI Assistant</h2>
              <p className="text-xs text-emerald-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-pulse" /> Online
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 animate-fade-in-up ${msg.role === 'user' ? 'flex-row-reverse' : ''}`} style={{ animationDelay: '0ms' }}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 clickable-sm transition-transform hover:scale-110 ${
                  msg.role === 'bot' ? 'bg-primary-100 text-primary-600' : 'bg-gray-200 text-gray-600'
                }`}>
                  {msg.role === 'bot' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className={`max-w-[80%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line transition-all hover:shadow-md ${
                    msg.role === 'user' ? 'bg-primary-600 text-white rounded-br-md' : 'bg-gray-100 text-gray-700 rounded-bl-md'
                  }`}>
                    {msg.message}
                  </div>
                  <div className="flex items-center gap-2 mt-1 px-1">
                    <p className="text-[10px] text-gray-400">{msg.time}</p>
                    {msg.role === 'bot' && (
                      <div className="flex items-center gap-1">
                        <button onClick={() => { navigator.clipboard.writeText(msg.message); onToast('success', 'Copied!', 'Message copied to clipboard'); }}
                          className="p-0.5 text-gray-300 hover:text-primary-500 transition-colors clickable-sm"><Copy size={10} /></button>
                        <button onClick={() => onToast('success', 'Thanks! 👍', 'Feedback recorded')}
                          className="p-0.5 text-gray-300 hover:text-emerald-500 transition-colors clickable-sm"><ThumbsUp size={10} /></button>
                        <button onClick={() => onToast('info', 'Noted', 'We\'ll improve this response')}
                          className="p-0.5 text-gray-300 hover:text-red-500 transition-colors clickable-sm"><ThumbsDown size={10} /></button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0">
                  <Bot size={16} />
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-50">
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex items-center gap-2">
              <input
                type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask your AI coach anything..."
                className="flex-1 px-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={isTyping || !inputValue.trim()}
                className="w-11 h-11 rounded-xl bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-all shrink-0 btn-bounce disabled:opacity-50 disabled:cursor-not-allowed ripple-container"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 animate-fade-in-up delay-300">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2 cursor-pointer clickable-sm hover:text-primary-700 transition-colors" onClick={() => onToast('ai', 'AI Insights', '5 active recommendations')}>
              <Sparkles size={16} className="text-primary-500" /> Active Insights
            </h3>
            <div className="space-y-3">
              {aiRecommendations.map((rec) => (
                <div key={rec.id} onClick={() => sendMessage(`Tell me more about: ${rec.title}`)} className="p-3 bg-gray-50 rounded-xl hover:bg-primary-50 transition-all cursor-pointer card-hover group">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-lg transition-transform duration-300 group-hover:scale-125">{rec.icon}</span>
                    <div className="flex-1">
                      <h4 className="text-xs font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">{rec.title}</h4>
                      <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded clickable-sm ${
                        rec.priority === 'high' ? 'bg-red-100 text-red-600' : rec.priority === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-gray-200 text-gray-500'
                      }`}>{rec.priority}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{rec.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full progress-animate" style={{ width: `${rec.confidence}%` }} />
                      </div>
                      <span className="text-[10px] text-gray-400">{rec.confidence}%</span>
                    </div>
                    <button className="text-[11px] font-medium text-primary-600 flex items-center gap-0.5 clickable-sm hover:text-primary-700">
                      {rec.actionLabel} <ArrowRight size={10} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-600 to-indigo-700 rounded-2xl p-5 text-white animate-fade-in-up delay-400 cursor-pointer card-hover" onClick={() => onToast('ai', 'AI Stats', 'Your AI coach has analyzed 12,480 data points')}>
            <h3 className="text-sm font-bold mb-3">AI Analysis Stats</h3>
            <div className="space-y-3">
              {[
                { label: 'Data Points Analyzed', value: '12,480' },
                { label: 'Recommendations Made', value: '48' },
                { label: 'Accuracy Rate', value: '94.2%' },
                { label: 'Goals Achieved via AI', value: '12/15' },
              ].map(stat => (
                <div key={stat.label} className="flex justify-between items-center clickable-sm hover:bg-white/10 rounded-lg px-2 py-1 -mx-2 transition-all" onClick={(e) => { e.stopPropagation(); onToast('info', stat.label, stat.value); }}>
                  <span className="text-xs text-primary-200">{stat.label}</span>
                  <span className="text-sm font-bold">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
