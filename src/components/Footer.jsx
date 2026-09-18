import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Globe2, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#060B16] text-slate-300 border-t border-slate-800 pt-12 pb-8 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-8 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-sm">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="font-heading font-extrabold text-lg text-white">
                JanConnect <span className="text-cyan-400">AI</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Transforming Citizen Voices into Smarter Infrastructure Decisions through Multilingual AI & Digital Public Infrastructure.
            </p>
            <div className="flex items-center space-x-2 text-11px text-cyan-400 pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Conceived as an Open Source Digital Public Good Prototype</span>
            </div>
          </div>

          {/* Quick Platform Pages */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Platform Modules
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => navigate('/citizen')} className="hover:text-cyan-400 transition">Citizen Portal</button></li>
              <li><button onClick={() => navigate('/analysis')} className="hover:text-cyan-400 transition">AI Analysis Engine</button></li>
              <li><button onClick={() => navigate('/dashboard')} className="hover:text-cyan-400 transition">Intelligence Dashboard</button></li>
              <li><button onClick={() => navigate('/hotspots')} className="hover:text-cyan-400 transition">Demand Hotspots Map</button></li>
              <li><button onClick={() => navigate('/recommendations')} className="hover:text-cyan-400 transition">AI Recommendations</button></li>
            </ul>
          </div>

          {/* Innovation & Standards */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Architecture & Tech
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><span>Multilingual ASR & NMT</span></li>
              <li><span>React • Vite • TypeScript</span></li>
              <li><span>Tailwind CSS • Recharts</span></li>
              <li><span>4-Factor Priority Algorithm</span></li>
              <li><button onClick={() => navigate('/about')} className="hover:text-cyan-400 transition">About System Design</button></li>
            </ul>
          </div>

        </div>

        {/* Bottom Notice & Disclaimer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-11px text-slate-500">
          <div>
            <span>JanConnect AI © 2026 • Digital Public Infrastructure Innovation Prototype</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-amber-400 font-semibold">
              Prototype Demonstration Dataset • Hackathon Demonstration
            </span>
            <span>•</span>
            <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); navigate('/'); }} className="hover:text-slate-300 transition">Back to Top ↑</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
