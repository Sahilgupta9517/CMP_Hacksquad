import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Radio,
  Layers,
  Activity,
  ShieldCheck,
  Zap,
  Droplet,
  Building,
  TrendingUp,
  Cpu,
  Network,
  Globe2,
  Users,
  MapPin,
  BarChart3,
  FileText,
  CheckCircle,
  ChevronRight,
  MessageSquare
} from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  const kpiItems = [
    { label: 'Citizen Requests', value: '12,840', icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
    { label: 'Demand Hotspots', value: '742', icon: MapPin, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200' },
    { label: 'States / UTs', value: '28', icon: Globe2, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    { label: 'Infrastructure Gaps', value: '64', icon: Activity, color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-200' }
  ];

  const howItWorks = [
    { step: '01', title: 'Citizen Voice', desc: 'Citizens submit feedback in their preferred language via voice, text, or WhatsApp.', icon: Radio, color: 'from-blue-500 to-indigo-600' },
    { step: '02', title: 'Multilingual AI', desc: 'AI translates, categorizes, and structures the input into actionable civic data.', icon: Cpu, color: 'from-indigo-500 to-purple-600' },
    { step: '03', title: 'Structured Civic Data', desc: 'Raw feedback becomes structured records with location, category, urgency, and priority.', icon: Layers, color: 'from-purple-500 to-pink-600' },
    { step: '04', title: 'Demand Intelligence', desc: 'AI aggregates patterns to identify demand hotspots and infrastructure gaps.', icon: BarChart3, color: 'from-pink-500 to-rose-600' },
    { step: '05', title: 'Policy Insights', desc: 'Data-driven recommendations help planners make transparent, evidence-based decisions.', icon: TrendingUp, color: 'from-rose-500 to-orange-600' }
  ];

  const features = [
    { title: 'Citizen Portal', desc: 'Submit infrastructure concerns in any Indian language.', icon: MessageSquare, route: '/citizen', color: 'from-blue-500 to-cyan-500' },
    { title: 'AI Analysis', desc: 'Real-time AI processing of citizen requests.', icon: Cpu, route: '/analysis', color: 'from-indigo-500 to-purple-500' },
    { title: 'Intelligence Dashboard', desc: 'Aggregated analytics for governance planning.', icon: BarChart3, route: '/dashboard', color: 'from-purple-500 to-pink-500' },
    { title: 'Demand Hotspots', desc: 'Geographic concentrations of infrastructure needs.', icon: MapPin, route: '/hotspots', color: 'from-rose-500 to-orange-500' },
    { title: 'Policy Recommendations', desc: 'AI-generated evidence-based policy insights.', icon: FileText, route: '/recommendations', color: 'from-amber-500 to-yellow-500' },
    { title: 'State Network', desc: 'Pan-India DPI interoperability across 28 states.', icon: Network, route: '/dashboard', color: 'from-emerald-500 to-teal-500' }
  ];

  const badges = [
    { label: 'AI-Powered', icon: Sparkles },
    { label: 'Multilingual', icon: Globe2 },
    { label: 'Citizen-First', icon: Users },
    { label: 'Digital Public Good', icon: ShieldCheck }
  ];

  return (
    <div className="space-y-20 pb-16 animate-fadeIn">

      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#060B16] via-[#0E172A] to-[#15213D] text-white p-6 sm:p-12 lg:p-20 border border-slate-800 shadow-2xl">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 left-1/3 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-25"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-7">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold shadow-glow-cyan backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>National DPI Innovation • JanConnect AI</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight leading-tight">
            Turning Citizen Voice into <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
              Smarter Public Infrastructure
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            JanConnect AI uses multilingual AI to transform citizen feedback into structured infrastructure intelligence, demand hotspots, and transparent policy insights.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('/citizen')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-glow-blue transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              <span>Submit a Citizen Request</span>
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm shadow-sm transition flex items-center justify-center space-x-2 backdrop-blur-md"
            >
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>Explore Intelligence</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            {badges.map((badge) => (
              <div key={badge.label} className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-700/80 text-xs font-semibold text-slate-300 backdrop-blur-sm">
                <badge.icon className="w-3.5 h-3.5 text-cyan-400" />
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== KPI SECTION ===== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            DPI Impact Aggregation
          </span>
          <span className="text-[10px] text-amber-600 font-mono font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            Prototype Data
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {kpiItems.map((kpi) => (
            <div key={kpi.label} className={`glass-panel p-5 sm:p-6 glass-card-hover flex flex-col justify-between border ${kpi.border}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{kpi.label}</span>
                <div className={`w-8 h-8 rounded-xl ${kpi.bg} flex items-center justify-center`}>
                  <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
              </div>
              <div className={`text-3xl sm:text-4xl font-extrabold font-heading font-mono ${kpi.color}`}>
                {kpi.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wide text-blue-600">
            <Sparkles className="w-3.5 h-3.5" />
            <span>How JanConnect AI Works</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            From Citizen Voice to Policy Intelligence
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            A 5-step AI pipeline that transforms multilingual citizen feedback into structured governance insights.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {howItWorks.map((item, idx) => (
            <div key={item.step} className="relative group">
              <div className="glass-panel p-5 text-center space-y-3 h-full border border-slate-200/80 hover:border-blue-300 transition">
                <div className={`w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="block text-[10px] font-mono font-bold text-slate-400">STEP {item.step}</span>
                <h3 className="text-sm font-bold text-slate-900 font-heading">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
              {idx < howItWorks.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 text-slate-300">
                  <ChevronRight className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURE CARDS ===== */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            Platform Modules
          </h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Explore the integrated modules powering India's citizen-first infrastructure intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <button
              key={feature.title}
              onClick={() => navigate(feature.route)}
              className="glass-panel p-6 text-left space-y-4 border border-slate-200/80 hover:border-blue-300 transition group glass-card-hover"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">{feature.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{feature.desc}</p>
              </div>
              <div className="flex items-center text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition">
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0E172A] via-[#162036] to-[#1a2744] text-white p-8 sm:p-14 text-center border border-slate-800 shadow-xl">
        <div className="absolute -top-20 right-0 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 left-0 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-5 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">
            Ready to Transform Governance?
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Experience how AI-powered citizen feedback can drive transparent and data-driven infrastructure planning across India.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('/citizen')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-glow-blue transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <Radio className="w-4 h-4" />
              <span>Submit a Citizen Request</span>
            </button>
            <button
              onClick={() => navigate('/about')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm transition flex items-center justify-center space-x-2"
            >
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
