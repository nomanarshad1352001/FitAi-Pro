import { useState } from 'react';
import { TrendingUp, TrendingDown, Target, Scale, Heart, Activity, Ruler, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Modal from '../components/Modal';
import { monthlyProgress, bodyMetrics, sleepData, heartRateData } from '../data/dummyData';

interface ProgressProps {
  onToast: (type: 'success' | 'info' | 'ai', title: string, msg: string) => void;
}

export default function Progress({ onToast }: ProgressProps) {
  const [showMetricModal, setShowMetricModal] = useState<string | null>(null);
  const [selectedChart, setSelectedChart] = useState<string | null>(null);

  const weightDiff = bodyMetrics.current.weight - bodyMetrics.goals.weight;
  const bfDiff = bodyMetrics.current.bodyFat - bodyMetrics.goals.bodyFat;
  const muscleDiff = bodyMetrics.goals.muscleMass - bodyMetrics.current.muscleMass;

  const metrics = [
    { label: 'Weight', value: `${bodyMetrics.current.weight}kg`, goal: `${bodyMetrics.goals.weight}kg`, icon: <Scale size={18} />, diff: -weightDiff, color: 'blue', detail: 'Track body weight changes over time' },
    { label: 'Body Fat', value: `${bodyMetrics.current.bodyFat}%`, goal: `${bodyMetrics.goals.bodyFat}%`, icon: <Target size={18} />, diff: -bfDiff, color: 'amber', detail: 'Body fat percentage measured weekly' },
    { label: 'Muscle', value: `${bodyMetrics.current.muscleMass}kg`, goal: `${bodyMetrics.goals.muscleMass}kg`, icon: <Activity size={18} />, diff: -muscleDiff, color: 'emerald', detail: 'Lean muscle mass tracking' },
    { label: 'BMI', value: bodyMetrics.current.bmi.toString(), goal: 'Healthy', icon: <Ruler size={18} />, diff: null, color: 'purple', detail: 'Body Mass Index - within healthy range' },
    { label: 'Resting HR', value: `${bodyMetrics.current.restingHR} bpm`, goal: '<60 bpm', icon: <Heart size={18} />, diff: null, color: 'red', detail: 'Resting heart rate measured at wakeup' },
    { label: 'VO2 Max', value: bodyMetrics.current.vo2Max.toString(), goal: '45+', icon: <TrendingUp size={18} />, diff: 8, color: 'teal', detail: 'Maximum oxygen uptake capacity' },
  ];

  const selectedMetric = metrics.find(m => m.label === showMetricModal);

  const scoreItems = [
    { label: 'Workouts', score: 90, color: 'from-blue-500 to-blue-600' },
    { label: 'Nutrition', score: 78, color: 'from-emerald-500 to-emerald-600' },
    { label: 'Recovery', score: 75, color: 'from-amber-500 to-amber-600' },
    { label: 'Consistency', score: 87, color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Progress Tracking</h1>
        <p className="text-gray-500 mt-1">Monitor your body composition and health metrics</p>
      </div>

      {/* Body Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 stagger-children">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            onClick={() => setShowMetricModal(metric.label)}
            className="bg-white rounded-2xl border border-gray-100 p-4 card-hover cursor-pointer group"
          >
            <div className={`w-9 h-9 rounded-xl bg-${metric.color}-100 text-${metric.color}-600 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 group-active:scale-95`}>
              {metric.icon}
            </div>
            <p className="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors">{metric.value}</p>
            <p className="text-xs text-gray-500">{metric.label}</p>
            <p className="text-[11px] text-gray-400 mt-1">Goal: {metric.goal}</p>
            {metric.diff !== null && (
              <div className={`flex items-center gap-0.5 mt-1 text-xs ${metric.diff >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                {metric.diff >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {Math.abs(metric.diff).toFixed(1)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Weight & Body Composition Chart */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-fade-in-up delay-200 card-hover cursor-pointer" onClick={() => setSelectedChart('weight')}>
          <h2 className="text-lg font-bold text-gray-900 mb-1 hover:text-primary-700 transition-colors">Weight Trend</h2>
          <p className="text-sm text-gray-400 mb-4">Last 7 months</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyProgress}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: '13px' }} />
                <Line type="monotone" dataKey="weight" stroke="#6366f1" strokeWidth={3} dot={{ r: 5, fill: '#6366f1', className: 'cursor-pointer' }} activeDot={{ r: 7, className: 'cursor-pointer' }} name="Weight (kg)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-fade-in-up delay-300 card-hover cursor-pointer" onClick={() => setSelectedChart('composition')}>
          <h2 className="text-lg font-bold text-gray-900 mb-1 hover:text-primary-700 transition-colors">Body Composition</h2>
          <p className="text-sm text-gray-400 mb-4">Body fat % vs Muscle mass</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyProgress}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: '13px' }} />
                <Line type="monotone" dataKey="bodyFat" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4, className: 'cursor-pointer' }} name="Body Fat %" />
                <Line type="monotone" dataKey="muscle" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, className: 'cursor-pointer' }} name="Muscle (kg)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Sleep & Heart Rate */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-fade-in-up delay-400 card-hover cursor-pointer" onClick={() => setSelectedChart('sleep')}>
          <h2 className="text-lg font-bold text-gray-900 mb-1 hover:text-primary-700 transition-colors">Sleep Quality</h2>
          <p className="text-sm text-gray-400 mb-4">Hours slept & quality score</p>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sleepData}>
                <defs>
                  <linearGradient id="sleepGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: '13px' }} />
                <Area type="monotone" dataKey="hours" stroke="#818cf8" fill="url(#sleepGrad)" strokeWidth={2.5} name="Hours" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4 stagger-children">
            {[
              { val: '7.5h', label: 'Avg Sleep', bg: 'bg-indigo-50 hover:bg-indigo-100', color: 'text-indigo-700' },
              { val: '81%', label: 'Avg Quality', bg: 'bg-purple-50 hover:bg-purple-100', color: 'text-purple-700' },
              { val: '1.8h', label: 'Deep Sleep', bg: 'bg-blue-50 hover:bg-blue-100', color: 'text-blue-700' },
            ].map(s => (
              <div key={s.label} className={`text-center p-3 ${s.bg} rounded-xl clickable-sm cursor-pointer transition-all`} onClick={(e) => { e.stopPropagation(); onToast('info', s.label, `${s.val} this week`); }}>
                <p className={`text-lg font-bold ${s.color}`}>{s.val}</p>
                <p className="text-[11px] text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-fade-in-up delay-500 card-hover cursor-pointer" onClick={() => setSelectedChart('heart')}>
          <h2 className="text-lg font-bold text-gray-900 mb-1 hover:text-primary-700 transition-colors">Heart Rate</h2>
          <p className="text-sm text-gray-400 mb-4">Today's heart rate throughout the day</p>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={heartRateData}>
                <defs>
                  <linearGradient id="hrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                <YAxis domain={[50, 180]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: '13px' }} />
                <Area type="monotone" dataKey="rate" stroke="#ef4444" fill="url(#hrGrad)" strokeWidth={2.5} name="BPM" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4 stagger-children">
            {[
              { val: '62', label: 'Resting', bg: 'bg-green-50 hover:bg-green-100', color: 'text-green-700' },
              { val: '165', label: 'Peak', bg: 'bg-orange-50 hover:bg-orange-100', color: 'text-orange-700' },
              { val: '96', label: 'Average', bg: 'bg-red-50 hover:bg-red-100', color: 'text-red-700' },
            ].map(s => (
              <div key={s.label} className={`text-center p-3 ${s.bg} rounded-xl clickable-sm cursor-pointer transition-all`} onClick={(e) => { e.stopPropagation(); onToast('info', s.label + ' BPM', s.val + ' bpm'); }}>
                <p className={`text-lg font-bold ${s.color}`}>{s.val}</p>
                <p className="text-[11px] text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fitness Score */}
      <div className="bg-gradient-to-r from-primary-600 via-indigo-600 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden animate-fade-in-up delay-600 cursor-pointer group" onClick={() => onToast('ai', 'Fitness Score Analysis', 'Your score improved 4 points this month!')}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 transition-transform duration-700 group-hover:scale-125" />
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-28 h-28 rounded-full bg-white/10 border-4 border-white/30 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
            <span className="text-4xl font-black">82</span>
          </div>
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl font-bold mb-1 group-hover:tracking-wide transition-all">Overall Fitness Score</h2>
            <p className="text-primary-200 mb-3">Based on workout consistency, nutrition, sleep quality, and body composition</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              {scoreItems.map(s => (
                <button
                  key={s.label}
                  onClick={(e) => { e.stopPropagation(); onToast('info', s.label, `Score: ${s.score}/100`); }}
                  className="bg-white/15 px-3 py-1.5 rounded-full text-sm hover:bg-white/25 transition-all clickable-sm"
                >
                  {s.label}: {s.score}/100
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Metric Detail Modal */}
      <Modal isOpen={!!showMetricModal} onClose={() => setShowMetricModal(null)} title={selectedMetric?.label || ''} size="sm">
        {selectedMetric && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-indigo-50 rounded-2xl">
              <p className="text-4xl font-black text-primary-700 animate-count-up">{selectedMetric.value}</p>
              <p className="text-sm text-gray-500 mt-1">Current • Goal: {selectedMetric.goal}</p>
            </div>
            <p className="text-sm text-gray-600">{selectedMetric.detail}</p>
            <button onClick={() => { setShowMetricModal(null); onToast('info', 'Logging...', `Opening ${selectedMetric.label} log`); }}
              className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold text-sm btn-bounce ripple-container">
              Log New Measurement
            </button>
          </div>
        )}
      </Modal>

      {/* Chart Detail Modal */}
      <Modal isOpen={!!selectedChart} onClose={() => setSelectedChart(null)} title={
        selectedChart === 'weight' ? 'Weight Analysis' : selectedChart === 'composition' ? 'Composition Analysis' : selectedChart === 'sleep' ? 'Sleep Analysis' : 'Heart Rate Analysis'
      } size="sm">
        <div className="space-y-4 animate-fade-in-up">
          <p className="text-sm text-gray-600">
            {selectedChart === 'weight' ? 'You\'ve lost 6kg over 7 months — great progress!' :
             selectedChart === 'composition' ? 'Body fat down 4%, muscle up 3kg. Excellent recomposition!' :
             selectedChart === 'sleep' ? 'Average 7.5 hours with 81% quality score.' :
             'Resting heart rate of 62 bpm indicates excellent cardiovascular health.'}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-50 rounded-xl p-3 text-center clickable-sm hover:bg-emerald-100 transition-colors">
              <p className="text-lg font-bold text-emerald-700">📈 Improving</p>
              <p className="text-xs text-gray-500">Overall trend</p>
            </div>
            <div className="bg-primary-50 rounded-xl p-3 text-center clickable-sm hover:bg-primary-100 transition-colors">
              <p className="text-lg font-bold text-primary-700">🎯 On Track</p>
              <p className="text-xs text-gray-500">Goal status</p>
            </div>
          </div>
          <button onClick={() => { setSelectedChart(null); onToast('info', 'Exporting...', 'Data export started'); }}
            className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold text-sm btn-bounce ripple-container flex items-center justify-center gap-2">
            Export Data <ChevronRight size={16} />
          </button>
        </div>
      </Modal>
    </div>
  );
}
