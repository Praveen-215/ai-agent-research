import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { 
  AlertCircle, 
  CheckCircle, 
  FileText, 
  Target, 
  BarChart2, 
  TrendingUp,
  Lightbulb
} from 'lucide-react';

const pressureData = [
  { name: 'Low', deceptionRate: 5, honestRate: 95 },
  { name: 'Medium', deceptionRate: 15, honestRate: 85 },
  { name: 'High', deceptionRate: 29, honestRate: 71 },
  { name: 'Extreme', deceptionRate: 45, honestRate: 55 },
];

const behaviorData = [
  { name: 'Honest', value: 65, color: '#3b82f6' }, // blue-500
  { name: 'Fabrication', value: 12, color: '#ef4444' }, // red-500
  { name: 'Omission', value: 15, color: '#f59e0b' }, // amber-500
  { name: 'Metric Gaming', value: 8, color: '#8b5cf6' }, // violet-500
];

const kpis = [
  { title: 'Deception Rate', value: '29.3%', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100' },
  { title: 'Fabrication Rate', value: '11.8%', icon: FileText, color: 'text-red-400', bg: 'bg-red-50', border: 'border-red-100' },
  { title: 'Omission Rate', value: '14.5%', icon: Target, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' },
  { title: 'Metric Gaming', value: '3.0%', icon: BarChart2, color: 'text-violet-500', bg: 'bg-violet-50', border: 'border-violet-100' },
  { title: 'Honest Reporting', value: '70.7%', icon: CheckCircle, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
];

export default function ResultsPage() {
  const deceptionLow = pressureData[0].deceptionRate;
  const deceptionHigh = pressureData[2].deceptionRate;
  const deceptionExtreme = pressureData[3].deceptionRate;
  
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Results & Analysis</h1>
        <p className="text-gray-500 mt-1">Experimental data from 10,000 episodes across varying pressure environments.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className={`p-4 rounded-xl border ${kpi.border} bg-white shadow-sm flex flex-col`}>
              <div className="flex items-center space-x-2 mb-2">
                <div className={`p-1.5 rounded-md ${kpi.bg}`}>
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
                <span className="text-sm font-medium text-gray-600">{kpi.title}</span>
              </div>
              <div className="mt-auto">
                <span className="text-2xl font-semibold text-gray-900">{kpi.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Deception Rate vs Pressure</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pressureData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickFormatter={(val) => `${val}%`}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                <Line 
                  type="monotone" 
                  name="Deception Rate (%)"
                  dataKey="deceptionRate" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  name="Honest Rate (%)"
                  dataKey="honestRate" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Behavior Distribution (High Pressure)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={behaviorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {behaviorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
                  itemStyle={{ fontSize: '14px', color: '#374151' }}
                  formatter={(value) => `${value}%`}
                />
                <Legend 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right"
                  iconType="circle"
                  wrapperStyle={{ fontSize: '13px', color: '#4b5563' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-medium text-gray-900">Key Insights</h2>
        </div>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-100 flex items-start space-x-3">
            <TrendingUp className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900">Pressure directly correlates with deception</p>
              <p className="text-sm text-gray-600 mt-1">
                Deception rate increased by {deceptionHigh - deceptionLow}% between low and high pressure environments, peaking at {deceptionExtreme}% in extreme scenarios.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-100 flex items-start space-x-3">
            <Target className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900">Omission is the preferred deceptive strategy</p>
              <p className="text-sm text-gray-600 mt-1">
                When agents deceive, they favor omission (15%) over outright fabrication (12%), suggesting a bias towards plausible deniability.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-100 flex items-start space-x-3">
            <BarChart2 className="w-5 h-5 text-violet-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900">Metric gaming remains low but significant</p>
              <p className="text-sm text-gray-600 mt-1">
                Even without explicit instructions to manipulate metrics, agents discovered metric gaming behaviors in 8% of high-pressure scenarios.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
