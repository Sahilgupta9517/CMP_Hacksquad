import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Eye, 
  X,
  ExternalLink
} from 'lucide-react';
import { dataService } from '../services/dataService';

export default function PolicyInsightsSection() {
  const [evidenceModalOpen, setEvidenceModalOpen] = useState(false);
  const insights = dataService.getPolicyInsights();

  return (
    <section id="policy-insights" className="mb-14 scroll-mt-20">
      
      {/* Section Header */}
      <div className="flex flex-col sm-flex-row sm-items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <FileText className="w-5 h-5 text-blue-700" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#0A192F] font-heading">
              AI POLICY INSIGHTS & RECOMMENDATIONS
            </h2>
          </div>
          <p className="text-sm text-slate-600">
            Translating unstructured multilingual public demand into strategic policymaker action items
          </p>
        </div>

        <span className="gov-badge gov-badge-saffron">
          Strategic Policy Synthesis
        </span>
      </div>

      {/* Main Grid: Policy Insights & Development Recommendation */}
      <div className="grid grid-cols-1 lg-grid-cols-12 gap-8">
        
        {/* Left: 3 Structured Policy Insights (7 cols) */}
        <div className="lg-col-span-7 space-y-4">
          <div className="space-y-4">
            {insights.map((item) => (
              <div
                key={item.id}
                className="gov-card p-5 border border-slate-200 bg-white hover:border-blue-300 transition space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center font-mono">
                      {item.number}
                    </span>
                    <span className="text-10px font-bold uppercase tracking-wider text-slate-500">
                      {item.district}
                    </span>
                  </div>
                  <span className="text-10px font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    High Confidence
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#0A192F] font-heading leading-snug">
                  "{item.title}"
                </h3>

                {/* Evidence Metrics */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                  <div>
                    <span className="text-10px text-slate-500 block">Volume</span>
                    <strong className="text-slate-900">{item.evidence.requests}</strong>
                  </div>
                  <div>
                    <span className="text-10px text-slate-500 block">Growth</span>
                    <strong className="text-emerald-700">{item.evidence.growth}</strong>
                  </div>
                  <div>
                    <span className="text-10px text-slate-500 block">Context</span>
                    <strong className="text-slate-800 text-11px">{item.evidence.demographics}</strong>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100 text-xs text-blue-950">
                  <span className="font-bold text-blue-800 block text-10px uppercase tracking-wide">
                    Recommended Policy Intervention:
                  </span>
                  <p className="mt-0.5">{item.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Flagship AI Development Recommendation Card (5 cols) */}
        <div className="lg-col-span-5 space-y-4">
          <div className="gov-card p-6 border-2 border-indigo-300 shadow-md bg-gradient-to-b from-white to-blue-50/40 space-y-4 flex flex-col justify-between h-full">
            
            <div className="space-y-4">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-indigo-700" />
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-900">
                    AI Development Recommendation
                  </span>
                </div>
                <span className="gov-badge gov-badge-critical">
                  Top Priority
                </span>
              </div>

              {/* Project & Target */}
              <div className="space-y-1">
                <span className="text-10px font-bold uppercase text-slate-500 tracking-wider">Project Proposal</span>
                <h3 className="text-base font-bold text-[#0A192F] font-heading">
                  Rural Road Connectivity Improvement & Elevated Culverts
                </h3>
                <span className="inline-block text-xs font-semibold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                  Target: Purnia District, Bihar
                </span>
              </div>

              {/* WHY Bullets */}
              <div className="space-y-1.5 text-xs">
                <span className="text-10px font-bold text-slate-700 uppercase tracking-wide">
                  Why This Recommendation:
                </span>
                <ul className="space-y-1 text-slate-700 pl-4 list-disc text-11px">
                  <li><strong>High citizen demand:</strong> 1,284 aggregated voice & text inputs</li>
                  <li><strong>Significant infrastructure gap:</strong> Severe monsoon river flooding cutoffs</li>
                  <li><strong>High service impact:</strong> Directly affects 42 rural secondary schools</li>
                  <li><strong>Strong recent growth:</strong> +21% surge in citizen distress reports</li>
                </ul>
              </div>

              {/* Expected Impact */}
              <div className="p-3 rounded-xl bg-white border border-indigo-100 shadow-sm space-y-1.5 text-xs">
                <span className="text-10px font-bold text-indigo-900 uppercase tracking-wide">
                  Expected Impact Deliverables:
                </span>
                <div className="grid grid-cols-2 gap-2 text-11px font-medium text-slate-800">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>School Access</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Healthcare Transit</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Agricultural Markets</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Public Mobility</span>
                  </div>
                </div>
              </div>

            </div>

            {/* View Evidence Action Button */}
            <div className="pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setEvidenceModalOpen(true)}
                className="w-full py-3 rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs shadow-md shadow-indigo-700/20 transition flex items-center justify-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>View Evidence & Citizen Feedback</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* VIEW EVIDENCE MODAL */}
      {evidenceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="gov-card p-6 border border-slate-200 shadow-2xl max-w-2xl w-full bg-white space-y-4 max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-10px font-bold uppercase tracking-wider text-blue-700">
                  Evidence Repository
                </span>
                <h3 className="text-lg font-bold text-[#0A192F] font-heading">
                  Purnia District Infrastructure Evidence
                </h3>
              </div>
              <button
                onClick={() => setEvidenceModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900">1. Citizen Voice Sample (Ticket: JD-BR-1102)</span>
                <p className="text-slate-700 italic">
                  "कोसी नदी के बाढ़ के कारण मुख्य सड़क पूरी तरह कट गई है। बच्चे पिछले 3 महीने से स्कूल नहीं जा पा रहे हैं।"
                </p>
                <p className="text-11px text-blue-700 font-medium">
                  AI Translation: "Main road completely washed away due to Kosi river floods. Children unable to reach secondary school for 3 months."
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900">2. Census Infrastructure Deficit Index</span>
                <p className="text-slate-700">
                  District road density index shows 42% deficit compared to state average, with 18 Gram Panchayats lacking all-weather bitumen roads.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 p-3 rounded-lg">
                <span className="font-bold block">3. Estimated Socio-Economic Return</span>
                <p className="mt-0.5">
                  Projected 24-minute reduction in emergency hospital commute and uninterrupted school attendance for 8,420 rural students.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-200">
              <button
                onClick={() => setEvidenceModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-white font-bold text-xs"
              >
                Close Evidence
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
