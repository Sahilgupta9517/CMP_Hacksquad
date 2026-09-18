import React from 'react';
import { 
  Radio, 
  Mic, 
  Languages, 
  Cpu, 
  Layers, 
  Sparkles, 
  Activity, 
  ArrowRight, 
  ArrowDown, 
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export default function WorkflowVisualization() {
  const pipelineSteps = [
    {
      step: '01',
      title: 'Citizen Voice',
      desc: 'Multilingual inputs via Voice, Text, and WhatsApp from citizens in rural and urban blocks.',
      icon: Radio,
      badge: 'Input Source',
      color: 'from-blue-600 to-indigo-600',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      step: '02',
      title: 'Text / Voice Input',
      desc: 'Real-time audio speech-to-text transcription and text normalization across 12 Indian dialects.',
      icon: Mic,
      badge: 'Ingestion Layer',
      color: 'from-indigo-600 to-purple-600',
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      step: '03',
      title: 'Language Detection',
      desc: 'Automated language identification and standardized translation into English semantic vectors.',
      icon: Languages,
      badge: 'NMT Engine',
      color: 'from-purple-600 to-cyan-600',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      step: '04',
      title: 'AI Classification',
      desc: 'NLP deep classification tagging infrastructure sector (Roads, Water, Health, Power, Sanitation).',
      icon: Cpu,
      badge: 'Classification',
      color: 'from-cyan-600 to-blue-600',
      iconColor: 'text-cyan-600',
      bgColor: 'bg-cyan-50'
    },
    {
      step: '05',
      title: 'Infrastructure Intelligence',
      desc: 'Fusing citizen demand with census demographic deficit and BharatNet optical fiber coverage.',
      icon: Layers,
      badge: 'Geospatial GIS',
      color: 'from-blue-600 to-emerald-600',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      step: '06',
      title: 'Priority Engine',
      desc: 'Transparent 4-factor scoring: 40% Complaint Freq + 25% Gap + 20% Population + 15% Urgency.',
      icon: Sparkles,
      badge: 'Scoring Algorithm',
      color: 'from-emerald-600 to-amber-600',
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      step: '07',
      title: 'Government Dashboard',
      desc: 'Actionable ranked infrastructure capital projects for district magistrates and state ministries.',
      icon: Activity,
      badge: 'Decision Support',
      color: 'from-amber-600 to-rose-600',
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-14">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>System Architecture & Pipeline</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
          AI Workflow Visualization
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          How JanConnect AI converts raw, unstructured multilingual citizen distress calls into data-driven government work orders.
        </p>
      </div>

      {/* Connected Nodes Pipeline Container */}
      <div className="glass-panel p-6 sm:p-10 border border-slate-200/90 shadow-xl bg-white space-y-8">
        
        {/* Step-by-Step Flow Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 items-stretch relative">
          {pipelineSteps.map((node, idx) => {
            const Icon = node.icon;
            return (
              <div 
                key={node.step} 
                className="flex flex-col justify-between p-4 rounded-20px bg-slate-50/80 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group relative"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-10px font-bold font-mono text-slate-400">
                      STEP {node.step}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                      {node.badge}
                    </span>
                  </div>

                  <div className={`w-10 h-10 rounded-xl ${node.bgColor} flex items-center justify-center ${node.iconColor} group-hover:scale-110 transition-transform shadow-sm`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-900 font-heading">
                      {node.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      {node.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/60 mt-3 flex items-center justify-between text-[10px] text-emerald-700 font-bold">
                  <span>Verified</span>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="p-4 rounded-20px bg-gradient-to-r from-blue-900 to-[#0A0F1D] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold font-heading text-white">
                Interoperable Digital Public Good Protocol
              </h4>
              <p className="text-[11px] text-slate-300">
                Designed for 1-click state portal integration with open API schemas.
              </p>
            </div>
          </div>
          <span className="text-11px font-mono text-cyan-300 font-semibold px-3 py-1 rounded-full bg-slate-800/80 border border-cyan-800">
            End-to-End Latency: &lt; 900ms
          </span>
        </div>

      </div>

    </div>
  );
}
