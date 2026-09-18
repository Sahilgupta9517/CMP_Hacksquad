import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  CheckCircle2, 
  Download, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Activity, 
  AlertTriangle, 
  FileText, 
  Check, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Radio,
  BarChart3
} from 'lucide-react';

export default function AIAnalysisScreen({ 
  submissionData 
}) {
  const navigate = useNavigate();
  const [loadingStep, setLoadingStep] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [reportDownloaded, setReportDownloaded] = useState(false);

  const loadingSteps = [
    'Understanding language & dialect vectors...',
    'Detecting infrastructure category & affected services...',
    'Identifying urgency level & safety vectors...',
    'Mapping district & geospatial demand cluster...',
    'Generating data-driven policy recommendation...'
  ];

  useEffect(() => {
    if (!submissionData) return;
    // Reset on new submission
    setLoadingStep(0);
    setAnalysisComplete(false);
    setReportDownloaded(false);
    // Futuristic loading cycle
    const timers = [];
    timers.push(setTimeout(() => setLoadingStep(1), 600));
    timers.push(setTimeout(() => setLoadingStep(2), 1300));
    timers.push(setTimeout(() => setLoadingStep(3), 2000));
    timers.push(setTimeout(() => setLoadingStep(4), 2700));
    timers.push(setTimeout(() => {
      setLoadingStep(5);
      setAnalysisComplete(true);
    }, 3400));

    return () => timers.forEach(t => clearTimeout(t));
  }, [submissionData]);

  // Empty state — no request submitted yet
  if (!submissionData) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 space-y-6 animate-fadeIn">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">No Citizen Request Selected</h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          Submit a citizen infrastructure request first, and the AI Analysis Engine will process it in real time.
        </p>
        <button
          onClick={() => navigate('/citizen')}
          className="inline-flex items-center space-x-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-glow-blue transition-all transform hover:-translate-y-0.5"
        >
          <Radio className="w-4 h-4" />
          <span>Submit a New Request</span>
        </button>
      </div>
    );
  }

  const resultData = {
    category: 'Road Infrastructure',
    urgency: 'High',
    district: submissionData?.district || 'Bahraich',
    state: submissionData?.state || 'Uttar Pradesh',
    language: submissionData?.language || 'Hindi',
    affectedPopulation: '2,450 Citizens',
    infrastructureGap: 'Poor Road Connectivity & Monsoon Flood Washout',
    confidence: '96%',
    summary: 'Multiple citizen complaints indicate severe road connectivity issues affecting emergency transportation, education access and daily mobility.',
    recommendation: 'Prioritize rural road rehabilitation in high-demand zones (Project 01 elevated culverts).',
    citizenText: submissionData?.feedbackText || 'हमारे गांव में सड़क बहुत खराब है और बारिश में एम्बुलेंस नहीं आ पाती।',
    englishTranslation: 'In our village the road is severely degraded and during rains emergency ambulances cannot reach.'
  };

  const handleDownloadReport = () => {
    const reportContent = `=====================================================
JANCONNECT AI — DIGITAL PUBLIC INFRASTRUCTURE REPORT
GOVERNMENT OF UTTAR PRADESH • SMART CIVIC INTELLIGENCE
=====================================================

TICKET ID: JD-UP-BAH-2026-942
TIMESTAMP: ${new Date().toISOString()}
DISTRICT: ${resultData.district}, ${resultData.state}
LANGUAGE DETECTED: ${resultData.language} (Confidence: ${resultData.confidence})

CITIZEN INPUT (ORIGINAL):
"${resultData.citizenText}"

STANDARDIZED AI ENGLISH TRANSLATION:
"${resultData.englishTranslation}"

INFRASTRUCTURE CLASSIFICATION:
- Sector Category: ${resultData.category}
- Urgency Rating: ${resultData.urgency} Priority
- Affected Population: ${resultData.affectedPopulation}
- Primary Infrastructure Deficit: ${resultData.infrastructureGap}

AI SYNTHESIS SUMMARY:
${resultData.summary}

GOVERNANCE RECOMMENDATION:
${resultData.recommendation}

PRIORITY SCORE: 94 / 100
(Formula: 40% Complaint Frequency + 25% Infra Gap + 20% Population + 15% Urgency)

=====================================================
Prototype Demonstration Report • Digital Public Good
=====================================================`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `JanConnect_AI_Report_${resultData.district}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setReportDownloaded(true);
    setTimeout(() => setReportDownloaded(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-14">
      
      {/* 1. LOADING PIPELINE STATE */}
      {!analysisComplete && (
        <div className="glass-panel p-8 sm:p-14 border border-blue-200/80 shadow-2xl text-center space-y-8">
          
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shadow-glow-blue">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              AI NLP & DPI Engine Active
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
              Processing Multilingual Citizen Submission
            </h2>
          </div>

          <div className="max-w-md mx-auto space-y-2.5 text-left text-xs bg-slate-50 p-5 rounded-20px border border-slate-200">
            {loadingSteps.map((step, idx) => (
              <div 
                key={idx}
                className={`flex items-center space-x-2.5 transition-all duration-300 ${
                  loadingStep > idx 
                    ? 'text-emerald-700 font-bold' 
                    : loadingStep === idx 
                    ? 'text-blue-700 font-bold animate-pulse' 
                    : 'text-slate-400 opacity-60'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{step}</span>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* 2. STRUCTURED RESULT CARD */}
      {analysisComplete && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-20px bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-xl">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold mb-1 backdrop-blur-md">
                <Check className="w-3.5 h-3.5" />
                <span>AI Vector Analysis Complete</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold font-heading">
                Structured Infrastructure Intelligence Result
              </h1>
              <p className="text-xs text-blue-100 mt-0.5">
                Ticket #JD-UP-BAH-2026-942 • Synchronized with National DPI Index
              </p>
            </div>

            <button
              onClick={handleDownloadReport}
              className="px-5 py-2.5 rounded-xl bg-white text-blue-900 font-bold text-xs shadow-md transition-all hover:bg-slate-50 flex items-center space-x-1.5 shrink-0"
            >
              <Download className="w-4 h-4 text-blue-600" />
              <span>{reportDownloaded ? 'Downloaded!' : 'Download AI Report'}</span>
            </button>
          </div>

          {/* Structured Intelligence Card */}
          <div className="glass-panel p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
            
            {/* Input & Translation Contrast Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-20px bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                  Citizen Input ({resultData.language})
                </span>
                <p className="text-xs font-semibold text-slate-900 italic leading-relaxed">
                  "{resultData.citizenText}"
                </p>
              </div>

              <div className="p-4 rounded-20px bg-blue-50/70 border border-blue-200 space-y-1">
                <span className="text-[10px] font-bold uppercase text-blue-700 tracking-wider">
                  AI Standardized English Translation
                </span>
                <p className="text-xs font-medium text-slate-800 leading-relaxed">
                  "{resultData.englishTranslation}"
                </p>
              </div>
            </div>

            {/* Structured Key-Value Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Category</span>
                <span className="text-sm font-bold text-blue-700 block">{resultData.category}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Urgency Rating</span>
                <span className="text-sm font-bold text-rose-600 block flex items-center">
                  <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                  {resultData.urgency} Priority
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                <span className="text-[10px] text-slate-500 font-bold block uppercase">District & State</span>
                <span className="text-sm font-bold text-slate-900 block">{resultData.district}, {resultData.state}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Confidence</span>
                <span className="text-sm font-bold text-cyan-600 font-mono block">{resultData.confidence}</span>
              </div>

            </div>

            {/* Affected Population & Gap */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Estimated Affected Population</span>
                <span className="text-base font-bold text-slate-900 font-mono mt-0.5 block">{resultData.affectedPopulation}</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Identified Infrastructure Deficit</span>
                <span className="text-sm font-bold text-slate-800 mt-0.5 block">{resultData.infrastructureGap}</span>
              </div>
            </div>

            {/* AI Summary */}
            <div className="p-4 rounded-20px bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-xs font-bold text-blue-900 flex items-center">
                <FileText className="w-4 h-4 text-blue-600 mr-1.5" />
                AI Executive Summary
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {resultData.summary}
              </p>
            </div>

            {/* AI Recommendation Box */}
            <div className="p-4 rounded-20px bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-200 space-y-1.5">
              <span className="text-xs font-bold text-emerald-900 flex items-center">
                <Sparkles className="w-4 h-4 text-emerald-600 mr-1.5" />
                Recommended Development Action
              </span>
              <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                "{resultData.recommendation}"
              </p>
            </div>

            {/* Bottom Next Step Actions */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <span className="text-[11px] text-slate-500 block">
                Data point automatically added to Bahraich Demand Hotspot Index
              </span>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/hotspots')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center space-x-2"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>View on Hotspot Map</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center space-x-2"
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>View Dashboard</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/citizen')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition flex items-center justify-center space-x-2"
                >
                  <span>Submit Another Request</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
