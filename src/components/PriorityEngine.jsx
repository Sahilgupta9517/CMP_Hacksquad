import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  Filter, 
  Search, 
  CheckCircle2, 
  ChevronRight, 
  X, 
  Info,
  Award,
  ArrowUpDown,
  Building,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export default function PriorityEngine({ 
  aiProjects = [], 
  onUpdateProjectStatus 
}) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');

  const filteredProjects = aiProjects.filter(p => {
    const matchesSearch = p.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesState = stateFilter === 'All' || p.state === stateFilter;
    return matchesSearch && matchesCategory && matchesState;
  });

  return (
    <section id="priority-engine" className="mb-14 scroll-mt-20">
      
      {/* Section Header */}
      <div className="flex flex-col sm-flex-row sm-items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <Sparkles className="w-5 h-5 text-indigo-700" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#0A192F] font-heading">
              AI PRIORITY ENGINE
            </h2>
          </div>
          <p className="text-sm text-slate-600">
            Convert citizen demand into transparent, data-driven infrastructure priority signals
          </p>
        </div>

        <span className="gov-badge gov-badge-saffron">
          Prototype Scoring Model
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="gov-card p-4 mb-6 bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search district, project, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="gov-input pl-8 py-1.5 text-xs"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-slate-500 font-bold">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="gov-input py-1.5 text-xs w-auto cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Roads">Roads & Connectivity</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Water">Drinking Water</option>
            <option value="Electricity">Electricity</option>
          </select>
        </div>

        {/* State Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-slate-500 font-bold">State:</span>
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="gov-input py-1.5 text-xs w-auto cursor-pointer"
          >
            <option value="All">All States</option>
            <option value="Bihar">Bihar</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Odisha">Odisha</option>
            <option value="Rajasthan">Rajasthan</option>
          </select>
        </div>

      </div>

      {/* Priority Engine Table */}
      <div className="gov-card border border-slate-200 shadow-sm overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-10px">
                <th className="py-3 px-4">District / State</th>
                <th className="py-3 px-4">Issue / Project Proposal</th>
                <th className="py-3 px-4">Citizen Requests</th>
                <th className="py-3 px-4">Infrastructure Gap</th>
                <th className="py-3 px-4">Beneficiaries</th>
                <th className="py-3 px-4">Priority Score</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.map((proj) => (
                <tr 
                  key={proj.id}
                  className="hover:bg-blue-50/40 transition cursor-pointer group"
                  onClick={() => setSelectedProject(proj)}
                >
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div>{proj.district}</div>
                    <span className="text-10px font-normal text-slate-500">{proj.state}</span>
                  </td>

                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    <div className="font-bold text-blue-900">{proj.issue || proj.title}</div>
                    <span className="text-10px text-slate-500 font-mono">{proj.project_code} • {proj.category}</span>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {proj.requests_count?.toLocaleString('en-IN')}
                    <span className="block text-10px font-normal text-emerald-700 font-sans">+18% trend</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="gov-badge gov-badge-critical font-bold">
                      {proj.infrastructure_gap || 'High Gap'}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-800 font-semibold">
                    {proj.target_beneficiaries?.toLocaleString('en-IN')}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-extrabold text-sm text-rose-700">
                        {proj.priority_score}
                      </span>
                      <span className="text-10px text-slate-400">/ 100</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(proj);
                      }}
                      className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-11px transition"
                    >
                      <span>Why Prioritized?</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TRANSPARENT PRIORITY SCORE MODAL (Section 14) */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="gov-card p-6 border border-slate-200 shadow-2xl max-w-xl w-full bg-white space-y-5">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-10px font-bold uppercase tracking-wider text-blue-700">
                  Transparent Decision Support
                </span>
                <h3 className="text-lg font-bold text-[#0A192F] font-heading">
                  WHY THIS REQUEST IS PRIORITIZED
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  {selectedProject.district}, {selectedProject.state} — {selectedProject.title}
                </p>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Score Showcase */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex items-center justify-between">
              <div>
                <span className="text-10px font-bold uppercase text-blue-200 tracking-wide">Composite Priority Score</span>
                <div className="text-3xl font-extrabold font-mono text-amber-300">
                  {selectedProject.priority_score} <span className="text-sm font-normal text-white">/ 100</span>
                </div>
              </div>
              <span className="gov-badge gov-badge-saffron">
                Transparent Formula
              </span>
            </div>

            {/* 5-Factor Transparent Breakdown Progress Bars */}
            <div className="space-y-3 text-xs">
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-slate-700">Citizen Demand Volume (30% weight)</span>
                  <span className="font-mono font-bold text-blue-700">{selectedProject.scoring_factors?.citizen_demand || 92}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-700 h-full rounded-full" style={{ width: `${selectedProject.scoring_factors?.citizen_demand || 92}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-slate-700">Infrastructure Deficit Gap (25% weight)</span>
                  <span className="font-mono font-bold text-rose-700">{selectedProject.scoring_factors?.infrastructure_gap || 88}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-rose-600 h-full rounded-full" style={{ width: `${selectedProject.scoring_factors?.infrastructure_gap || 88}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-slate-700">Population Impact Scale (20% weight)</span>
                  <span className="font-mono font-bold text-amber-700">{selectedProject.scoring_factors?.population_impact || 84}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${selectedProject.scoring_factors?.population_impact || 84}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-slate-700">Essential Public Service Impact (15% weight)</span>
                  <span className="font-mono font-bold text-emerald-700">{selectedProject.scoring_factors?.essential_service || 95}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${selectedProject.scoring_factors?.essential_service || 95}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-slate-700">Recent Growth Trend (10% weight)</span>
                  <span className="font-mono font-bold text-indigo-700">{selectedProject.scoring_factors?.recent_trend || 79}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${selectedProject.scoring_factors?.recent_trend || 79}%` }}></div>
                </div>
              </div>

            </div>

            {/* Plain-Language Explanation */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
              <span className="font-bold text-slate-900 block mb-1">AI Recommendation Context:</span>
              "High citizen demand combined with an identified infrastructure gap and essential-service impact contributed to this prototype priority score."
            </div>

            {/* Footer Notice & Close Button */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <span className="text-10px text-slate-500">
                Prototype scoring model for governance demonstration
              </span>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
