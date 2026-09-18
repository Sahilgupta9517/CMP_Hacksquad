import React from 'react';
import { 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  Globe2, 
  Layers, 
  AlertOctagon, 
  CheckCircle,
  FileText
} from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

export default function AboutPage({ currentLanguage = 'English' }) {
  const t = TRANSLATIONS[currentLanguage]?.about || TRANSLATIONS['English'].about;

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-fadeIn pb-14">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
          <Building2 className="w-3.5 h-3.5 text-blue-600" />
          <span>Mission & Vision</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          {t.title}
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* 1. Problem & Solution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* The Problem */}
        <div className="glass-panel p-8 border border-rose-200/80 shadow-md space-y-4 bg-gradient-to-b from-rose-50/20 to-white">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 font-heading">
            {t.problemTitle}
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {t.problemDesc}
          </p>
          <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              <span>Fragmented, siloed citizen complaint channels</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              <span>No automated geospatial clustering for district magistrates</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              <span>Misaligned capital budgets and unaddressed rural deficits</span>
            </li>
          </ul>
        </div>

        {/* The Solution */}
        <div className="glass-panel p-8 border border-blue-200/80 shadow-md space-y-4 bg-gradient-to-b from-blue-50/20 to-white">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 font-heading">
            {t.solutionTitle}
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {t.solutionDesc}
          </p>
          <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span>Multilingual voice, text, and messaging aggregation</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span>Automated demand hotspot mapping & deficit fusion</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span>Transparent mathematical priority scoring (0–100)</span>
            </li>
          </ul>
        </div>

      </div>

      {/* 2. Key Innovations Grid */}
      <div className="glass-panel p-8 border border-slate-200/90 shadow-lg space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-heading">
            {t.innovationTitle}
          </h2>
          <p className="text-xs text-slate-500">
            Pioneering digital public goods architecture tailored for Indian governance
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          
          <div className="p-4 rounded-20px bg-slate-50 border border-slate-200 space-y-2">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-800 w-fit font-bold">
              <Globe2 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Multilingual AI</h3>
            <p className="text-slate-600 leading-relaxed">
              Standardizes inputs across Hindi, English, and regional Indian languages with automatic dialect parsing.
            </p>
          </div>

          <div className="p-4 rounded-20px bg-slate-50 border border-slate-200 space-y-2">
            <div className="p-2 rounded-xl bg-cyan-100 text-cyan-800 w-fit font-bold">
              <Users className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Voice + Text Feedback</h3>
            <p className="text-slate-600 leading-relaxed">
              Enables non-literate and rural citizens to voice their concerns via simple audio recording or WhatsApp bots.
            </p>
          </div>

          <div className="p-4 rounded-20px bg-slate-50 border border-slate-200 space-y-2">
            <div className="p-2 rounded-xl bg-rose-100 text-rose-800 w-fit font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Hotspot Detection</h3>
            <p className="text-slate-600 leading-relaxed">
              Dynamic geospatial clustering flags critical demand zones before infrastructural bottlenecks escalate.
            </p>
          </div>

          <div className="p-4 rounded-20px bg-slate-50 border border-slate-200 space-y-2">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 w-fit font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Priority Recommendation Engine</h3>
            <p className="text-slate-600 leading-relaxed">
              Translates qualitative citizen complaints into quantifiable, audit-compliant capital work orders.
            </p>
          </div>

          <div className="p-4 rounded-20px bg-slate-50 border border-slate-200 space-y-2">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800 w-fit font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Smart Governance Dashboard</h3>
            <p className="text-slate-600 leading-relaxed">
              Real-time executive decision cockpit for district collectors, chief secretaries, and ministry planners.
            </p>
          </div>

          <div className="p-4 rounded-20px bg-slate-50 border border-slate-200 space-y-2">
            <div className="p-2 rounded-xl bg-purple-100 text-purple-800 w-fit font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Digital Public Good Prototype</h3>
            <p className="text-slate-600 leading-relaxed">
              Open standards and interoperable API schemas designed for rapid deployment across all Indian states.
            </p>
          </div>

        </div>
      </div>

      {/* 3. Governance Impact */}
      <div className="p-8 rounded-28px bg-gradient-to-r from-[#060B16] to-[#15213D] text-white space-y-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
            Outcomes & ROI
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-heading">
            {t.impactTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-base font-bold text-cyan-400 block font-heading">Faster Decision Support</span>
            <p className="text-slate-300 text-11px leading-relaxed">
              Cuts infrastructure planning review cycle from 9 months to under 14 days.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-base font-bold text-cyan-400 block font-heading">Targeted Public Spending</span>
            <p className="text-slate-300 text-11px leading-relaxed">
              Ensures public funds directly address citizen distress hotspots with highest socioeconomic ROI.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-base font-bold text-cyan-400 block font-heading">Citizen Inclusion</span>
            <p className="text-slate-300 text-11px leading-relaxed">
              Overcomes digital literacy barriers by accepting native dialect voice inputs.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-base font-bold text-cyan-400 block font-heading">Data-Driven Governance</span>
            <p className="text-slate-300 text-11px leading-relaxed">
              Replaces anecdotal guesswork with transparent, mathematical prioritization.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
