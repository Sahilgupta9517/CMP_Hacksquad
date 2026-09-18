import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  IndianRupee, 
  Clock, 
  Layers, 
  Eye, 
  X, 
  ChevronRight, 
  TrendingUp, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';
import { RECOMMENDATIONS_DATA } from '../data/mockData';
import { TRANSLATIONS } from '../utils/translations';

export default function Recommendations({ currentLanguage = 'English' }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const districtParam = searchParams.get('district');
  const t = TRANSLATIONS[currentLanguage]?.reco || TRANSLATIONS['English'].reco;

  const [selectedProject, setSelectedProject] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');

  const filteredProjects = RECOMMENDATIONS_DATA.filter((p) => {
    const matchesCategory = filterCategory === 'All' || p.category.toLowerCase().includes(filterCategory.toLowerCase());
    const matchesDistrict = !districtParam || p.district.toLowerCase().includes(districtParam.toLowerCase());
    return matchesCategory && matchesDistrict;
  });

  return (
    <div className="space-y-8 animate-fadeIn pb-14">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI Decision Support Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            {t.title}
          </h1>
          <p className="text-sm text-slate-600">
            {t.subtitle}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Road', 'Water', 'Healthcare', 'Lighting', 'Sanitation'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm ${
                filterCategory === cat
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Active District Banner if present */}
      {districtParam && (
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="text-slate-700">
              Showing AI recommendations for <strong className="text-blue-900">{districtParam} District</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSearchParams({})}
            className="text-xs text-rose-600 font-bold hover:underline flex items-center space-x-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Show All Districts</span>
          </button>
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-5">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`glass-panel p-6 sm:p-8 border transition-all ${
              project.rank === '01'
                ? 'border-blue-400 bg-gradient-to-r from-blue-50/40 via-white to-cyan-50/30 shadow-lg'
                : 'border-slate-200/90 shadow-sm hover:border-blue-300'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              
              {/* Left Details */}
              <div className="space-y-3.5 flex-1">
                
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-blue-600 text-white shadow-sm">
                    Priority Project {project.rank}
                  </span>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                    {project.category}
                  </span>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    project.priorityLevel === 'HIGH' 
                      ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {project.priorityLevel} Priority
                  </span>

                  <span className="text-xs text-slate-500 flex items-center">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 mr-1" />
                    <strong>{project.district} District</strong>
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                  {project.title}
                </h3>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Citizen Requests</span>
                    <strong className="text-sm text-slate-900 font-mono">{project.citizenRequests} Inputs</strong>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Population Impact</span>
                    <strong className="text-sm text-slate-900 font-mono">{project.populationImpact.toLocaleString('en-IN')} Citizens</strong>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">{t.cost}</span>
                    <strong className="text-sm text-blue-700 font-mono">{project.estimatedCost}</strong>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">{t.timeline}</span>
                    <strong className="text-sm text-emerald-700 font-mono">{project.timeline}</strong>
                  </div>
                </div>

                {/* Expected Benefits */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    {t.benefits}:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                    {project.expectedBenefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start space-x-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Explanation Snippet */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 italic">
                  <span className="font-bold text-blue-900 not-italic">AI Rationale: </span>
                  "{project.aiExplanation}"
                </div>

              </div>

              {/* Right Priority Score & Action */}
              <div className="lg:w-56 shrink-0 flex flex-col justify-between items-center text-center p-5 rounded-20px bg-white border border-slate-200 shadow-sm space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                    AI Priority Score
                  </span>
                  <div className="text-4xl font-extrabold font-mono text-rose-600 my-1">
                    {project.priorityScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Ranked #{project.rank} in State
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="w-full py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-sm transition flex items-center justify-center space-x-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t.viewAnalysisBtn}</span>
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* COMPLETE ANALYSIS & FORMULA CALCULATION MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel p-6 sm:p-8 border border-slate-200 shadow-2xl max-w-2xl w-full bg-white space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                  Algorithmic Transparency Engine
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                  AI Priority Score Formula Breakdown
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  {selectedProject.title} ({selectedProject.district} District)
                </p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Formula Banner */}
            <div className="p-4 rounded-20px bg-gradient-to-r from-[#060B16] to-[#15213D] text-white space-y-2">
              <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                Official Mathematical Scoring Model
              </span>
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700 font-mono text-xs text-cyan-300">
                Priority Score = (40% × Complaint Freq) + (25% × Infra Gap) + (20% × Pop Impact) + (15% × Urgency)
              </div>
              <div className="flex items-center justify-between text-xs pt-1">
                <span>Total Score: <strong className="text-amber-300 text-base font-mono">{selectedProject.priorityScore}/100</strong></span>
                <span className="text-slate-400 font-mono">0 - 100 Standard Scale</span>
              </div>
            </div>

            {/* 4 Factor Contribution Progress Bars */}
            <div className="space-y-4 text-xs">
              
              {/* Factor 1 */}
              <div className="space-y-1">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>1. Complaint Frequency (Weight: 40%)</span>
                  <span className="font-mono font-bold text-blue-700">
                    +{selectedProject.formulaBreakdown.complaintFreq.contribution} pts (Raw: {selectedProject.formulaBreakdown.complaintFreq.score}/100)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${selectedProject.formulaBreakdown.complaintFreq.score}%` }}></div>
                </div>
              </div>

              {/* Factor 2 */}
              <div className="space-y-1">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>2. Infrastructure Deficit Gap (Weight: 25%)</span>
                  <span className="font-mono font-bold text-rose-700">
                    +{selectedProject.formulaBreakdown.infraGap.contribution} pts (Raw: {selectedProject.formulaBreakdown.infraGap.score}/100)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: `${selectedProject.formulaBreakdown.infraGap.score}%` }}></div>
                </div>
              </div>

              {/* Factor 3 */}
              <div className="space-y-1">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>3. Population Impact (Weight: 20%)</span>
                  <span className="font-mono font-bold text-amber-700">
                    +{selectedProject.formulaBreakdown.popImpact.contribution} pts (Raw: {selectedProject.formulaBreakdown.popImpact.score}/100)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${selectedProject.formulaBreakdown.popImpact.score}%` }}></div>
                </div>
              </div>

              {/* Factor 4 */}
              <div className="space-y-1">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>4. Urgency & Criticality (Weight: 15%)</span>
                  <span className="font-mono font-bold text-emerald-700">
                    +{selectedProject.formulaBreakdown.urgency.contribution} pts (Raw: {selectedProject.formulaBreakdown.urgency.score}/100)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${selectedProject.formulaBreakdown.urgency.score}%` }}></div>
                </div>
              </div>

            </div>

            {/* Explanation Quote */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
              <span className="font-bold text-slate-900 block mb-0.5">Policy Recommendation Explanation:</span>
              "High complaint frequency ({selectedProject.citizenRequests} citizen inputs) combined with acute service deficit index and critical emergency access impact produced this composite score of {selectedProject.priorityScore}/100."
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <span className="text-[11px] text-slate-500">
                Digital Public Good • Algorithmic Audit Compliant
              </span>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Close Analysis
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
