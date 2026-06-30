import { useState } from 'react';
import { BarChart3, Flame, Timer, Target, Calendar, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../components/StatCard';
import Modal from '../components/Modal';
import { weeklyActivity, monthlyProgress, analyticsOverview } from '../data/dummyData';

const workoutDistribution = [
  { name: 'Strength', value: 42, color: '#6366f1' },
  { name: 'Cardio', value: 25, color: '#ef4444' },
  { name: 'HIIT', value: 18, color: '#f59e0b' },
  { name: 'Yoga', value: 10, color: '#10b981' },
  { name: 'Other', value: 5, color: '#8b5cf6' },
];

const consistencyData = [
  { week: 'W1', completion: 80 }, { week: 'W2', completion: 95 }, { week: 'W3', completion: 70 },
  { week: 'W4', completion: 85 }, { week: 'W5', completion: 90 }, { week: 'W6', completion: 100 },
  { week: 'W7', completion: 75 }, { week: 'W8', completion: 85 },
];

const goalRadial = [
  { name: 'Weight Loss', value: 72, fill: '#6366f1' },
  { name: 'Muscle Gain', value: 58, fill: '#10b981' },
  { name: 'Endurance', value: 45, fill: '#f59e0b' },
];

interface AnalyticsProps {
  onToast: (type: 'success' | 'info' | 'ai', title: string, msg: string) => void;
}

export default function Analytics({ onToast }: AnalyticsProps) {
  const [timeRange, setTimeRange] = useState('This Week');
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-500 mt-1">Deep insights into your fitness journey</p>
        </div>
        <div className="flex items-center gap-2">
          {['This Week', 'This Month', 'All Time'].map(range => (
            <button key={range} onClick={() => { setTimeRange(range); onToast('info', 'Period Changed', `Showing ${range} data`); }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all clickable-sm ${timeRange === range ? 'bg-primary-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {range}
            </button>
          ))}
          <button onClick={() => setShowExportModal(true)} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 clickable-sm transition-all">
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Workouts" value={analyticsOverview.totalWorkouts} icon={<BarChart3 size={20} />} color="primary" trend={{ value: 12, label: '' }} delay={50} onClick={() => onToast('info', 'Total Workouts', '156 workouts completed')} />
        <StatCard title="Calories Burned" value={`${(analyticsOverview.totalCaloriesBurned / 1000).toFixed(1)}k`} icon={<Flame size={20} />} color="fire" trend={{ value: 8, label: '' }} delay={100} onClick={() => onToast('info', 'Calories', '52,400 kcal total')} />
        <StatCard title="Avg Duration" value={`${analyticsOverview.avgWorkoutDuration} min`} icon={<Timer size={20} />} color="energy" trend={{ value: 5, label: '' }} delay={150} onClick={() => onToast('info', 'Duration', '48 min average')} />
        <StatCard title="Consistency" value={`${analyticsOverview.consistencyScore}%`} icon={<Target size={20} />} color="accent" trend={{ value: analyticsOverview.improvementRate, label: '' }} delay={200} onClick={() => onToast('info', 'Consistency', '87% goal completion rate')} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-fade-in-up delay-200 card-hover cursor-pointer" onClick={() => onToast('info', 'Weekly Data', 'Click individual bars for details')}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 hover:text-primary-700 transition-colors">Weekly Performance</h2>
            <span className="text-xs bg-gray-50 text-gray-500 px-2.5 py-1 rounded-lg clickable-sm">{timeRange}</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivity} barCategoryGap="20%">
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: '13px' }} />
                <Bar dataKey="calories" fill="#6366f1" radius={[4, 4, 0, 0]} name="Calories" className="cursor-pointer" />
                <Bar dataKey="steps" fill="#a5b4fc" radius={[4, 4, 0, 0]} name="Steps" className="cursor-pointer" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-fade-in-up delay-300 card-hover cursor-pointer" onClick={() => onToast('info', 'Workout Mix', 'Strength training dominates at 42%')}>
          <h2 className="text-lg font-bold text-gray-900 mb-4 hover:text-primary-700 transition-colors">Workout Distribution</h2>
          <div className="flex items-center gap-6">
            <div className="h-52 w-52 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={workoutDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={80} dataKey="value" strokeWidth={0}>
                    {workoutDistribution.map((entry, i) => <Cell key={i} fill={entry.color} className="cursor-pointer hover:opacity-80 transition-opacity" />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '13px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 flex-1">
              {workoutDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between clickable-sm cursor-pointer hover:bg-gray-50 rounded-lg p-1 -m-1 transition-all"
                  onClick={(e) => { e.stopPropagation(); onToast('info', item.name, `${item.value}% of your workouts`); }}>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full transition-transform hover:scale-150" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-600 hover:text-primary-600 transition-colors">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-fade-in-up delay-400 card-hover cursor-pointer" onClick={() => onToast('info', 'Goal Progress', 'Weight loss is your strongest area')}>
          <h2 className="text-lg font-bold text-gray-900 mb-4 hover:text-primary-700 transition-colors">Goal Progress</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="100%" data={goalRadial} startAngle={180} endAngle={0}>
                <RadialBar background={{ fill: '#f3f4f6' }} dataKey="value" cornerRadius={10} className="cursor-pointer" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '13px' }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-2">
            {goalRadial.map((g) => (
              <button key={g.name} className="flex items-center gap-2 clickable-sm hover:bg-gray-50 rounded-lg px-2 py-1 transition-all"
                onClick={(e) => { e.stopPropagation(); onToast('info', g.name, `${g.value}% complete`); }}>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: g.fill }} />
                <span className="text-xs text-gray-600">{g.name}: {g.value}%</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-fade-in-up delay-500 card-hover cursor-pointer" onClick={() => onToast('info', 'Consistency', 'Week 6 was your best week!')}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 hover:text-primary-700 transition-colors">Weekly Consistency</h2>
            <div className="flex items-center gap-1 text-sm text-emerald-600 font-medium clickable-sm">
              <ArrowUpRight size={16} /> 87% avg
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={consistencyData}>
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '13px' }} />
                <Line type="monotone" dataKey="completion" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: '#10b981', className: 'cursor-pointer' }} name="Completion %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-fade-in-up delay-600 card-hover cursor-pointer" onClick={() => onToast('ai', 'Score Trend', 'Up 20 points since January!')}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 hover:text-primary-700 transition-colors">Fitness Score Trend</h2>
            <p className="text-sm text-gray-400">Your overall fitness score over time</p>
          </div>
          <div className="flex items-center gap-2 clickable-sm" onClick={(e) => { e.stopPropagation(); setShowExportModal(true); }}>
            <Calendar size={14} className="text-gray-400" />
            <span className="text-xs text-gray-500">Jan - Jul 2025</span>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyProgress}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
              <YAxis domain={[50, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: '13px' }} />
              <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} dot={{ r: 5, fill: '#6366f1', stroke: '#fff', strokeWidth: 2, className: 'cursor-pointer' }} name="Fitness Score" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Modal isOpen={showExportModal} onClose={() => setShowExportModal(false)} title="Export Analytics" size="sm">
        <div className="space-y-4 animate-fade-in-up">
          <p className="text-sm text-gray-600">Choose your export format and data range.</p>
          {['PDF Report', 'CSV Data', 'JSON API'].map(format => (
            <button key={format} onClick={() => { setShowExportModal(false); onToast('success', 'Export Started', `Generating ${format}...`); }}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-primary-50 rounded-xl text-sm font-medium text-gray-700 hover:text-primary-700 transition-all clickable-sm">
              {format} <ArrowUpRight size={16} className="text-gray-400" />
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
