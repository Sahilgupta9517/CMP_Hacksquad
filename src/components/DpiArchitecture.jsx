import React from 'react';
import { 
  Layers, 
  ArrowRight, 
  ArrowDown, 
  Mic, 
  Languages, 
  Database, 
  MapPin, 
  Sparkles, 
  FileText, 
  ShieldCheck,
  CheckCircle
} from 'lucide-react';

export default function DpiArchitecture() {
  const steps = [
    {
      id: '1',
      title: 'Citizen Input',
      sub: 'Voice, Text, WhatsApp & SMS in 12 Languages',
      icon: Mic,
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      id: '2',
      title: 'Multilingual AI Layer',
      sub: 'ASR Speech-to-Text, NMT Translation & Embeddings',
      icon: Languages,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      id: '3',
      title: 'Standardization',
      sub: 'Location Geotagging, Category & Urgency Vectorization',
      icon: Layers,
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      id: '4',
      title: 'Shared DPI Data Layer',
      sub: 'Supabase / Open Public API / State Connectors',
      icon: Database,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: '5',
      title: 'Demand Hotspots',
      sub: 'GIS Heatmap Clustering & Demographic Fusion',
      icon: MapPin,
      color: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    {
      id: '6',
      title: 'AI Priority Engine',
      sub: 'Transparent 5-Factor Composite Scoring (0-100)',
      icon: Sparkles,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      id: '7',
      title: 'Policy Action',
      sub: 'Actionable Public Infrastructure Recommendations',
      icon: FileText,
      color: 'bg-blue-900 text-white border-blue-800'
    }
  ];

  return (
    <section className="mb-14">
      
      {/* Header */}
      <div className="flex flex-col sm-flex-row sm-items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <Layers className="w-5 h-5 text-indigo-700" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#0A192F] font-heading">
              DIGITAL PUBLIC GOOD ARCHITECTURE
            </h2>
          </div>
          <p className="text-sm text-slate-600">
            End-to-end open architecture transforming citizen voice into national policy action
          </p>
        </div>

        <span className="gov-badge gov-badge-blue">
          Interoperable DPG Protocol
        </span>
      </div>

      {/* Pipeline Container */}
      <div className="gov-card p-6 border border-slate-200 bg-white shadow-sm space-y-6">
        
        {/* Desktop Pipeline Flow */}
        <div className="grid grid-cols-1 md-grid-cols-7 gap-2 items-center">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center text-center p-3 rounded-xl border bg-slate-50/70 border-slate-200 h-full justify-between space-y-2 group hover:border-blue-300 transition">
                  <div className={`p-2.5 rounded-xl border ${s.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-900 font-heading leading-snug">
                      {s.title}
                    </span>
                    <span className="block text-10px text-slate-500 mt-0.5 leading-tight">
                      {s.sub}
                    </span>
                  </div>
                </div>

                {/* Arrow Connector (between items) */}
                {idx < steps.length - 1 && (
                  <div className="hidden md-flex justify-center text-slate-400">
                    <ArrowRight className="w-4 h-4 text-blue-600 shrink-0" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Footer Guarantee Ribbon */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-50 via-slate-50 to-emerald-50 border border-slate-200 flex flex-col sm-flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-slate-800 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Designed for interoperable deployment across all 28 Indian States & Union Territories.</span>
          </div>
          <span className="text-10px font-mono text-slate-500">
            Compliant with India Digital Public Infrastructure Standards
          </span>
        </div>

      </div>

    </section>
  );
}
