import React from 'react';
import { 
  Network, 
  CheckCircle2, 
  MapPin, 
  Radio, 
  Globe2,
  Building,
  Layers
} from 'lucide-react';
import { dataService } from '../services/dataService';

export default function StateNetwork() {
  const stateNodes = dataService.getStateNetworkNodes();

  return (
    <section id="state-network" className="mb-14 scroll-mt-20">
      
      {/* Header */}
      <div className="flex flex-col sm-flex-row sm-items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <Network className="w-5 h-5 text-blue-700" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#0A192F] font-heading">
              INDIA'S SHARED CIVIC INTELLIGENCE NETWORK
            </h2>
          </div>
          <p className="text-sm text-slate-600">
            Interoperable Digital Public Infrastructure nodes deployed across state governance portals
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
          </span>
          <span className="text-xs font-bold text-emerald-700">12 Connected State Gateways</span>
        </div>
      </div>

      {/* State Node Cards Grid */}
      <div className="grid grid-cols-1 sm-grid-cols-2 md-grid-cols-3 lg-grid-cols-4 gap-4">
        {stateNodes.map((node) => (
          <div
            key={node.state}
            className="gov-card p-4 border border-slate-200 bg-white hover:border-blue-300 transition space-y-3 flex flex-col justify-between"
          >
            <div>
              
              {/* Top Bar */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: node.nodeColor }}></span>
                  <h3 className="font-bold text-sm text-[#0A192F] font-heading">
                    {node.state}
                  </h3>
                </div>

                <span className="inline-flex items-center space-x-1 text-10px font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{node.status}</span>
                </span>
              </div>

              {/* Node Stats */}
              <div className="space-y-1 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-11px">Citizen Requests</span>
                  <strong className="font-mono text-slate-900">{node.requests?.toLocaleString('en-IN')}</strong>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-11px">Demand Hotspots</span>
                  <strong className="font-mono text-rose-700">{node.hotspots}</strong>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-11px">Active Categories</span>
                  <strong className="font-mono text-slate-900">{node.categories} Sectors</strong>
                </div>
              </div>

            </div>

            {/* Bottom Interoperability Status */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-10px text-slate-400">
              <span>National DPI Protocol</span>
              <span className="text-blue-700 font-mono font-semibold">Active Sync</span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
