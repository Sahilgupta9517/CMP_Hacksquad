import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart as PieIcon, 
  Activity, 
  MapPin, 
  Layers, 
  ShieldCheck, 
  AlertTriangle,
  Info,
  Calendar,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar 
} from 'recharts';
import { 
  STATS_DATA, 
  MONTHLY_TREND_DATA, 
  CATEGORY_DATA, 
  DISTRICT_RANKING_DATA, 
  PRIORITY_DISTRIBUTION_DATA 
} from '../data/mockData';
import { TRANSLATIONS } from '../utils/translations';

export default function IntelligenceDashboard({ 
  currentLanguage = 'English', 
  extraFeedbackCount = 0 
}) {
  const t = TRANSLATIONS[currentLanguage]?.dashboard || TRANSLATIONS['English'].dashboard;

  const totalFeedbackCount = STATS_DATA.totalFeedback + extraFeedbackCount;

  const kpis = [
    {
      id: 'total',
      label: t.kpiTotal,
      value: totalFeedbackCount.toLocaleString('en-IN'),
      trend: '+24% this month',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    },
    {
      id: 'critical',
      label: t.kpiCritical,
      value: (STATS_DATA.criticalRequests + (extraFeedbackCount > 0 ? 1 : 0)).toLocaleString('en-IN'),
      trend: '+18% escalation',
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'border-rose-200'
    },
    {
      id: 'hotspots',
      label: t.kpiHotspots,
      value: '18 Districts',
      trend: 'UP State Grid',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200'
    },
    {
      id: 'reco',
      label: t.kpiReco,
      value: '5 Projects',
      trend: 'Ready for allocation',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-14">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
            <Activity className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            {t.title}
          </h1>
          <p className="text-sm text-slate-600">
            {t.subtitle}
          </p>
        </div>

        {/* Prototype Transparency Tag */}
        <div className="flex items-center space-x-2">
          <span className="text-11px font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 flex items-center space-x-1.5 shadow-sm">
            <Info className="w-3.5 h-3.5" />
            <span>{t.demoDatasetLabel}</span>
          </span>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi) => (
          <div
            key={kpi.id}
            className="glass-panel p-6 glass-card-hover flex flex-col justify-between border border-slate-200/90 shadow-sm"
          >
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              {kpi.label}
            </span>

            <div className="my-2">
              <div className={`text-3xl sm:text-4xl font-extrabold font-heading font-mono ${kpi.color}`}>
                {kpi.value}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
              <span className="text-slate-600 font-medium">{kpi.trend}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
          </div>
        ))}
      </div>

      {/* Grid of 4 Recharts Data Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart 1: Feedback Trend Line Chart (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center">
                <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
                {t.trendTitle}
              </h3>
              <span className="text-10px font-mono text-slate-400">Monthly Volume</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">Steady surge in citizen voice submissions</p>

            <div className="h-48 sm:h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MONTHLY_TREND_DATA}>
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '12px', border: 'none', fontSize: '12px' }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="feedback" 
                    stroke="#2563EB" 
                    strokeWidth={3} 
                    dot={{ fill: '#2563EB', r: 5 }} 
                    name="Total Complaints"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="critical" 
                    stroke="#EF4444" 
                    strokeWidth={2} 
                    strokeDasharray="4 4"
                    name="Critical Priority"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100 text-slate-600">
            <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-blue-600 mr-1.5"></span> Total Requests</span>
            <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 mr-1.5"></span> Critical Urgency</span>
            <span className="font-bold text-blue-700 font-mono">+339% Volume</span>
          </div>
        </div>

        {/* Chart 2: Infrastructure Categories Donut Chart (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center">
                <PieIcon className="w-4 h-4 text-cyan-600 mr-2" />
                {t.categoryTitle}
              </h3>
              <span className="text-10px font-mono text-slate-400">Sector Share</span>
            </div>
            <p className="text-xs text-slate-500 mb-2">Roads & Water comprise 64.6% of demand</p>

            <div className="h-48 sm:h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {CATEGORY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '12px', border: 'none', fontSize: '12px' }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-100 text-xs">
            {CATEGORY_DATA.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-slate-700">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }}></span>
                  <span className="text-11px font-medium">{cat.name}</span>
                </div>
                <span className="font-mono font-bold text-11px">{cat.percentage}% ({cat.count})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 3: District Complaint Ranking Horizontal Bar (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center">
                <BarChart3 className="w-4 h-4 text-indigo-600 mr-2" />
                {t.districtTitle}
              </h3>
              <span className="text-10px font-mono text-rose-600 font-bold">Bahraich Highest</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">Top 5 concentrated complaint districts in UP</p>

            <div className="h-48 sm:h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DISTRICT_RANKING_DATA} layout="vertical">
                  <XAxis type="number" stroke="#94A3B8" fontSize={11} />
                  <YAxis dataKey="district" type="category" stroke="#94A3B8" fontSize={11} width={80} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '12px', border: 'none', fontSize: '12px' }} 
                  />
                  <Bar dataKey="complaints" radius={[0, 6, 6, 0]}>
                    {DISTRICT_RANKING_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <p className="text-xs text-slate-500 text-center pt-2 border-t border-slate-100">
            Bahraich leads with 127 citizen voice logs, driven by seasonal road washouts.
          </p>
        </div>

        {/* Chart 4: Priority Distribution Pie Chart (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center">
                <ShieldCheck className="w-4 h-4 text-purple-600 mr-2" />
                {t.priorityTitle}
              </h3>
              <span className="text-10px font-mono text-slate-400">Urgency Classification</span>
            </div>
            <p className="text-xs text-slate-500 mb-2">Automated urgency vector categorization</p>

            <div className="h-48 sm:h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PRIORITY_DISTRIBUTION_DATA}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {PRIORITY_DISTRIBUTION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '12px', border: 'none', fontSize: '12px' }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex justify-around pt-2 border-t border-slate-100 text-xs">
            <span className="flex items-center text-rose-700 font-bold"><span className="w-2 h-2 rounded-full bg-rose-500 mr-1.5"></span> High (42%)</span>
            <span className="flex items-center text-amber-700 font-bold"><span className="w-2 h-2 rounded-full bg-amber-500 mr-1.5"></span> Medium (38%)</span>
            <span className="flex items-center text-emerald-700 font-bold"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5"></span> Low (20%)</span>
          </div>
        </div>

      </div>

    </div>
  );
}
