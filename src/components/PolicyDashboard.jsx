import React, { useState } from 'react';
import { 
  Activity, 
  MapPin, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertOctagon, 
  Sparkles, 
  BarChart3, 
  PieChart as PieIcon, 
  Zap, 
  Building, 
  IndianRupee, 
  ShieldAlert, 
  Sliders,
  Award,
  Layers,
  FileCheck
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
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis 
} from 'recharts';

export default function PolicyDashboard({ 
  requests, 
  aiProjects, 
  hotspots, 
  onUpdateProjectStatus 
}) {
  const [selectedStateFilter, setSelectedStateFilter] = useState('All');
  const [budgetSimulatorVal, setBudgetSimulatorVal] = useState(2500); // INR Lakhs (25 Cr)
  const [activeTab, setActiveTab] = useState('hotspots'); // 'hotspots', 'recommendations', 'nlp', 'simulator'

  // Summary Metrics Calculation
  const totalRequestsCount = requests.length;
  const criticalRequestsCount = requests.filter(r => r.urgency_level === 'Critical' || r.urgency_level === 'High').length;
  const approvedProjectsCount = aiProjects.filter(p => p.status === 'Approved' || p.status === 'Work In Progress').length;
  const totalEstimatedBudget = aiProjects.reduce((acc, p) => acc + Number(p.estimated_budget_inr), 0);

  // Category chart dataset
  const categoryCounts = requests.reduce((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1;
    return acc;
  }, {});

  const categoryChartData = Object.keys(categoryCounts).map(cat => ({
    name: cat,
    count: categoryCounts[cat]
  }));

  // Language distribution dataset
  const languageCounts = requests.reduce((acc, r) => {
    acc[r.language] = (acc[r.language] || 0) + 1;
    return acc;
  }, {});

  const languageChartData = Object.keys(languageCounts).map(lang => ({
    name: lang,
    count: languageCounts[lang]
  }));

  // Colors for charts
  const COLORS = ['#FF9933', '#38BDF8', '#34D399', '#A855F7', '#F43F5E', '#F59E0B'];

  // Urgency radar data
  const radarData = [
    { category: 'Healthcare', score: 94 },
    { category: 'Water Supply', score: 88 },
    { category: 'Road Infra', score: 96 },
    { category: 'Electricity', score: 78 },
    { category: 'Digital DPI', score: 65 },
    { category: 'Education', score: 70 }
  ];

  // Simulator impact prediction
  const simulatedBeneficiaries = Math.round((budgetSimulatorVal / 2500) * 830000);
  const simulatedSDGScore = Math.min(98, Math.round(65 + (budgetSimulatorVal / 5000) * 30));

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-slate-800">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              <Activity className="w-3.5 h-3.5" />
              <span>NitiDrishti (नीतिदृष्टि) Policy Executive Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
              National Infrastructure <span className="gradient-text-emerald">Demand & Hotspot AI</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Consolidating multilingual citizen feedback with Census demographics, poverty indices, and BharatNet DPI assets to recommend high-priority infrastructure investments.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <div className="text-right">
              <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">AI Confidence Rating</span>
              <span className="text-lg font-bold text-emerald-400 font-mono">94.8% Vector Match</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Aggregated Feedback</span>
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-white font-heading">{totalRequestsCount * 142}</span>
            <span className="text-xs text-orange-400 font-semibold">+18.4% this week</span>
          </div>
          <p className="text-[11px] text-slate-400">Indexed via Voice, WhatsApp & SMS</p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Critical Demand Hotspots</span>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-white font-heading">{hotspots.length} Districts</span>
            <span className="text-xs text-rose-400 font-semibold">High Vulnerability</span>
          </div>
          <p className="text-[11px] text-slate-400">Combining healthcare & water deficit</p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">AI Prioritized Budget</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-white font-heading">₹{(totalEstimatedBudget / 100).toFixed(1)} Cr</span>
            <span className="text-xs text-emerald-400 font-semibold">4 Approved</span>
          </div>
          <p className="text-[11px] text-slate-400">Estimated budget required</p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">SDG & DPI Alignment</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-white font-heading">92.4 Index</span>
            <span className="text-xs text-cyan-400 font-semibold">Optimal ROI</span>
          </div>
          <p className="text-[11px] text-slate-400">Direct impact on 8.3L citizens</p>
        </div>

      </div>

      {/* Tab Controls */}
      <div className="flex border-b border-slate-800 bg-slate-950/60 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab('hotspots')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
            activeTab === 'hotspots'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>GIS Demand Hotspots</span>
        </button>

        <button
          onClick={() => setActiveTab('recommendations')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
            activeTab === 'recommendations'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Project Recommendations ({aiProjects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('nlp')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
            activeTab === 'nlp'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Multilingual NLP Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
            activeTab === 'simulator'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>DPI Impact & Budget Simulator</span>
        </button>
      </div>

      {/* Tab 1: GIS Demand Hotspots */}
      {activeTab === 'hotspots' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Heatmap Data List */}
          <div className="lg:col-span-6 space-y-4">
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white font-heading flex items-center">
                  <MapPin className="w-4 h-4 text-emerald-400 mr-2" />
                  District Vulnerability & Demand Ranking
                </h3>
                <span className="text-[11px] text-slate-400">Updated Real-time</span>
              </div>

              <div className="space-y-3">
                {hotspots.map((spot, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 transition flex items-center justify-between space-x-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-white">{spot.district}, {spot.state}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          spot.intensity > 90 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                          spot.intensity > 80 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {spot.intensity > 90 ? 'CRITICAL HOTSPOT' : 'HIGH PRIORITY'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Primary Gap: <strong className="text-slate-200">{spot.topCategory}</strong> • Indexed Requests: <strong className="text-amber-400">{spot.count}</strong>
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="block text-xs font-mono font-bold text-rose-400">
                        {spot.deficitScore}% Deficit
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Hotspot Index: {spot.intensity}/100
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Visual Map Representation */}
          <div className="lg:col-span-6 space-y-4">
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-base font-bold text-white font-heading mb-1">
                  National DPI Hotspot Map Overlay
                </h3>
                <p className="text-xs text-slate-400">
                  Regional visualization fusing citizen voice logs with census demographics.
                </p>
              </div>

              {/* SVG Map Graphics Container */}
              <div className="relative w-full h-80 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center p-4 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

                {/* Simulated India GIS Nodes */}
                <div className="relative w-full max-w-sm h-full flex items-center justify-center">
                  
                  {/* Gadchiroli MH Node */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-12 -translate-y-4 flex flex-col items-center group cursor-pointer">
                    <span className="relative flex h-5 w-5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center">94</span>
                    </span>
                    <span className="text-[10px] font-bold text-white mt-1 bg-slate-900/90 px-1.5 py-0.5 rounded border border-rose-500/40">Gadchiroli (MH)</span>
                  </div>

                  {/* Kalahandi OD Node */}
                  <div className="absolute top-1/2 left-1/2 translate-x-16 -translate-y-8 flex flex-col items-center group cursor-pointer">
                    <span className="relative flex h-5 w-5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-amber-500 text-[10px] font-bold text-slate-950 flex items-center justify-center">91</span>
                    </span>
                    <span className="text-[10px] font-bold text-white mt-1 bg-slate-900/90 px-1.5 py-0.5 rounded border border-amber-500/40">Kalahandi (OD)</span>
                  </div>

                  {/* Purnia BR Node */}
                  <div className="absolute top-1/3 left-1/2 translate-x-20 -translate-y-16 flex flex-col items-center group cursor-pointer">
                    <span className="relative flex h-5 w-5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-rose-600 text-[10px] font-bold text-white flex items-center justify-center">96</span>
                    </span>
                    <span className="text-[10px] font-bold text-white mt-1 bg-slate-900/90 px-1.5 py-0.5 rounded border border-rose-500/40">Purnia (BR)</span>
                  </div>

                  {/* Barmer RJ Node */}
                  <div className="absolute top-1/3 left-1/4 -translate-x-12 -translate-y-10 flex flex-col items-center group cursor-pointer">
                    <span className="relative flex h-4 w-4">
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-400 text-[9px] font-bold text-slate-950 flex items-center justify-center">82</span>
                    </span>
                    <span className="text-[10px] font-bold text-white mt-1 bg-slate-900/90 px-1.5 py-0.5 rounded border border-amber-500/40">Barmer (RJ)</span>
                  </div>

                  {/* Wayanad KL Node */}
                  <div className="absolute bottom-1/4 left-1/3 -translate-x-4 translate-y-8 flex flex-col items-center group cursor-pointer">
                    <span className="relative flex h-4 w-4">
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 text-[9px] font-bold text-white flex items-center justify-center">52</span>
                    </span>
                    <span className="text-[10px] font-bold text-white mt-1 bg-slate-900/90 px-1.5 py-0.5 rounded border border-emerald-500/40">Wayanad (KL)</span>
                  </div>

                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 mr-1.5"></span> Critical (&gt;90)</span>
                <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-1.5"></span> High (75-90)</span>
                <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1.5"></span> Moderate (&lt;75)</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: AI Project Recommendations Engine */}
      {activeTab === 'recommendations' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white font-heading flex items-center">
                <Sparkles className="w-5 h-5 text-emerald-400 mr-2" />
                AI-Generated High-Priority Project Recommendations
              </h3>
              <p className="text-xs text-slate-400">
                Machine learning prioritization fusing public voice distress signals, SDG alignment, and estimated budget ROI.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiProjects.map(proj => (
              <div
                key={proj.id}
                className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4 hover:border-emerald-500/50 transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono font-bold text-emerald-400">
                      {proj.project_code}
                    </span>

                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold font-mono">
                        Score: {proj.priority_score}/100
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        proj.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        proj.status === 'Work In Progress' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' :
                        'bg-slate-800 text-slate-300'
                      }`}>
                        {proj.status}
                      </span>
                    </div>
                  </div>

                  {/* Project Title */}
                  <h4 className="text-base font-bold text-white font-heading leading-snug">
                    {proj.title}
                  </h4>

                  {/* Location & SDG */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="text-amber-400 font-medium flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1" /> {proj.district}, {proj.state}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-cyan-400 font-medium">{proj.sdg_goal}</span>
                  </div>

                  {/* AI Justification */}
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 space-y-1">
                    <span className="font-bold text-emerald-400 flex items-center">
                      <Sparkles className="w-3.5 h-3.5 mr-1" /> AI Urgency Rationale:
                    </span>
                    <p className="leading-relaxed text-slate-300">{proj.urgency_reason}</p>
                  </div>

                  {/* Beneficiaries & Budget */}
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800/60 text-xs">
                    <div>
                      <span className="block text-[10px] text-slate-400 uppercase font-semibold">Target Beneficiaries</span>
                      <span className="text-sm font-bold text-white font-mono">{proj.target_beneficiaries.toLocaleString('en-IN')} Citizens</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 uppercase font-semibold">Est. Budget</span>
                      <span className="text-sm font-bold text-emerald-400 font-mono">₹{proj.estimated_budget_inr} Lakhs (₹{(proj.estimated_budget_inr / 100).toFixed(2)} Cr)</span>
                    </div>
                  </div>

                </div>

                {/* Workflow Buttons */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Fuses <strong className="text-amber-400">{proj.matching_request_count} citizen inputs</strong>
                  </span>

                  <div className="flex space-x-2">
                    {proj.status === 'Proposed' && (
                      <button
                        onClick={() => onUpdateProjectStatus(proj.id, 'Approved')}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition flex items-center space-x-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve Project</span>
                      </button>
                    )}
                    {proj.status === 'Approved' && (
                      <button
                        onClick={() => onUpdateProjectStatus(proj.id, 'Work In Progress')}
                        className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition flex items-center space-x-1"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Allocate & Start Work</span>
                      </button>
                    )}
                    {proj.status === 'Work In Progress' && (
                      <span className="text-xs font-semibold text-emerald-400 flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Funds Allocated & Construction Active
                      </span>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Multilingual NLP Analytics */}
      {activeTab === 'nlp' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Category Demand Pie Chart */}
          <div className="lg:col-span-6 space-y-4">
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white font-heading flex items-center">
                <PieIcon className="w-4 h-4 text-amber-400 mr-2" />
                Citizen Demand Distribution by Category
              </h3>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="count"
                    >
                      {categoryChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-wrap justify-center gap-3 text-xs pt-2">
                {categoryChartData.map((cat, i) => (
                  <span key={cat.name} className="flex items-center space-x-1.5 text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></span>
                    <span>{cat.name} ({cat.count})</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Language Breakdown Bar Chart */}
          <div className="lg:col-span-6 space-y-4">
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white font-heading flex items-center">
                <BarChart3 className="w-4 h-4 text-emerald-400 mr-2" />
                Multilingual Voice & Chat Input Volume
              </h3>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={languageChartData}>
                    <XAxis dataKey="name" stroke="#64748B" fontSize={11} />
                    <YAxis stroke="#64748B" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px' }} />
                    <Bar dataKey="count" fill="#38BDF8" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <p className="text-xs text-slate-400 text-center">
                Inputs automatically parsed, auto-translated to English, and tagged with semantic embeddings.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Tab 4: DPI Impact & Budget Simulator */}
      {activeTab === 'simulator' && (
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white font-heading flex items-center">
              <Sliders className="w-5 h-5 text-cyan-400 mr-2" />
              Public Expenditure & Citizen Impact Simulator
            </h3>
            <p className="text-xs text-slate-400">
              Adjust public budget allocation sliders to simulate projected beneficiary reach and SDG impact score before policy execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Slider Controls */}
            <div className="md:col-span-7 space-y-6 bg-slate-950/70 p-6 rounded-xl border border-slate-800">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-300">Public Investment Budget (INR Lakhs)</span>
                  <span className="text-amber-400 font-mono text-sm font-bold">₹{budgetSimulatorVal} Lakhs (₹{(budgetSimulatorVal / 100).toFixed(2)} Cr)</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="250"
                  value={budgetSimulatorVal}
                  onChange={(e) => setBudgetSimulatorVal(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Primary Focus Sector</span>
                  <span className="text-slate-200 font-bold">Multi-sector Tribal Infrastructure</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Execution Horizon</span>
                  <span className="text-slate-200 font-bold">FY 2026 - Q3</span>
                </div>
              </div>
            </div>

            {/* Simulated Results Card */}
            <div className="md:col-span-5 space-y-4 p-6 rounded-xl bg-gradient-to-b from-emerald-950/50 to-slate-900 border border-emerald-500/30">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Simulated National Impact Outcome
              </h4>

              <div className="space-y-3">
                <div>
                  <span className="block text-[11px] text-slate-400">Projected Beneficiary Population</span>
                  <span className="text-2xl font-extrabold text-white font-mono">{simulatedBeneficiaries.toLocaleString('en-IN')} Citizens</span>
                </div>

                <div>
                  <span className="block text-[11px] text-slate-400">Predicted SDG Progress Index</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex-1 bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full transition-all duration-500 rounded-full"
                        style={{ width: `${simulatedSDGScore}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400">{simulatedSDGScore}/100</span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
                Simulated model estimates 88% reduction in waterborne disease distress in Kalahandi & Gadchiroli sub-districts.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
