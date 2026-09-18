import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  Building,
  CheckCircle2,
  Globe,
  Activity,
  RotateCcw,
  ShieldCheck,
  ExternalLink,
  SlidersHorizontal,
  X,
  PieChart as PieIcon,
  BarChart3,
  Calendar,
  Zap,
  HelpCircle,
  FileSpreadsheet,
  Flame,
  Scale,
  Check,
  AlertOctagon,
  Maximize2
} from 'lucide-react';
import { DISTRICTS_DATA, CATEGORY_DATA } from '../data/mockData';
import { TRANSLATIONS } from '../utils/translations';
import LeafletHotspotsMap from './LeafletHotspotsMap';

export default function DemandHotspots({ currentLanguage = 'English' }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const t = TRANSLATIONS[currentLanguage]?.hotspots || TRANSLATIONS['English'].hotspots;
  const detailPanelRef = useRef(null);

  // Initialize selected district from URL query param if present
  const districtParam = searchParams.get('district');
  const initialDistrict = useMemo(() => {
    if (!districtParam) return DISTRICTS_DATA[0];
    return DISTRICTS_DATA.find(d => 
      d.id.toLowerCase() === districtParam.toLowerCase() || 
      d.name.toLowerCase() === districtParam.toLowerCase()
    ) || DISTRICTS_DATA[0];
  }, [districtParam]);

  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [levelFilter, setLevelFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [timeFilter, setTimeFilter] = useState('All Available Data');
  const [searchQuery, setSearchQuery] = useState('');

  // UI State toggles
  const [isWhyHotspotOpen, setIsWhyHotspotOpen] = useState(true);
  const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [comparedDistricts, setComparedDistricts] = useState([]);
  const [trendPeriod, setTrendPeriod] = useState('30 Days');

  // Sync selected district if URL param changes externally
  useEffect(() => {
    if (districtParam) {
      const match = DISTRICTS_DATA.find(d => 
        d.id.toLowerCase() === districtParam.toLowerCase() || 
        d.name.toLowerCase() === districtParam.toLowerCase()
      );
      if (match && match.id !== selectedDistrict?.id) {
        setSelectedDistrict(match);
      }
    }
  }, [districtParam]);

  // Extract unique states & categories for filter dropdowns
  const uniqueStates = useMemo(() => ['All', ...new Set(DISTRICTS_DATA.map(d => d.state))], []);
  const uniqueCategories = useMemo(() => ['All', ...new Set(DISTRICTS_DATA.map(d => d.category))], []);

  // Filter dataset dynamically
  const filteredDistricts = useMemo(() => {
    return DISTRICTS_DATA.filter((d) => {
      const matchesLevel = levelFilter === 'All' || d.hotspotLevel.toLowerCase() === levelFilter.toLowerCase();
      const matchesState = stateFilter === 'All' || d.state === stateFilter;
      const matchesCategory = categoryFilter === 'All' || d.category === categoryFilter;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = query === '' || 
        d.name.toLowerCase().includes(query) || 
        d.state.toLowerCase().includes(query) ||
        d.majorIssue.toLowerCase().includes(query) ||
        d.category.toLowerCase().includes(query) ||
        (d.subcategory && d.subcategory.toLowerCase().includes(query));

      return matchesLevel && matchesState && matchesCategory && matchesSearch;
    });
  }, [levelFilter, stateFilter, categoryFilter, searchQuery]);

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
    setTimeFilter('All Available Data');
    setSearchQuery('');
  };

  // Toggle district for comparison (up to 3)
  const toggleCompareDistrict = (district, e) => {
    e.stopPropagation();
    setComparedDistricts((prev) => {
      const exists = prev.some(d => d.id === district.id);
      if (exists) {
        return prev.filter(d => d.id !== district.id);
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], district]; // keep last 2 + new
      }
      return [...prev, district];
    });
  };

  // Metric aggregates (computed from overall dataset)
  const totalHotspotsCount = DISTRICTS_DATA.length;
  const criticalHotspotsCount = DISTRICTS_DATA.filter(d => d.hotspotLevel === 'Critical').length;
  const highHotspotsCount = DISTRICTS_DATA.filter(d => d.hotspotLevel === 'High').length;
  const emergingHotspotsCount = DISTRICTS_DATA.filter(d => d.hotspotLevel === 'Emerging').length;
  const totalAffectedPopulation = DISTRICTS_DATA.reduce((acc, curr) => acc + (curr.population || 0), 0);

  // Dynamic Infrastructure Category breakdown from dataset
  const categoryBreakdown = useMemo(() => {
    const counts = {};
    DISTRICTS_DATA.forEach(d => {
      counts[d.category] = (counts[d.category] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / DISTRICTS_DATA.length) * 100)
      }))
      .sort((a, b) => b.count - a.count);
  }, []);

  // Dynamic State Demand Distribution from dataset
  const stateDistribution = useMemo(() => {
    const counts = {};
    DISTRICTS_DATA.forEach(d => {
      counts[d.state] = (counts[d.state] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([state, count]) => ({
        state,
        count,
        critical: DISTRICTS_DATA.filter(d => d.state === state && d.hotspotLevel === 'Critical').length
      }))
      .sort((a, b) => b.count - a.count);
  }, []);

  // AI Demand Dynamic Insights
  const topCategory = categoryBreakdown[0]?.name || 'Road Infrastructure';
  const topState = stateDistribution[0]?.state || 'Uttar Pradesh';
  const criticalRatio = Math.round((criticalHotspotsCount / totalHotspotsCount) * 100);

  // Active filter count for badge
  const activeFiltersCount = (levelFilter !== 'All' ? 1 : 0) +
    (stateFilter !== 'All' ? 1 : 0) +
    (categoryFilter !== 'All' ? 1 : 0) +
    (timeFilter !== 'All Available Data' ? 1 : 0) +
    (searchQuery.trim() !== '' ? 1 : 0);

  return (
    <div className="space-y-8 animate-fadeIn pb-16 max-w-7xl mx-auto min-w-0">
      
      {/* =========================================================
          1. TOP HERO SECTION
          ========================================================= */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-4 border-b border-slate-200">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 text-[11px] font-extrabold uppercase tracking-widest text-cyan-800 bg-cyan-100/90 px-3 py-1 rounded-full border border-cyan-300 shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-cyan-700" />
              <span>AI-Powered Geospatial Governance Intelligence</span>
            </span>

            <span className="inline-flex items-center space-x-1.5 text-[11px] font-bold bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span>Prototype Intelligence Dataset</span>
            </span>

            <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>Last Updated: Demo Dataset</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            National & State Demand Hotspots
          </h1>

          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            AI-powered geospatial intelligence for identifying, prioritizing and understanding citizen infrastructure demand across India's regional DPI grid.
          </p>
        </div>

        {/* Action Controls in Hero */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsPriorityModalOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-blue-700 border border-blue-200 hover:bg-blue-50/80 shadow-sm transition flex items-center space-x-1.5"
          >
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>How Priority Score Works</span>
          </button>

          {comparedDistricts.length > 0 && (
            <button
              type="button"
              onClick={() => setIsCompareModalOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-700 text-white hover:bg-blue-800 shadow-md transition flex items-center space-x-1.5"
            >
              <Scale className="w-4 h-4" />
              <span>Compare ({comparedDistricts.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* =========================================================
          2. KPI SUMMARY CARDS (5 Cards)
          ========================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        
        {/* Total Hotspots */}
        <div className="glass-panel p-4 border border-slate-200 bg-white rounded-2xl shadow-sm hover:shadow-md transition space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Hotspots</span>
            <Globe className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 block">{totalHotspotsCount}</span>
          <span className="text-[11px] text-slate-500 font-medium block">Connected Demand Nodes</span>
        </div>

        {/* Critical Severity */}
        <div className="glass-panel p-4 border border-rose-200 bg-gradient-to-br from-rose-50/70 to-white rounded-2xl shadow-sm hover:shadow-md transition space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider">Critical Severity</span>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
            </span>
          </div>
          <span className="text-2xl sm:text-3xl font-black font-mono text-rose-700 block">{criticalHotspotsCount}</span>
          <span className="text-[11px] text-rose-600 font-semibold block">Immediate Attention</span>
        </div>

        {/* High Priority */}
        <div className="glass-panel p-4 border border-orange-200 bg-gradient-to-br from-orange-50/70 to-white rounded-2xl shadow-sm hover:shadow-md transition space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-orange-700 uppercase tracking-wider">High Priority</span>
            <Flame className="w-4 h-4 text-orange-500" />
          </div>
          <span className="text-2xl sm:text-3xl font-black font-mono text-orange-700 block">{highHotspotsCount}</span>
          <span className="text-[11px] text-orange-600 font-semibold block">Elevated Demand</span>
        </div>

        {/* Emerging Demand */}
        <div className="glass-panel p-4 border border-amber-200 bg-gradient-to-br from-amber-50/70 to-white rounded-2xl shadow-sm hover:shadow-md transition space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Emerging Demand</span>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-black font-mono text-amber-800 block">{emergingHotspotsCount}</span>
          <span className="text-[11px] text-amber-700 font-semibold block">Growing Demand</span>
        </div>

        {/* Affected Population */}
        <div className="glass-panel p-4 border border-cyan-200 bg-gradient-to-br from-cyan-50/70 to-white rounded-2xl shadow-sm hover:shadow-md transition space-y-1 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-cyan-800 uppercase tracking-wider">Affected Population</span>
            <Users className="w-4 h-4 text-cyan-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-900 block">
            {totalAffectedPopulation.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-cyan-700 font-semibold block">Citizens Impacted</span>
        </div>

      </div>

      {/* =========================================================
          3. FILTER & SEARCH SYSTEM
          ========================================================= */}
      <div className="glass-panel p-5 border border-slate-200 bg-white rounded-2xl shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search district, state, issue, or category..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/70"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Severity Quick Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-1 flex items-center">
              <Filter className="w-3.5 h-3.5 mr-1 text-slate-400" /> Severity:
            </span>
            {['All', 'Critical', 'High', 'Emerging', 'Lower Demand'].map((level) => (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
          
          {/* State Filter */}
          <div className="space-y-1">
            <label className="font-bold text-slate-600 block text-[11px] uppercase tracking-wider">State:</label>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs shadow-sm"
            >
              {uniqueStates.map((s) => (
                <option key={s} value={s}>{s === 'All' ? 'All States (National)' : s}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="space-y-1">
            <label className="font-bold text-slate-600 block text-[11px] uppercase tracking-wider">Category:</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs shadow-sm"
            >
              {uniqueCategories.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
              ))}
            </select>
          </div>

          {/* Time Period Filter */}
          <div className="space-y-1">
            <label className="font-bold text-slate-600 block text-[11px] uppercase tracking-wider">Time Period:</label>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs shadow-sm"
            >
              <option value="All Available Data">All Available Data</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 3 Months">Last 3 Months</option>
              <option value="Last 6 Months">Last 6 Months</option>
            </select>
          </div>

          {/* Reset Filters & Counter */}
          <div className="flex flex-col justify-end space-y-1 sm:col-span-2 md:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-mono text-[11px] font-bold">
                Showing {filteredDistricts.length} of {DISTRICTS_DATA.length} Hotspots
              </span>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs text-rose-600 font-bold hover:underline flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-[11px] font-bold text-slate-400">Active Filters:</span>
            
            {stateFilter !== 'All' && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold border border-blue-200 text-xs">
                State: {stateFilter}
                <button type="button" onClick={() => setStateFilter('All')} className="ml-1.5 hover:text-rose-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {levelFilter !== 'All' && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 font-bold border border-rose-200 text-xs">
                Severity: {levelFilter}
                <button type="button" onClick={() => setLevelFilter('All')} className="ml-1.5 hover:text-rose-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {categoryFilter !== 'All' && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-cyan-50 text-cyan-800 font-bold border border-cyan-200 text-xs">
                Category: {categoryFilter}
                <button type="button" onClick={() => setCategoryFilter('All')} className="ml-1.5 hover:text-rose-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {timeFilter !== 'All Available Data' && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 font-bold border border-amber-200 text-xs">
                Period: {timeFilter}
                <button type="button" onClick={() => setTimeFilter('All Available Data')} className="ml-1.5 hover:text-rose-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold border border-slate-300 text-xs">
                "{searchQuery}"
                <button type="button" onClick={() => setSearchQuery('')} className="ml-1.5 hover:text-rose-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
          </div>
        )}

      </div>

      {/* =========================================================
          4. MAP SECTION (EXISTING MAP UNTOUCHED) + DISTRICT INTELLIGENCE PANEL
          ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left GIS Leaflet Map Canvas (7 cols on desktop) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
            <div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-cyan-600" />
                <h3 className="text-sm sm:text-base font-bold text-slate-900 font-heading">
                  Geospatial Demand Intelligence
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Explore geographic concentrations of citizen infrastructure requests.
              </p>
            </div>
            
            {/* Legend */}
            <div className="flex items-center space-x-3 text-xs text-slate-600 bg-white/80 px-2.5 py-1 rounded-xl border border-slate-200 shadow-sm shrink-0">
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 mr-1.5"></span> Critical</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-orange-500 mr-1.5"></span> High</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 mr-1.5"></span> Emerging</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-blue-600 mr-1.5"></span> Lower</span>
            </div>
          </div>

          {/* Leaflet Map - DO NOT MODIFY MAP CODE */}
          <LeafletHotspotsMap
            hotspots={filteredDistricts}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={handleSelectDistrict}
            mapHeightClass="h-[480px] md:h-[560px] lg:h-[640px]"
          />
        </div>

        {/* Right District Intelligence Panel (5 cols on desktop, responsive inspector) */}
        <div ref={detailPanelRef} className="lg:col-span-5 w-full">
          {selectedDistrict ? (
            <div className="glass-panel p-6 border-2 border-blue-400/80 shadow-2xl bg-white rounded-2xl flex flex-col justify-between h-auto lg:h-[640px] overflow-y-auto space-y-5">
              
              <div className="space-y-4">
                
                {/* District Header */}
                <div className="flex items-start justify-between pb-3.5 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 block">
                      DISTRICT INTELLIGENCE
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 font-heading">
                      {selectedDistrict.name}
                    </h3>
                    <span className="text-xs font-semibold text-slate-500">{selectedDistrict.state}</span>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-black shadow-sm ${
                    selectedDistrict.hotspotLevel === 'Critical' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                    selectedDistrict.hotspotLevel === 'High' ? 'bg-orange-100 text-orange-800 border border-orange-300' :
                    selectedDistrict.hotspotLevel === 'Emerging' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' :
                    'bg-blue-100 text-blue-800 border border-blue-300'
                  }`}>
                    {selectedDistrict.hotspotLevel === 'Critical' ? '🔴 CRITICAL HOTSPOT' :
                     selectedDistrict.hotspotLevel === 'High' ? '🟠 HIGH PRIORITY' : 
                     selectedDistrict.hotspotLevel === 'Emerging' ? '🟡 EMERGING DEMAND' : '🟢 LOWER DEMAND'}
                  </span>
                </div>

                {/* Top Metrics Row */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                    <span className="text-[10px] font-extrabold text-slate-500 uppercase block">Citizen Requests</span>
                    <span className="text-lg font-bold font-mono text-slate-900 block">{selectedDistrict.complaints}</span>
                    <span className="text-[10px] text-emerald-700 font-semibold">{selectedDistrict.trend || '+18% this month'}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                    <span className="text-[10px] font-extrabold text-slate-500 uppercase block">AI Priority Score</span>
                    <span className="text-lg font-bold font-mono text-rose-600 block">{selectedDistrict.priorityScore} / 100</span>
                    <span className="text-[10px] text-slate-500 font-semibold">Ranked High</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                    <span className="text-[10px] font-extrabold text-slate-500 uppercase block">Impact Reach</span>
                    <span className="text-lg font-bold font-mono text-blue-800 block">
                      {selectedDistrict.population ? selectedDistrict.population.toLocaleString('en-IN') : 'N/A'}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">Citizens</span>
                  </div>
                </div>

                {/* Major Infrastructure Issue */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-50/90 to-cyan-50/70 border border-blue-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase text-blue-900 tracking-wider">MAJOR INFRASTRUCTURE ISSUE</span>
                    <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded border border-blue-200 text-blue-700">{selectedDistrict.category}</span>
                  </div>
                  <p className="font-bold text-slate-900 text-sm leading-snug">{selectedDistrict.majorIssue}</p>
                  {selectedDistrict.affectedService && (
                    <span className="text-[11px] text-slate-600 block font-medium">
                      Affected Service: <strong className="text-slate-800">{selectedDistrict.affectedService}</strong>
                    </span>
                  )}
                </div>

                {/* Priority Breakdown Progress Bars */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between text-xs border-b border-slate-200 pb-1.5">
                    <span className="font-extrabold text-slate-800">WHY THIS DISTRICT IS PRIORITIZED</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      AI Confidence: 94%
                    </span>
                  </div>

                  <div className="space-y-2 text-[11px]">
                    <div>
                      <div className="flex justify-between text-slate-700 font-semibold mb-0.5">
                        <span>Citizen Demand Frequency (40%)</span>
                        <span className="font-mono font-bold text-slate-900">{selectedDistrict.priorityBreakdown?.citizenDemand || 92} / 100</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${selectedDistrict.priorityBreakdown?.citizenDemand || 92}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-700 font-semibold mb-0.5">
                        <span>Infrastructure Deficit Gap (25%)</span>
                        <span className="font-mono font-bold text-slate-900">{selectedDistrict.priorityBreakdown?.infraGap || 95} / 100</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-rose-500 h-1.5 rounded-full" style={{ width: `${selectedDistrict.priorityBreakdown?.infraGap || 95}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-700 font-semibold mb-0.5">
                        <span>Essential Service Criticality (20%)</span>
                        <span className="font-mono font-bold text-slate-900">{selectedDistrict.priorityBreakdown?.serviceCriticality || 90} / 100</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${selectedDistrict.priorityBreakdown?.serviceCriticality || 90}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-700 font-semibold mb-0.5">
                        <span>Affected Population Reach (15%)</span>
                        <span className="font-mono font-bold text-slate-900">{selectedDistrict.priorityBreakdown?.impactPopulation || 78} / 100</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-cyan-600 h-1.5 rounded-full" style={{ width: `${selectedDistrict.priorityBreakdown?.impactPopulation || 78}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Insight & Recommended Intervention */}
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase text-slate-500 block">AI INSIGHT</span>
                    <p className="text-slate-700 leading-relaxed text-[11px]">
                      {selectedDistrict.summary || "High citizen demand combined with infrastructure deficit and essential-service dependency has increased the district's priority level."}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase text-emerald-800 block">RECOMMENDED INTERVENTION</span>
                    <p className="text-emerald-950 font-semibold leading-relaxed text-[11px]">
                      Prioritize targeted infrastructure rehabilitation for {selectedDistrict.majorIssue.toLowerCase()} in high-demand gram panchayats.
                    </p>
                  </div>
                </div>

                {/* Collapsible: Why this hotspot? */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setIsWhyHotspotOpen(!isWhyHotspotOpen)}
                    className="w-full p-2.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-bold text-slate-800 transition"
                  >
                    <span className="flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>Why is this a hotspot?</span>
                    </span>
                    {isWhyHotspotOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </button>

                  {isWhyHotspotOpen && (
                    <div className="p-3 bg-white space-y-1.5 text-[11px] text-slate-700">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Citizen demand volume: <strong>{selectedDistrict.complaints} verified requests</strong></span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Infrastructure deficit index: <strong>{selectedDistrict.priorityBreakdown?.infraGap || 90}% critical gap</strong></span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Essential service criticality: <strong>{selectedDistrict.affectedService || 'Vital Civic Access'}</strong></span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Population impact: <strong>{selectedDistrict.population?.toLocaleString('en-IN')} citizens</strong></span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Recent demand trend: <strong>{selectedDistrict.trend || '+15% this month'}</strong></span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Citizen Demand Trend Analytics */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase text-slate-500">CITIZEN DEMAND TREND</span>
                    <div className="flex items-center space-x-1">
                      {['7 Days', '30 Days', '3 Months'].map((period) => (
                        <button
                          key={period}
                          type="button"
                          onClick={() => setTrendPeriod(period)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                            trendPeriod === period
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-200/80 text-slate-600 hover:bg-slate-300'
                          }`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-500 text-[10px] block">Cluster Growth Rate</span>
                      <strong className="text-emerald-700 font-mono font-bold text-sm">
                        {selectedDistrict.trend || '+21% escalation'}
                      </strong>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium italic">
                      Prototype dataset trend model
                    </span>
                  </div>
                </div>

              </div>

              {/* Action Button: Connects naturally to Recommendations */}
              <div className="pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => navigate(`/recommendations?district=${encodeURIComponent(selectedDistrict.name)}`)}
                  className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-lg shadow-blue-700/25 transition flex items-center justify-center space-x-2"
                >
                  <span>Generate / View AI Recommendation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : (
            <div className="glass-panel p-6 border border-slate-200 flex flex-col items-center justify-center h-[560px] text-center rounded-2xl space-y-3">
              <MapPin className="w-8 h-8 text-slate-400" />
              <p className="text-xs font-semibold text-slate-500">
                Select a hotspot from the map or cards to view district intelligence.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* =========================================================
          5. AI DEMAND INSIGHTS & ANALYTICS (3 ANALYTICAL CARDS)
          ========================================================= */}
      <div className="space-y-4 pt-2">
        <div className="border-b border-slate-200 pb-2">
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span>AI Demand Insights & Analytics</span>
          </h3>
          <p className="text-xs text-slate-500">
            Algorithmic aggregations calculated dynamically from the active hotspot dataset.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Demand by Infrastructure Category */}
          <div className="glass-panel p-5 border border-slate-200 bg-white rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Demand by Infrastructure Category</span>
              </h4>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {categoryBreakdown.length} Categories
              </span>
            </div>

            <div className="space-y-3">
              {categoryBreakdown.map((cat, idx) => {
                const barColors = [
                  'bg-blue-600',
                  'bg-cyan-500',
                  'bg-rose-500',
                  'bg-amber-500',
                  'bg-emerald-500',
                  'bg-indigo-500'
                ];
                const color = barColors[idx % barColors.length];

                return (
                  <div key={cat.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-700">{cat.name}</span>
                      <span className="font-mono text-slate-500">
                        <strong className="text-slate-900 font-bold">{cat.count}</strong> ({cat.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`${color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${cat.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 2: State-Level Demand Distribution (Interactive!) */}
          <div className="glass-panel p-5 border border-slate-200 bg-white rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                <Globe className="w-4 h-4 text-indigo-600" />
                <span>State-Level Demand Distribution</span>
              </h4>
              <span className="text-[10px] text-slate-500 italic">Click state to filter</span>
            </div>

            <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
              {stateDistribution.map((item) => {
                const isSelected = stateFilter === item.state;
                return (
                  <button
                    key={item.state}
                    type="button"
                    onClick={() => setStateFilter(stateFilter === item.state ? 'All' : item.state)}
                    className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-xs transition text-left ${
                      isSelected
                        ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-400/20'
                        : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-800">{item.state}</span>
                      {item.critical > 0 && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-100 text-rose-700">
                          {item.critical} Critical
                        </span>
                      )}
                    </div>
                    <span className="font-mono font-bold text-blue-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      {item.count} {item.count === 1 ? 'hotspot' : 'hotspots'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card 3: AI Demand Insights */}
          <div className="glass-panel p-5 border border-slate-200 bg-white rounded-2xl shadow-sm space-y-3.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>AI Demand Insights</span>
              </h4>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Algorithmic
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 space-y-0.5">
                <strong className="text-blue-900 font-bold block text-[11px]">Primary Sector Driver</strong>
                <p className="text-slate-700 leading-snug">
                  <strong>{topCategory}</strong> represents the highest volume of citizen requests across the national network.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-100 space-y-0.5">
                <strong className="text-rose-900 font-bold block text-[11px]">Critical Urgency Ratio</strong>
                <p className="text-slate-700 leading-snug">
                  <strong>{criticalHotspotsCount} districts ({criticalRatio}%)</strong> require immediate intervention due to compounding infrastructure gaps.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                <strong className="text-slate-900 font-bold block text-[11px]">Geographic Concentration</strong>
                <p className="text-slate-700 leading-snug">
                  Highest clustering is in <strong>{topState}</strong> with multi-block service dependency reported.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================
          6. ALL DISTRICT HOTSPOT CARDS (RESPONSIVE GRID)
          ========================================================= */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 font-heading">
              All District Hotspot Cards ({filteredDistricts.length})
            </h3>
            <p className="text-xs text-slate-500">
              Click any card to focus and inspect the district on the interactive GIS Map canvas.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-cyan-800 font-bold bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
              {filteredDistricts.length} Nodes Active
            </span>
          </div>
        </div>

        {/* Empty State if No Match */}
        {filteredDistricts.length === 0 ? (
          <div className="glass-panel p-10 text-center border border-slate-200 bg-white rounded-2xl space-y-4">
            <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900">No Hotspots Found</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try adjusting your search query, state, category, time period, or severity filter.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-blue-700 text-white font-bold text-xs shadow hover:bg-blue-800 transition"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          /* 3-Col Desktop, 2-Col Tablet, 1-Col Mobile Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDistricts.map((dist) => {
              const isSelected = selectedDistrict?.id === dist.id;
              const isCompared = comparedDistricts.some(d => d.id === dist.id);

              return (
                <div
                  key={dist.id}
                  onClick={() => handleSelectDistrict(dist)}
                  className={`glass-panel p-5 border-2 rounded-2xl transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-sm hover:shadow-lg min-w-0 ${
                    isSelected
                      ? 'border-blue-500 ring-4 ring-blue-500/15 bg-blue-50/20'
                      : 'border-slate-200/90 hover:border-blue-300 bg-white'
                  }`}
                >
                  <div className="space-y-3">
                    
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-base font-black text-slate-900 font-heading">
                          {dist.name}
                        </h4>
                        <span className="text-xs font-semibold text-slate-500">{dist.state}</span>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                          dist.hotspotLevel === 'Critical' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                          dist.hotspotLevel === 'High' ? 'bg-orange-100 text-orange-800 border border-orange-300' : 
                          dist.hotspotLevel === 'Emerging' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' :
                          'bg-blue-100 text-blue-800 border border-blue-300'
                        }`}>
                          {dist.hotspotLevel}
                        </span>

                        {/* Compare Checkbox */}
                        <button
                          type="button"
                          title="Add to comparison (up to 3)"
                          onClick={(e) => toggleCompareDistrict(dist, e)}
                          className={`p-1 rounded-md border text-xs transition ${
                            isCompared
                              ? 'bg-blue-700 text-white border-blue-700'
                              : 'bg-slate-50 text-slate-400 hover:text-slate-700 border-slate-200'
                          }`}
                        >
                          <Scale className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Major Infrastructure Issue */}
                    <div className="text-xs text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-extrabold uppercase text-slate-500">
                        <span>Major Infrastructure Issue</span>
                        <span className="text-blue-700 font-bold">{dist.category}</span>
                      </div>
                      <p className="font-bold text-slate-900 leading-snug">{dist.majorIssue}</p>
                    </div>

                    {/* KPI Mini Grid */}
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center">
                        <span className="text-[10px] text-slate-500 block font-semibold">Requests</span>
                        <strong className="font-mono font-bold text-slate-900 text-sm">{dist.complaints}</strong>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center">
                        <span className="text-[10px] text-slate-500 block font-semibold">AI Score</span>
                        <strong className="font-mono font-bold text-rose-600 text-sm">{dist.priorityScore}/100</strong>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center">
                        <span className="text-[10px] text-slate-500 block font-semibold">Affected</span>
                        <strong className="font-mono font-bold text-blue-700 text-xs truncate block">
                          {dist.population ? dist.population.toLocaleString('en-IN') : 'N/A'}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="text-[11px] text-emerald-700 font-semibold">{dist.trend || '+15% this month'}</span>
                    <span className="text-blue-700 font-bold flex items-center hover:translate-x-1 transition-transform">
                      Select on Map <ChevronRight className="w-4 h-4 ml-0.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* =========================================================
          7. FROM CITIZEN VOICE TO INFRASTRUCTURE ACTION (DECISION SUPPORT)
          ========================================================= */}
      <div className="glass-panel p-6 sm:p-8 border border-slate-200 bg-white rounded-2xl shadow-sm space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-700 bg-cyan-100/90 px-3 py-1 rounded-full border border-cyan-300">
            DPI Architectural Storyline
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
            From Citizen Voice to Infrastructure Action
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            How JanConnect AI transforms multilingual feedback into targeted public capital expenditure recommendations.
          </p>
        </div>

        {/* 6-Stage Process Pipeline */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          
          {/* Step 1 */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2 relative">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs mx-auto">
              1
            </div>
            <strong className="text-xs font-bold text-slate-900 block font-heading">Citizen Requests</strong>
            <p className="text-[10px] text-slate-500 leading-tight">Multilingual Voice, WhatsApp & SMS</p>
          </div>

          {/* Step 2 */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2 relative">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs mx-auto">
              2
            </div>
            <strong className="text-xs font-bold text-slate-900 block font-heading">AI Classification</strong>
            <p className="text-[10px] text-slate-500 leading-tight">12 Indic Languages & Sector Tagging</p>
          </div>

          {/* Step 3 */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2 relative">
            <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-xs mx-auto">
              3
            </div>
            <strong className="text-xs font-bold text-slate-900 block font-heading">Hotspot Detection</strong>
            <p className="text-[10px] text-slate-500 leading-tight">Geospatial Density & Gap Mapping</p>
          </div>

          {/* Step 4 */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2 relative">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs mx-auto">
              4
            </div>
            <strong className="text-xs font-bold text-slate-900 block font-heading">Priority Scoring</strong>
            <p className="text-[10px] text-slate-500 leading-tight">4-Factor Transparent Governance Math</p>
          </div>

          {/* Step 5 */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2 relative">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs mx-auto">
              5
            </div>
            <strong className="text-xs font-bold text-slate-900 block font-heading">AI Recommendation</strong>
            <p className="text-[10px] text-slate-500 leading-tight">Ranked DPR Projects & Budgets</p>
          </div>

          {/* Step 6 */}
          <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-300 text-center space-y-2 relative">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mx-auto">
              6
            </div>
            <strong className="text-xs font-bold text-emerald-950 block font-heading">Decision Support</strong>
            <p className="text-[10px] text-emerald-800 leading-tight">Targeted Governance Action</p>
          </div>

        </div>

        {/* Action Link to Recommendations */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest block">
              Actionable Governance Pipeline
            </span>
            <h4 className="text-base font-bold font-heading">
              Ready to convert hotspot intelligence into budgeted projects?
            </h4>
          </div>
          <button
            type="button"
            onClick={() => navigate('/recommendations')}
            className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs shadow-lg transition flex items-center space-x-2 shrink-0"
          >
            <span>Explore AI Recommendations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* =========================================================
          8. PRIORITY SCORE FORMULA MODAL
          ========================================================= */}
      {isPriorityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel p-6 sm:p-8 border border-slate-200 shadow-2xl max-w-xl w-full bg-white space-y-5 rounded-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600">
                  Algorithmic Governance Transparency
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                  How Priority Score Works
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPriorityModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
              <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                Composite Multi-Factor Formula
              </span>
              <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 font-mono text-xs text-cyan-300">
                Priority Score = (40% × Demand) + (25% × Infra Gap) + (20% × Service Criticality) + (15% × Population Reach)
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>1. Citizen Demand Frequency</span>
                  <span className="text-blue-700">Weight: 40%</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Aggregated volume of citizen complaints submitted via voice logs, SMS, and WhatsApp bot.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>2. Infrastructure Deficit Gap</span>
                  <span className="text-rose-700">Weight: 25%</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Census and administrative deficit index showing physical deficiency in existing facilities.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>3. Essential Service Criticality</span>
                  <span className="text-amber-700">Weight: 20%</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Urgency score based on impact on life, healthcare emergency transit, and school access.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>4. Affected Population Reach</span>
                  <span className="text-cyan-700">Weight: 15%</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Estimated number of rural and urban citizens benefiting from project resolution.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-slate-700">
              <p className="text-[11px] leading-relaxed">
                <strong>Prototype Transparency Notice:</strong> The prototype priority score combines citizen demand and infrastructure-related indicators to support prioritization without black-box bias.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsPriorityModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Close Model Info
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================
          9. DISTRICT COMPARISON MODAL
          ========================================================= */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel p-6 sm:p-8 border border-slate-200 shadow-2xl max-w-3xl w-full bg-white space-y-5 rounded-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600">
                  Multi-District Comparison Engine
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                  Comparing {comparedDistricts.length} Districts
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCompareModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                    <th className="p-3 font-bold">Metric / Indicator</th>
                    {comparedDistricts.map((d) => (
                      <th key={d.id} className="p-3 font-bold text-slate-900 font-heading">
                        {d.name} ({d.state.slice(0, 2).toUpperCase()})
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="p-3 font-semibold text-slate-500">Hotspot Severity</td>
                    {comparedDistricts.map((d) => (
                      <td key={d.id} className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          d.hotspotLevel === 'Critical' ? 'bg-rose-100 text-rose-800' :
                          d.hotspotLevel === 'High' ? 'bg-orange-100 text-orange-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {d.hotspotLevel}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-500">Citizen Requests</td>
                    {comparedDistricts.map((d) => (
                      <td key={d.id} className="p-3 font-mono font-bold text-slate-900">
                        {d.complaints} inputs
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-500">AI Priority Score</td>
                    {comparedDistricts.map((d) => (
                      <td key={d.id} className="p-3 font-mono font-bold text-rose-600">
                        {d.priorityScore} / 100
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-500">Affected Population</td>
                    {comparedDistricts.map((d) => (
                      <td key={d.id} className="p-3 font-mono">
                        {d.population ? d.population.toLocaleString('en-IN') : 'N/A'} citizens
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-500">Major Issue</td>
                    {comparedDistricts.map((d) => (
                      <td key={d.id} className="p-3 text-[11px] font-medium leading-snug">
                        {d.majorIssue}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-500">Demand Trend</td>
                    {comparedDistricts.map((d) => (
                      <td key={d.id} className="p-3 font-bold text-emerald-700 text-[11px]">
                        {d.trend || '+15% this month'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setComparedDistricts([])}
                className="text-xs text-rose-600 font-bold hover:underline"
              >
                Clear Comparison
              </button>
              <button
                type="button"
                onClick={() => setIsCompareModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Close Comparison
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
