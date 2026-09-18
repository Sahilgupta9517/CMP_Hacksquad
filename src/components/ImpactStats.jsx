import React from 'react';
import { 
  Users, 
  MapPin, 
  Building2, 
  AlertTriangle, 
  TrendingUp, 
  Info,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export default function ImpactStats({ requestsCount = 8, hotspotsCount = 8, statesCount = 12 }) {
  // Calculated base demonstration metrics combined with active records
  const totalCitizenRequests = 12840 + requestsCount;
  const totalHotspots = 742;
  const totalStates = 28;
  const totalGapsIdentified = 64;

  const stats = [
    {
      id: 'requests',
      label: 'Citizen Requests',
      value: totalCitizenRequests.toLocaleString('en-IN'),
      trend: '+18.4%',
      trendLabel: 'this month',
      trendPositive: true,
      icon: Users,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'hotspots',
      label: 'Demand Hotspots',
      value: totalHotspots.toLocaleString('en-IN'),
      trend: '+7.2%',
      trendLabel: 'indexed',
      trendPositive: true,
      icon: MapPin,
      iconColor: 'text-rose-600',
      iconBg: 'bg-rose-50',
      borderColor: 'border-rose-200'
    },
    {
      id: 'states',
      label: 'States / UTs Active',
      value: totalStates.toString(),
      trend: '100% Pan-India',
      trendLabel: 'interoperable',
      trendPositive: true,
      icon: Building2,
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    },
    {
      id: 'gaps',
      label: 'Infrastructure Gaps',
      value: totalGapsIdentified.toString(),
      trend: '4 Active Plans',
      trendLabel: 'AI prioritized',
      trendPositive: true,
      icon: AlertTriangle,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
      borderColor: 'border-amber-200'
    }
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-blue-700" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            National DPI Impact & Aggregation Metrics
          </h2>
        </div>
        <span className="inline-flex items-center space-x-1 text-10px font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
          <Info className="w-3 h-3 text-slate-400" />
          <span>Prototype Demo Dataset (Synced with Local/Live Supabase)</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm-grid-cols-2 lg-grid-cols-4 gap-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="gov-card p-5 border border-slate-200 hover:border-blue-300 transition flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  {item.label}
                </span>
                <div className={`p-2 rounded-xl ${item.iconBg} ${item.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] font-heading font-mono">
                  {item.value}
                </div>
                
                <div className="flex items-center space-x-1.5 text-xs">
                  <span className="inline-flex items-center text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded text-11px">
                    <TrendingUp className="w-3 h-3 mr-0.5" />
                    {item.trend}
                  </span>
                  <span className="text-slate-500 text-11px">{item.trendLabel}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
