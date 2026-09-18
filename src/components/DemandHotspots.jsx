import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  MapPin, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  Layers, 
  Search, 
  Filter, 
  Info,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Building,
  CheckCircle2,
  Globe,
  Activity,
  RotateCcw,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { DISTRICTS_DATA } from '../data/mockData';
import { TRANSLATIONS } from '../utils/translations';
import LeafletHotspotsMap from './LeafletHotspotsMap';

export default function DemandHotspots({ currentLanguage = 'English' }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const t = TRANSLATIONS[currentLanguage]?.hotspots || TRANSLATIONS['English'].hotspots;
  const detailPanelRef = useRef(null);

  // Initialize selected district from URL query param if present
  const districtParam = searchParams.get('district');
  const initialDistrict = DISTRICTS_DATA.find(d => 
    d.id.toLowerCase() === (districtParam || '').toLowerCase() || 
    d.name.toLowerCase() === (districtParam || '').toLowerCase()
  ) || DISTRICTS_DATA[0];

  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [levelFilter, setLevelFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique states & categories for filter dropdowns
  const uniqueStates = ['All', ...new Set(DISTRICTS_DATA.map(d => d.state))];
  const uniqueCategories = ['All', ...new Set(DISTRICTS_DATA.map(d => d.category))];

  // Filter dataset dynamically
  const filteredDistricts = DISTRICTS_DATA.filter((d) => {
    const matchesLevel = levelFilter === 'All' || d.hotspotLevel.toLowerCase() === levelFilter.toLowerCase();
    const matchesState = stateFilter === 'All' || d.state === stateFilter;
    const matchesCategory = categoryFilter === 'All' || d.category === categoryFilter;
    const matchesSearch = searchQuery.trim() === '' || 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      d.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.majorIssue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesLevel && matchesState && matchesCategory && matchesSearch;
  });

  // Handle District Selection from Map or Cards
  const handleSelectDistrict = (district) => {
    setSelectedDistrict(district);
    setSearchParams({ district: district.id }, { replace: true });

    // Smooth scroll to inspector on mobile devices
    if (window.innerWidth < 1024 && detailPanelRef.current) {
      detailPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setLevelFilter('All');
    setStateFilter('All');
    setCategoryFilter('All');
    setSearchQuery('');
  };

  // Metric aggregates
  const totalHotspotsCount = DISTRICTS_DATA.length;
  const criticalHotspotsCount = DISTRICTS_DATA.filter(d => d.hotspotLevel === 'Critical').length;
  const highHotspotsCount = DISTRICTS_DATA.filter(d => d.hotspotLevel === 'High').length;
  const emergingHotspotsCount = DISTRICTS_DATA.filter(d => d.hotspotLevel === 'Emerging').length;
  const totalAffectedPopulation = DISTRICTS_DATA.reduce((acc, curr) => acc + (curr.population || 0), 0);

  return (
    <div className="space-y-8 animate-fadeIn pb-16 max-w-7xl mx-auto">
      
      {/* Page Title & Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-4 border-b border-slate-200">
        <div className="space-y-1.5">
          <div className="inline-flex items-center space-x-2 text-xs font-extrabold uppercase tracking-widest text-cyan-700 bg-cyan-100/80 px-3 py-1 rounded-full border border-cyan-300">
            <MapPin className="w-3.5 h-3.5 text-cyan-700" />
            <span>Smart City & State Geospatial Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            National & State Demand Hotspots
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
            Interactive geospatial intelligence for identifying concentrations of citizen infrastructure demand across India's regional DPI grid.
          </p>
        </div>

        {/* Prototype Data Badge */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-amber-50 text-amber-700 border border-amber-300 shadow-sm flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Highest Demand in Current Prototype Dataset</span>
          </span>
        </div>
      </div>

      {/* National Summary Counter Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="glass-panel p-4 border border-slate-200 bg-white rounded-2xl shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Total Hotspots</span>
          <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 block">{totalHotspotsCount}</span>
          <span className="text-[11px] text-slate-500">Connected Nodes</span>
        </div>

        <div className="glass-panel p-4 border border-rose-200 bg-rose-50/40 rounded-2xl shadow-sm space-y-1">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">Critical Severity</span>
          <span className="text-2xl sm:text-3xl font-black font-mono text-rose-700 block">{criticalHotspotsCount}</span>
          <span className="text-[11px] text-rose-600 font-medium">Immediate DPI Intervention</span>
        </div>

        <div className="glass-panel p-4 border border-orange-200 bg-orange-50/40 rounded-2xl shadow-sm space-y-1">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block">High Priority</span>
          <span className="text-2xl sm:text-3xl font-black font-mono text-orange-700 block">{highHotspotsCount}</span>
          <span className="text-[11px] text-orange-600 font-medium">Elevated Infrastructure Deficit</span>
        </div>

        <div className="glass-panel p-4 border border-yellow-200 bg-yellow-50/40 rounded-2xl shadow-sm space-y-1">
          <span className="text-xs font-bold text-yellow-700 uppercase tracking-wider block">Emerging Demand</span>
          <span className="text-2xl sm:text-3xl font-black font-mono text-yellow-800 block">{emergingHotspotsCount}</span>
          <span className="text-[11px] text-yellow-700 font-medium">Growing Cluster Volume</span>
        </div>

        <div className="glass-panel p-4 border border-blue-200 bg-blue-50/40 rounded-2xl shadow-sm space-y-1 col-span-2 sm:col-span-1">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">Affected Population</span>
          <span className="text-2xl sm:text-3xl font-black font-mono text-blue-800 block">
            {totalAffectedPopulation.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-blue-700 font-medium">Citizens Impacted</span>
        </div>
      </div>

      {/* Filter & Search Controls Toolbar */}
      <div className="glass-panel p-5 border border-slate-200 bg-white rounded-2xl shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search district, state, or infrastructure issue..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/60"
            />
          </div>

          {/* Severity Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-1 flex items-center">
              <Filter className="w-3.5 h-3.5 mr-1" /> Severity:
            </span>
            {['All', 'Critical', 'High', 'Emerging'].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setLevelFilter(level)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm ${
                  levelFilter === level
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>

        </div>

        {/* Dropdown Filters Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            
            {/* State Filter */}
            <div className="flex items-center space-x-1.5">
              <label className="font-bold text-slate-600">State:</label>
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {uniqueStates.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-1.5">
              <label className="font-bold text-slate-600">Category:</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {uniqueCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

          </div>

          <div className="flex items-center space-x-3">
            <span className="text-slate-500 font-mono text-11px font-bold">
              Showing {filteredDistricts.length} of {DISTRICTS_DATA.length} Hotspots
            </span>
            {(levelFilter !== 'All' || stateFilter !== 'All' || categoryFilter !== 'All' || searchQuery) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-rose-600 font-bold hover:underline flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Main Responsive Layout: Interactive Google Map + District Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left GIS Leaflet Map Canvas (7 cols on desktop) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-cyan-600" />
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                Interactive GIS Leaflet Canvas (OpenStreetMap / CartoDB)
              </h3>
            </div>
            <div className="flex items-center space-x-3 text-xs text-slate-500">
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 mr-1.5"></span> Critical</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-orange-500 mr-1.5"></span> High</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-yellow-400 mr-1.5"></span> Emerging</span>
            </div>
          </div>

          <LeafletHotspotsMap
            hotspots={filteredDistricts}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={handleSelectDistrict}
            mapHeightClass="h-[480px] md:h-[560px] lg:h-[620px]"
          />
        </div>

        {/* Right District Inspector Panel (5 cols on desktop, responsive card on mobile) */}
        <div ref={detailPanelRef} className="lg:col-span-5 w-full">
          {selectedDistrict ? (
            <div className="glass-panel p-6 border-2 border-blue-400/70 shadow-2xl bg-white rounded-2xl flex flex-col justify-between h-auto lg:h-[620px] overflow-y-auto space-y-6">
              
              <div className="space-y-5">
                
                {/* District Header */}
                <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 block">
                      Smart City District Node
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 font-heading">
                      {selectedDistrict.name}
                    </h3>
                    <span className="text-xs font-semibold text-slate-500">{selectedDistrict.state}</span>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-black shadow-sm ${
                    selectedDistrict.hotspotLevel === 'Critical' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                    selectedDistrict.hotspotLevel === 'High' ? 'bg-orange-100 text-orange-800 border border-orange-300' :
                    'bg-yellow-100 text-yellow-800 border border-yellow-300'
                  }`}>
                    {selectedDistrict.hotspotLevel === 'Critical' ? '🔴 CRITICAL HOTSPOT' :
                     selectedDistrict.hotspotLevel === 'High' ? '🟠 HIGH HOTSPOT' : '🟡 EMERGING HOTSPOT'}
                  </span>
                </div>

                {/* Top Metrics Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                    <span className="text-[10px] font-extrabold text-slate-500 uppercase block">Citizen Requests</span>
                    <span className="text-xl font-bold font-mono text-slate-900 block">{selectedDistrict.complaints}</span>
                    <span className="text-[10px] text-emerald-700 font-semibold">{selectedDistrict.trend}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                    <span className="text-[10px] font-extrabold text-slate-500 uppercase block">AI Priority Score</span>
                    <span className="text-xl font-bold font-mono text-rose-600 block">{selectedDistrict.priorityScore} / 100</span>
                    <span className="text-[10px] text-slate-500">Prototype Priority Model</span>
                  </div>
                </div>

                {/* Formula Breakdown Progress Bars */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between text-xs border-b border-slate-200 pb-1.5">
                    <span className="font-extrabold text-slate-800">Priority Score Formula Components</span>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">Prototype Model</span>
                  </div>

                  <div className="space-y-2 text-[11px]">
                    <div>
                      <div className="flex justify-between text-slate-700 font-semibold mb-1">
                        <span>Citizen Demand Frequency (40%)</span>
                        <span className="font-mono font-bold text-slate-900">{selectedDistrict.priorityBreakdown?.citizenDemand || 92}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${selectedDistrict.priorityBreakdown?.citizenDemand || 92}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-700 font-semibold mb-1">
                        <span>Infrastructure Deficit Gap (25%)</span>
                        <span className="font-mono font-bold text-slate-900">{selectedDistrict.priorityBreakdown?.infraGap || 95}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-rose-500 h-2 rounded-full" style={{ width: `${selectedDistrict.priorityBreakdown?.infraGap || 95}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-700 font-semibold mb-1">
                        <span>Essential Service Criticality (20%)</span>
                        <span className="font-mono font-bold text-slate-900">{selectedDistrict.priorityBreakdown?.serviceCriticality || 90}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${selectedDistrict.priorityBreakdown?.serviceCriticality || 90}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-700 font-semibold mb-1">
                        <span>Affected Population Reach (15%)</span>
                        <span className="font-mono font-bold text-slate-900">{selectedDistrict.priorityBreakdown?.impactPopulation || 78}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-cyan-600 h-2 rounded-full" style={{ width: `${selectedDistrict.priorityBreakdown?.impactPopulation || 78}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Infrastructure Issue & Context */}
                <div className="space-y-2.5 text-xs">
                  <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase text-blue-800">Major Infrastructure Issue</span>
                    <p className="font-bold text-slate-900 text-sm leading-snug">{selectedDistrict.majorIssue}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                    <span className="text-[10px] font-extrabold uppercase text-slate-500">Affected Population Impact</span>
                    <p className="font-bold text-slate-800">{selectedDistrict.population.toLocaleString('en-IN')} Citizens Affected</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase text-slate-500">Why This Hotspot?</span>
                    <p className="text-slate-700 leading-relaxed text-11px">{selectedDistrict.summary}</p>
                  </div>
                </div>

              </div>

              {/* Action Button: Navigate to Full AI Analysis */}
              <div className="pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => navigate('/ai-analysis', { state: { selectedDistrict } })}
                  className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-lg shadow-blue-700/25 transition flex items-center justify-center space-x-2"
                >
                  <span>View Full AI Analysis & Action Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : (
            <div className="glass-panel p-6 border border-slate-200 flex items-center justify-center h-[560px] text-center rounded-2xl">
              <p className="text-xs text-slate-500">Select any district marker on the map to inspect intelligence details.</p>
            </div>
          )}
        </div>

      </div>

      {/* Grid of All District Hotspot Cards */}
      <div className="space-y-6 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 font-heading">
              All District Hotspot Cards ({filteredDistricts.length})
            </h3>
            <p className="text-xs text-slate-500">
              Click any card below to focus and inspect the district on the Google Map
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-700 font-bold bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            {filteredDistricts.length} Nodes Rendered
          </span>
        </div>

        {filteredDistricts.length === 0 ? (
          <div className="glass-panel p-10 text-center border border-slate-200 bg-white rounded-2xl space-y-4">
            <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900">No Hotspots Match Your Current Filters</h4>
              <p className="text-xs text-slate-500">Try adjusting your search query, state, category, or severity filter.</p>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-blue-700 text-white font-bold text-xs shadow hover:bg-blue-800 transition"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDistricts.map((dist) => {
              const isSelected = selectedDistrict?.id === dist.id;

              return (
                <div
                  key={dist.id}
                  onClick={() => handleSelectDistrict(dist)}
                  className={`glass-panel p-5 border-2 rounded-2xl transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md ${
                    isSelected
                      ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/30'
                      : 'border-slate-200/90 hover:border-blue-300 bg-white'
                  }`}
                >
                  <div className="space-y-3">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-black text-slate-900 font-heading">
                          {dist.name}
                        </h4>
                        <span className="text-xs font-semibold text-slate-500">{dist.state}</span>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                        dist.hotspotLevel === 'Critical' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                        dist.hotspotLevel === 'High' ? 'bg-orange-100 text-orange-800 border border-orange-300' : 
                        'bg-yellow-100 text-yellow-800 border border-yellow-300'
                      }`}>
                        {dist.hotspotLevel}
                      </span>
                    </div>

                    {/* Major Issue */}
                    <div className="text-xs text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                      <span className="text-[10px] font-extrabold uppercase text-slate-500 block mb-0.5">Major Infrastructure Issue:</span>
                      <strong className="font-bold text-slate-900">{dist.majorIssue}</strong>
                    </div>

                    {/* KPI Mini Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-500 block font-semibold">Citizen Requests</span>
                        <strong className="font-mono font-bold text-slate-900 text-sm">{dist.complaints}</strong>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-500 block font-semibold">Priority Score</span>
                        <strong className="font-mono font-bold text-rose-600 text-sm">{dist.priorityScore} / 100</strong>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Impact: <strong>{dist.population.toLocaleString('en-IN')}</strong> citizens</span>
                    <span className="text-blue-700 font-bold flex items-center group-hover:translate-x-1 transition-transform">
                      Select on Map <ChevronRight className="w-4 h-4 ml-0.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
