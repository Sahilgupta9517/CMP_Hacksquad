import React, { useState } from 'react';
import { 
  MapPin, 
  TrendingUp, 
  AlertOctagon, 
  Info, 
  ChevronRight, 
  Building, 
  Users, 
  Layers,
  Sparkles,
  ExternalLink,
  X
} from 'lucide-react';

export default function DemandHotspotsMap({ hotspots = [], onSelectDistrict }) {
  const [selectedHotspot, setSelectedHotspot] = useState(hotspots[0] || null);
  const [filterLevel, setFilterLevel] = useState('All');

  const filteredHotspots = hotspots.filter(h => {
    if (filterLevel === 'All') return true;
    return h.demandLevel.toLowerCase().includes(filterLevel.toLowerCase());
  });

  return (
    <section id="hotspots" className="mb-14 scroll-mt-20">
      
      {/* Header */}
      <div className="flex flex-col sm-flex-row sm-items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <MapPin className="w-5 h-5 text-rose-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#0A192F] font-heading">
              NATIONAL DEMAND HOTSPOTS
            </h2>
          </div>
          <p className="text-sm text-slate-600">
            Where citizen demand is concentrated across diverse linguistic regions
          </p>
        </div>

        {/* Prototype Data Tag & Filters */}
        <div className="flex items-center space-x-2">
          <span className="gov-badge gov-badge-saffron">
            Prototype / Demo Dataset
          </span>

          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
            {['All', 'Critical', 'High', 'Emerging'].map((level) => (
              <button
                key={level}
                onClick={() => setFilterLevel(level)}
                className={`px-2.5 py-1 rounded-md font-semibold transition ${
                  filterLevel === level
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Demand Level Legend */}
      <div className="gov-card p-3 mb-6 bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-bold text-slate-700 text-11px uppercase tracking-wider">Demand Intensity Legend:</span>
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-600"></span>
            <strong className="text-slate-800">Critical (&gt;90)</strong>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <strong className="text-slate-800">High (75-90)</strong>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <strong className="text-slate-800">Emerging (60-75)</strong>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
            <strong className="text-slate-800">Lower Demand (&lt;60)</strong>
          </span>
        </div>
      </div>

      {/* Main Grid: Interactive Map Visualizer vs District Inspector */}
      <div className="grid grid-cols-1 lg-grid-cols-12 gap-8">
        
        {/* Left Interactive Map Visualizer (7 cols) */}
        <div className="lg-col-span-7 gov-card p-6 border border-slate-200 flex flex-col justify-between h-[540px] relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#0A192F] to-slate-950 text-white">
          
          <div className="flex items-center justify-between z-10">
            <div>
              <h3 className="text-sm font-bold text-white font-heading">
                Interactive National Geographic Cluster
              </h3>
              <p className="text-11px text-slate-400">
                Click any district hotspot marker to inspect citizen demand breakdown
              </p>
            </div>
            <span className="text-10px font-mono bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 text-slate-300">
              India GIS DPI Grid
            </span>
          </div>

          {/* India Regional Map Canvas with Nodes */}
          <div className="relative w-full flex-1 flex items-center justify-center my-2">
            
            {/* Background Grid Lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>

            {/* India Approximate Outline Coordinates SVG */}
            <svg viewBox="0 0 600 650" className="w-full h-full max-h-[400px] opacity-25">
              <path
                d="M 280,30 L 330,60 L 370,120 L 420,160 L 480,180 L 530,220 L 490,260 L 440,240 L 400,280 L 380,340 L 360,400 L 340,480 L 300,580 L 260,540 L 240,460 L 210,380 L 180,320 L 140,280 L 120,220 L 160,180 L 200,120 L 250,80 Z"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>

            {/* Hotspot District Nodes on India Map Canvas */}
            
            {/* 1. Purnia, Bihar */}
            <div 
              onClick={() => setSelectedHotspot(hotspots.find(h => h.district === 'Purnia'))}
              className="absolute top-[28%] right-[32%] flex flex-col items-center cursor-pointer group z-20"
            >
              <span className="relative flex h-6 w-6">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className={`relative inline-flex rounded-full h-6 w-6 bg-rose-600 text-[10px] font-bold text-white items-center justify-center shadow-lg border-2 border-white ${selectedHotspot?.district === 'Purnia' ? 'ring-4 ring-rose-400' : ''}`}>
                  91
                </span>
              </span>
              <span className="text-[10px] font-bold text-white mt-1 bg-slate-900/90 px-2 py-0.5 rounded shadow border border-rose-500/50 group-hover:scale-105 transition">
                Purnia (BR)
              </span>
            </div>

            {/* 2. Gadchiroli, Maharashtra */}
            <div 
              onClick={() => setSelectedHotspot(hotspots.find(h => h.district === 'Gadchiroli'))}
              className="absolute top-[48%] left-[42%] flex flex-col items-center cursor-pointer group z-20"
            >
              <span className="relative flex h-6 w-6">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className={`relative inline-flex rounded-full h-6 w-6 bg-amber-500 text-[10px] font-bold text-slate-950 items-center justify-center shadow-lg border-2 border-white ${selectedHotspot?.district === 'Gadchiroli' ? 'ring-4 ring-amber-400' : ''}`}>
                  89
                </span>
              </span>
              <span className="text-[10px] font-bold text-white mt-1 bg-slate-900/90 px-2 py-0.5 rounded shadow border border-amber-500/50 group-hover:scale-105 transition">
                Gadchiroli (MH)
              </span>
            </div>

            {/* 3. Kalahandi, Odisha */}
            <div 
              onClick={() => setSelectedHotspot(hotspots.find(h => h.district === 'Kalahandi'))}
              className="absolute top-[46%] right-[34%] flex flex-col items-center cursor-pointer group z-20"
            >
              <span className="relative flex h-6 w-6">
                <span className={`relative inline-flex rounded-full h-6 w-6 bg-amber-500 text-[10px] font-bold text-slate-950 items-center justify-center shadow-lg border-2 border-white ${selectedHotspot?.district === 'Kalahandi' ? 'ring-4 ring-amber-400' : ''}`}>
                  87
                </span>
              </span>
              <span className="text-[10px] font-bold text-white mt-1 bg-slate-900/90 px-2 py-0.5 rounded shadow border border-amber-500/50 group-hover:scale-105 transition">
                Kalahandi (OD)
              </span>
            </div>

            {/* 4. Barmer, Rajasthan */}
            <div 
              onClick={() => setSelectedHotspot(hotspots.find(h => h.district === 'Barmer'))}
              className="absolute top-[34%] left-[22%] flex flex-col items-center cursor-pointer group z-20"
            >
              <span className="relative flex h-5 w-5">
                <span className="relative inline-flex rounded-full h-5 w-5 bg-amber-500 text-[9px] font-bold text-slate-950 items-center justify-center shadow-lg border border-white">
                  84
                </span>
              </span>
              <span className="text-[10px] font-bold text-white mt-1 bg-slate-900/90 px-1.5 py-0.5 rounded shadow border border-slate-700">
                Barmer (RJ)
              </span>
            </div>

            {/* 5. Ludhiana, Punjab */}
            <div 
              onClick={() => setSelectedHotspot(hotspots.find(h => h.district === 'Ludhiana'))}
              className="absolute top-[18%] left-[30%] flex flex-col items-center cursor-pointer group z-20"
            >
              <span className="relative flex h-5 w-5">
                <span className="relative inline-flex rounded-full h-5 w-5 bg-yellow-400 text-[9px] font-bold text-slate-950 items-center justify-center shadow-lg border border-white">
                  82
                </span>
              </span>
              <span className="text-[10px] font-bold text-white mt-1 bg-slate-900/90 px-1.5 py-0.5 rounded shadow border border-slate-700">
                Ludhiana (PB)
              </span>
            </div>

            {/* 6. Gorakhpur, UP */}
            <div 
              onClick={() => setSelectedHotspot(hotspots.find(h => h.district === 'Gorakhpur'))}
              className="absolute top-[26%] left-[45%] flex flex-col items-center cursor-pointer group z-20"
            >
              <span className="relative flex h-5 w-5">
                <span className="relative inline-flex rounded-full h-5 w-5 bg-yellow-400 text-[9px] font-bold text-slate-950 items-center justify-center shadow-lg border border-white">
                  76
                </span>
              </span>
              <span className="text-[10px] font-bold text-white mt-1 bg-slate-900/90 px-1.5 py-0.5 rounded shadow border border-slate-700">
                Gorakhpur (UP)
              </span>
            </div>

            {/* 7. Dharmapuri, TN */}
            <div 
              onClick={() => setSelectedHotspot(hotspots.find(h => h.district === 'Dharmapuri'))}
              className="absolute top-[68%] left-[40%] flex flex-col items-center cursor-pointer group z-20"
            >
              <span className="relative flex h-5 w-5">
                <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 text-[9px] font-bold text-white items-center justify-center shadow-lg border border-white">
                  72
                </span>
              </span>
              <span className="text-[10px] font-bold text-white mt-1 bg-slate-900/90 px-1.5 py-0.5 rounded shadow border border-slate-700">
                Dharmapuri (TN)
              </span>
            </div>

            {/* 8. Wayanad, Kerala */}
            <div 
              onClick={() => setSelectedHotspot(hotspots.find(h => h.district === 'Wayanad'))}
              className="absolute bottom-[16%] left-[34%] flex flex-col items-center cursor-pointer group z-20"
            >
              <span className="relative flex h-5 w-5">
                <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 text-[9px] font-bold text-white items-center justify-center shadow-lg border border-white">
                  68
                </span>
              </span>
              <span className="text-[10px] font-bold text-white mt-1 bg-slate-900/90 px-1.5 py-0.5 rounded shadow border border-slate-700">
                Wayanad (KL)
              </span>
            </div>

          </div>

          <div className="flex items-center justify-between text-11px text-slate-400 pt-2 border-t border-slate-800 z-10">
            <span>Aggregates voice logs, WhatsApp messages, and SMS</span>
            <span className="text-amber-400 font-mono">Updated Real-Time</span>
          </div>

        </div>

        {/* Right District Detail Inspector (5 cols) */}
        <div className="lg-col-span-5 space-y-4">
          {selectedHotspot ? (
            <div className="gov-card p-6 border-2 border-blue-200 shadow-md bg-white space-y-4 flex flex-col justify-between h-[540px]">
              
              <div className="space-y-4">
                
                {/* District Header */}
                <div className="flex items-start justify-between pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-10px font-bold uppercase tracking-wider text-slate-500">
                      District Hotspot Inspector
                    </span>
                    <h3 className="text-xl font-bold text-[#0A192F] font-heading">
                      {selectedHotspot.district}, {selectedHotspot.state}
                    </h3>
                  </div>

                  <span className={`gov-badge ${
                    selectedHotspot.demandLevel === 'Critical' ? 'gov-badge-critical' :
                    selectedHotspot.demandLevel === 'High' ? 'gov-badge-high' : 'gov-badge-emerging'
                  }`}>
                    {selectedHotspot.demandLevel} Demand
                  </span>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-10px font-bold text-slate-500 uppercase block">Citizen Requests</span>
                    <span className="text-lg font-bold text-[#0A192F] font-mono">
                      {selectedHotspot.requestsCount?.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-10px text-emerald-700 font-semibold mt-0.5">
                      {selectedHotspot.trend}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-10px font-bold text-slate-500 uppercase block">AI Priority Score</span>
                    <span className="text-lg font-bold text-rose-700 font-mono">
                      {selectedHotspot.priorityScore} / 100
                    </span>
                    <span className="block text-10px text-slate-500 mt-0.5">
                      Transparent Formula
                    </span>
                  </div>

                </div>

                {/* Detail Information Rows */}
                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100">
                    <span className="text-10px font-bold text-blue-700 uppercase block">Top Infrastructure Need</span>
                    <p className="font-bold text-slate-900 text-sm mt-0.5">{selectedHotspot.topNeed}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-10px font-bold text-slate-500 uppercase block">Estimated Affected Population</span>
                    <p className="font-semibold text-slate-800 mt-0.5">{selectedHotspot.affectedPopulation}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-10px font-bold text-slate-500 uppercase block">Existing Infrastructure Deficit</span>
                    <p className="font-semibold text-slate-800 mt-0.5">{selectedHotspot.infrastructureGap}</p>
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-200">
                <a
                  href="#priority-engine"
                  className="w-full py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-sm transition flex items-center justify-center space-x-2"
                >
                  <span>View in AI Priority Engine</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>

            </div>
          ) : (
            <div className="gov-card p-6 border border-slate-200 text-center flex items-center justify-center h-[540px]">
              <p className="text-sm text-slate-500">Select a district from the map to view analytics</p>
            </div>
          )}
        </div>

      </div>

    </section>
  );
}
