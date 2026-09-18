import React, { useState } from 'react';
import { 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  X,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function HackathonDemoBar({ isOpen, onClose, onStepChange }) {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      step: 1,
      title: 'Citizen Input Selection',
      desc: 'Citizen selects Language: Hindi • State: Bihar • District: Purnia • Category: Road Infrastructure.',
      targetSection: 'voice-center'
    },
    {
      step: 2,
      title: 'Multilingual Feedback Submission',
      desc: 'Citizen speaks/types: "हमारे गांव की सड़क बारिश में खराब हो जाती है और स्कूल तक पहुंचना मुश्किल हो जाता है।"',
      targetSection: 'voice-center'
    },
    {
      step: 3,
      title: 'Multilingual AI Processing',
      desc: 'AI detects Hindi, auto-translates to English, identifies "Poor rural road connectivity", and tags Critical urgency.',
      targetSection: 'voice-center'
    },
    {
      step: 4,
      title: 'Indexed to Live Citizen Feed',
      desc: 'Request is assigned Ticket ID #JD-BR-1102 and appears with speech audio playback & community upvoting.',
      targetSection: 'hero'
    },
    {
      step: 5,
      title: 'Demand Analytics Inflow Update',
      desc: 'Roads sector volume increases to 38% of total demand with +21% monthly growth curve in Recharts.',
      targetSection: 'hotspots'
    },
    {
      step: 6,
      title: 'Purnia Surfaces as Demand Hotspot',
      desc: 'National GIS Heatmap clusters 1,284 requests around Purnia with 91/100 composite intensity.',
      targetSection: 'hotspots'
    },
    {
      step: 7,
      title: 'AI Priority Engine Ranking',
      desc: 'Purnia Rural Road Connectivity surfaces at #1 rank affecting 8,420 rural students.',
      targetSection: 'priority-engine'
    },
    {
      step: 8,
      title: 'Transparent "Why Prioritized?" Evidence',
      desc: 'Policymaker inspects 5-factor breakdown: Demand 92%, Deficit 88%, Impact 84%, Essential 95%, Trend 79%.',
      targetSection: 'priority-engine'
    },
    {
      step: 9,
      title: 'Policy Insight Synthesis',
      desc: 'AI synthesizes: "Road connectivity is emerging as highest-volume infrastructure concern across Kosi basin."',
      targetSection: 'policy-insights'
    },
    {
      step: 10,
      title: 'Actionable Development Recommendation',
      desc: 'Recommendation generated: "All-Weather Elevated Rural Connectivity Highway" ready for executive budget allocation.',
      targetSection: 'policy-insights'
    }
  ];

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < 10) {
      const next = currentStep + 1;
      setCurrentStep(next);
      const target = steps[next - 1].targetSection;
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      const target = steps[prev - 1].targetSection;
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const active = steps[currentStep - 1];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl animate-fadeIn">
      <div className="p-4 rounded-2xl bg-[#0A192F] text-white border-2 border-amber-400/80 shadow-2xl space-y-3">
        
        {/* Top Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded-md bg-amber-500 text-slate-950 font-bold text-10px">
              DEMO MODE
            </span>
            <span className="font-heading font-bold text-xs text-white">
              3-Minute Hackathon Presentation Walkthrough
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs font-bold text-amber-300">
              Step {currentStep} of 10
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Current Step Card */}
        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700 space-y-1">
          <h4 className="font-bold text-xs text-amber-300 flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            {active.title}
          </h4>
          <p className="text-11px text-slate-200 leading-relaxed">
            {active.desc}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => {
              setCurrentStep(1);
              const el = document.getElementById('hero');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center space-x-1 text-10px text-slate-400 hover:text-white"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Restart Demo</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs font-bold disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold shadow-md transition flex items-center space-x-1"
            >
              <span>{currentStep === 10 ? 'Finish Demo' : 'Next Step'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
