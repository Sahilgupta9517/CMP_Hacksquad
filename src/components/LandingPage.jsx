import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Activity, 
  Radio, 
  ShieldCheck, 
  Zap, 
  Droplet, 
  Building, 
  Cross, 
  TrendingUp,
  Cpu,
  CheckCircle,
  Network
} from 'lucide-react';
import { STATS_DATA, TIMELINE_DATA } from '../data/mockData';
import { TRANSLATIONS } from '../utils/translations';

export default function LandingPage({ 
  onExplore, 
  onSubmitFeedback, 
  currentLanguage = 'English' 
}) {
  const t = TRANSLATIONS[currentLanguage]?.hero || TRANSLATIONS['English'].hero;

  const statItems = [
    {
      id: 'feedback',
      label: t.kpis.feedback,
      value: '1,248',
      trend: '+24% this month',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    },
    {
      id: 'critical',
      label: t.kpis.critical,
      value: '327',
      trend: 'High Priority',
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'border-rose-200'
    },
    {
      id: 'hotspots',
      label: t.kpis.hotspots,
      value: '18',
      trend: 'Identified',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200'
    },
    {
      id: 'accuracy',
      label: t.kpis.accuracy,
      value: '96%',
      trend: 'Vector Match',
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
      border: 'border-cyan-200'
    }
  ];

  return (
    <div className="space-y-16 pb-12 animate-fadeIn">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#060B16] via-[#0E172A] to-[#15213D] text-white p-5 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl">
        
        {/* Futuristic Background Glow Elements */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 left-1/3 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-25"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          {/* Top Innovation Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold shadow-glow-cyan backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>{t.badge}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight leading-tight">
            {t.title1} <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
              {t.title2}
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            {t.subtitle}
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onExplore}
              className="w-full sm:w-auto px-8 py-4 rounded-20px bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-glow-blue transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <span>{t.exploreBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onSubmitFeedback}
              className="w-full sm:w-auto px-8 py-4 rounded-20px bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm shadow-sm transition flex items-center justify-center space-x-2 backdrop-blur-md"
            >
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>{t.submitBtn}</span>
            </button>
          </div>

        </div>

        {/* Floating Infrastructure Node Illustrations */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-14 pt-10 border-t border-slate-800/80">
          
          <div className="p-3.5 rounded-20px bg-slate-900/60 border border-slate-800 backdrop-blur-sm flex flex-col items-center text-center space-y-1.5 transition-transform hover:scale-105">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-sm">
              <Layers className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-white">Roads & Bridges</span>
            <span className="text-[10px] text-slate-400 font-mono">482 Inputs</span>
          </div>

          <div className="p-3.5 rounded-20px bg-slate-900/60 border border-slate-800 backdrop-blur-sm flex flex-col items-center text-center space-y-1.5 transition-transform hover:scale-105">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm">
              <Droplet className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-white">Water Supply</span>
            <span className="text-[10px] text-slate-400 font-mono">324 Inputs</span>
          </div>

          <div className="p-3.5 rounded-20px bg-slate-900/60 border border-slate-800 backdrop-blur-sm flex flex-col items-center text-center space-y-1.5 transition-transform hover:scale-105">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-sm">
              <Cross className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-white">Hospitals</span>
            <span className="text-[10px] text-slate-400 font-mono">218 Inputs</span>
          </div>

          <div className="p-3.5 rounded-20px bg-slate-900/60 border border-slate-800 backdrop-blur-sm flex flex-col items-center text-center space-y-1.5 transition-transform hover:scale-105">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-sm">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-white">Electricity</span>
            <span className="text-[10px] text-slate-400 font-mono">126 Inputs</span>
          </div>

          <div className="p-3.5 rounded-20px bg-slate-900/60 border border-slate-800 backdrop-blur-sm flex flex-col items-center text-center space-y-1.5 transition-transform hover:scale-105">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
              <Building className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-white">Govt Buildings</span>
            <span className="text-[10px] text-slate-400 font-mono">98 Inputs</span>
          </div>

          <div className="p-3.5 rounded-20px bg-slate-900/60 border border-slate-800 backdrop-blur-sm flex flex-col items-center text-center space-y-1.5 transition-transform hover:scale-105">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-sm">
              <Network className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-white">AI DPI Nodes</span>
            <span className="text-[10px] text-slate-400 font-mono">100% Synced</span>
          </div>

        </div>

      </section>

      {/* 2. STATISTICS SECTION (4 High-Impact KPI Cards) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            DPI Impact Aggregation Counters
          </span>
          <span className="text-[10px] text-blue-600 font-mono font-bold bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
            Prototype Demonstration Dataset
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statItems.map((stat) => (
            <div
              key={stat.id}
              className="glass-panel p-6 glass-card-hover flex flex-col justify-between border border-slate-200/80"
            >
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {stat.label}
              </span>

              <div className="my-2">
                <div className={`text-3xl sm:text-4xl font-extrabold font-heading font-mono ${stat.color}`}>
                  {stat.value}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <span className="text-slate-600 font-medium">{stat.trend}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. INNOVATION TIMELINE SECTION */}
      <section className="glass-panel p-8 sm:p-10 border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wide text-blue-600 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>National DPI Innovation Roadmap</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
              How JanConnect AI Scales Across India
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            FY 2026 Innovation Phases
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
          {TIMELINE_DATA.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-20px bg-slate-50/80 border border-slate-200/90 space-y-3 relative group hover:border-blue-300 transition"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-10px font-bold font-mono bg-blue-100 text-blue-800">
                  {item.phase}
                </span>
                <span className="text-10px font-mono text-slate-500">{item.year}</span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 font-heading leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>

              <div className="pt-2 flex items-center space-x-1.5 text-[11px] font-bold text-emerald-700">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
