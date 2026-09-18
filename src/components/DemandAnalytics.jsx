import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart as PieIcon, 
  Layers, 
  Info,
  Calendar
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area 
} from 'recharts';

export default function DemandAnalytics({ requests = [] }) {
  // 1. Category Distribution Data
  const categoryData = [
    { name: 'Roads & Transport', count: 4820, percentage: '38%' },
    { name: 'Healthcare & Oxygen', count: 3680, percentage: '29%' },
    { name: 'Drinking Water', count: 2310, percentage: '18%' },
    { name: 'Electricity & Solar', count: 1120, percentage: '9%' },
    { name: 'Digital / BharatNet', count: 910, percentage: '6%' }
  ];

  // 2. Trend Over Time Data (Monthly)
  const trendData = [
    { month: 'Apr', requests: 1420 },
    { month: 'May', requests: 1980 },
    { month: 'Jun', requests: 2450 },
    { month: 'Jul', requests: 3120 },
    { month: 'Aug', requests: 4680 },
    { month: 'Sep (Current)', requests: 6240 }
  ];

  // 3. State-wise Demand Breakdown Data
  const stateData = [
    { state: 'UP', volume: 3120 },
    { state: 'Bihar', volume: 2840 },
    { state: 'MH', volume: 2410 },
    { state: 'Odisha', volume: 1980 },
    { state: 'Punjab', volume: 1820 },
    { state: 'Rajasthan', volume: 1650 },
    { state: 'TN', volume: 1420 },
    { state: 'Gujarat', volume: 1340 }
  ];

  const COLORS = ['#1E40AF', '#DC2626', '#0284C7', '#D97706', '#059669'];

  return (
    <section className="mb-14">
      
      {/* Section Header */}
      <div className="flex flex-col sm-flex-row sm-items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <BarChart3 className="w-5 h-5 text-blue-700" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#0A192F] font-heading">
              WHAT CITIZENS ARE ASKING FOR
            </h2>
          </div>
          <p className="text-sm text-slate-600">
            Categorical, temporal, and geographic distribution of public development requests
          </p>
        </div>

        <span className="gov-badge gov-badge-blue">
          Multilingual Aggregation Feed
        </span>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg-grid-cols-12 gap-6">
        
        {/* Chart 1: Infrastructure Demand Distribution (4 cols) */}
        <div className="lg-col-span-4 gov-card p-5 border border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0A192F] font-heading flex items-center">
              <PieIcon className="w-4 h-4 text-blue-700 mr-2" />
              Category Demand Distribution
            </h3>
            <p className="text-11px text-slate-500 mb-2">Breakdown across 12,840 citizen submissions</p>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', border: 'none', fontSize: '12px' }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
            {categoryData.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between text-slate-700">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx] }}></span>
                  <span className="text-11px">{item.name}</span>
                </div>
                <span className="font-bold font-mono text-11px">{item.percentage}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Citizen Requests Over Time (4 cols) */}
        <div className="lg-col-span-4 gov-card p-5 border border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0A192F] font-heading flex items-center">
              <TrendingUp className="w-4 h-4 text-emerald-700 mr-2" />
              Citizen Inflow Growth Trend
            </h3>
            <p className="text-11px text-slate-500 mb-2">Monthly voice & messaging adoption</p>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#1E40AF" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', border: 'none', fontSize: '12px' }} 
                  />
                  <Area type="monotone" dataKey="requests" stroke="#1E40AF" strokeWidth={2.5} fillOpacity={1} fill="url(#growthGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
            <span className="font-bold">+339% Volume Growth</span>
            <span>Since Voice AI Launch</span>
          </div>
        </div>

        {/* Chart 3: State-wise Demand (4 cols) */}
        <div className="lg-col-span-4 gov-card p-5 border border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0A192F] font-heading flex items-center">
              <BarChart3 className="w-4 h-4 text-indigo-700 mr-2" />
              State-wise Inflow Volume
            </h3>
            <p className="text-11px text-slate-500 mb-2">Top 8 connected state nodes</p>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stateData}>
                  <XAxis dataKey="state" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', border: 'none', fontSize: '12px' }} 
                  />
                  <Bar dataKey="volume" fill="#2563EB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-700">
            <span>Aggregating 12 Indian Languages</span>
            <span className="font-bold text-blue-700">100% Interoperable</span>
          </div>
        </div>

      </div>

    </section>
  );
}
