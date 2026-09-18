import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Activity, 
  Globe2, 
  ShieldCheck, 
  Layers, 
  CheckCircle, 
  Radio
} from 'lucide-react';

export default function HeroSection({ onScrollToVoice, onScrollToInsights, onStartDemo }) {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-12">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span>AI-powered • Multilingual • Data-driven • Digital Public Good</span>
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-11px font-bold">
            <span>🇮🇳 Indian GovTech Hackathon Ready</span>
          </div>
        </div>

        {/* Main Headline & Subheading */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A192F] font-heading tracking-tight leading-tight">
            Turning Citizen Voice into <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-amber-600">
              Smarter Public Infrastructure
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            JanDrishti AI aggregates multilingual citizen feedback, identifies infrastructure demand hotspots, and transforms public needs into transparent, data-driven policy insights.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8">
          <button
            onClick={onScrollToVoice}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-700/20 transition flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
          >
            <Radio className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Submit Citizen Request</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={onScrollToInsights}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm shadow-sm transition flex items-center justify-center space-x-2"
          >
            <Activity className="w-4 h-4 text-blue-700" />
            <span>Explore National Insights</span>
          </button>

          <button
            onClick={onStartDemo}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-sm shadow-sm transition flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>3-Min Interactive Demo</span>
          </button>
        </div>

        {/* Digital Public Good Feature Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12 pt-8 border-t border-slate-200">
          <div className="flex items-center space-x-2.5 p-2.5 rounded-lg bg-white border border-slate-200 shadow-sm">
            <Globe2 className="w-5 h-5 text-blue-600 shrink-0" />
            <div className="text-left">
              <span className="block text-xs font-bold text-slate-900">12 Indian Languages</span>
              <span className="block text-10px text-slate-500">Voice & text transcription</span>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 p-2.5 rounded-lg bg-white border border-slate-200 shadow-sm">
            <Layers className="w-5 h-5 text-amber-600 shrink-0" />
            <div className="text-left">
              <span className="block text-xs font-bold text-slate-900">GIS Demand Hotspots</span>
              <span className="block text-10px text-slate-500">District-level heat intensity</span>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 p-2.5 rounded-lg bg-white border border-slate-200 shadow-sm">
            <Sparkles className="w-5 h-5 text-indigo-600 shrink-0" />
            <div className="text-left">
              <span className="block text-xs font-bold text-slate-900">AI Priority Engine</span>
              <span className="block text-10px text-slate-500">Transparent 5-factor scoring</span>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 p-2.5 rounded-lg bg-white border border-slate-200 shadow-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="text-left">
              <span className="block text-xs font-bold text-slate-900">Digital Public Good</span>
              <span className="block text-10px text-slate-500">Interoperable state design</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
