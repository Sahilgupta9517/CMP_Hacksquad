import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Globe, 
  Bell, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

export default function Navbar({ 
  currentLanguage, 
  setCurrentLanguage,
  notificationCount = 3 
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS['English'];

  const navItems = [
    { id: 'home', label: t.nav.home, path: '/' },
    { id: 'portal', label: t.nav.citizenPortal, path: '/citizen' },
    { id: 'analysis', label: t.nav.aiAnalysis, path: '/analysis' },
    { id: 'dashboard', label: t.nav.intelligenceDashboard, path: '/dashboard' },
    { id: 'hotspots', label: t.nav.hotspots, path: '/hotspots' },
    { id: 'recommendations', label: t.nav.recommendations, path: '/recommendations' },
    { id: 'about', label: t.nav.about, path: '/about' }
  ];

  const languages = [
    { code: 'English', label: 'English' },
    { code: 'हिन्दी', label: 'हिन्दी (Hindi)' },
    { code: 'বাংলা', label: 'বাংলা (Bengali)' },
    { code: 'मराठी', label: 'मराठी (Marathi)' },
    { code: 'தமிழ்', label: 'தமிழ் (Tamil)' },
    { code: 'తెలుగు', label: 'తెలుగు (Telugu)' }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0F1D]/90 backdrop-blur-xl border-b border-slate-800 text-white shadow-lg">
      {/* Top Innovation Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-600"></div>

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Tagline */}
          <div 
            onClick={() => navigate('/')}
            className="flex items-center space-x-3.5 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-20px bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 p-0.5 shadow-glow-blue flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#0A0F1D] rounded-[18px] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                  JanConnect <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">AI</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  DPI GovTech
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-normal hidden sm:block max-w-xs truncate">
                Transforming Citizen Voices into Smarter Infrastructure Decisions
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive(item.path)
                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-3">
            
            {/* Language Selector Dropdown (Hidden on very small screens) */}
            <div className="relative hidden sm:flex items-center">
              <Globe className="w-4 h-4 text-cyan-400 absolute left-3 pointer-events-none" />
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs font-medium text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer transition shadow-sm"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-slate-900 text-white">
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 transition relative"
                title="GovTech Alerts"
              >
                <Bell className="w-4 h-4" />
                {notificationCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-glow-cyan animate-pulse"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-slate-900 border border-slate-700/90 rounded-20px shadow-2xl p-4 z-50 animate-fadeIn">
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Infrastructure Alerts
                    </span>
                    <span className="text-[10px] text-cyan-400 font-mono font-bold bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-800">
                      3 Urgent
                    </span>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border-l-2 border-rose-500">
                      <p className="font-bold text-slate-200">Bahraich Hotspot Escalation</p>
                      <span className="text-[11px] text-slate-400">Rural road washouts increased +24%</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border-l-2 border-amber-500">
                      <p className="font-bold text-slate-200">Prayagraj Water Quality Alert</p>
                      <span className="text-[11px] text-slate-400">104 citizen complaints regarding tube-wells</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border-l-2 border-blue-500">
                      <p className="font-bold text-slate-200">Priority Project Recommendation</p>
                      <span className="text-[11px] text-slate-400">Project 01 elevated culvert project ready</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 p-0.5 shadow-sm">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-cyan-300 font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
              </div>
              <div className="hidden md:block text-left text-xs">
                <span className="block font-bold text-white leading-tight">Admin Executive</span>
                <span className="block text-[10px] text-cyan-400 font-mono">DPI Smart Governance</span>
              </div>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-800 space-y-1.5 animate-fadeIn">
            <div className="px-4 py-2 sm:hidden mb-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1">Language</label>
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="w-full pl-3 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs font-medium text-slate-200 focus:outline-none focus:border-cyan-400 transition"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive(item.path)
                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

      </div>
    </header>
  );
}
