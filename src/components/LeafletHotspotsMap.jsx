import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ShieldCheck, MapPin } from 'lucide-react';

export default function LeafletHotspotsMap({
  hotspots = [],
  selectedDistrict = null,
  onSelectDistrict = () => {},
  mapHeightClass = 'h-[480px] md:h-[560px] lg:h-[620px]'
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  // Initialize Leaflet Map without any API Key
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Prevent duplicate initialization
    if (!mapInstanceRef.current) {
      // Create Leaflet Map instance centered on India
      const map = L.map(mapContainerRef.current, {
        center: [22.5937, 78.9629],
        zoom: 5,
        zoomControl: true,
        attributionControl: false
      });

      // Primary Tile Layer: CartoDB Dark Matter (Free, Open, No API Key Required)
      const primaryTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
      });

      // Fallback Tile Layer: OpenStreetMap Standard (Free, Open, No API Key Required)
      const fallbackTiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      });

      // Handle tile load errors gracefully
      primaryTiles.on('tileerror', () => {
        if (!map.hasLayer(fallbackTiles)) {
          map.removeLayer(primaryTiles);
          fallbackTiles.addTo(map);
        }
      });

      primaryTiles.addTo(map);

      // Custom Attribution Control
      L.control.attribution({ position: 'bottomright', prefix: 'JanConnect AI Free Open-GIS Network' }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => {
      map.removeLayer(marker);
    });
    markersRef.current = {};

    // Add interactive markers for hotspots
    hotspots.forEach((dist) => {
      if (!dist.lat || !dist.lng) return;

      const isSelected = selectedDistrict?.id === dist.id;
      const isCritical = dist.hotspotLevel === 'Critical';
      const isHigh = dist.hotspotLevel === 'High';
      const isEmerging = dist.hotspotLevel === 'Emerging';

      const colorClass = isCritical
        ? 'bg-rose-500 text-white'
        : isHigh
        ? 'bg-orange-500 text-white'
        : isEmerging
        ? 'bg-amber-400 text-slate-950'
        : 'bg-blue-600 text-white';

      // Create Custom HTML Pin Icon
      const customIcon = L.divIcon({
        className: 'custom-leaflet-pin',
        html: `
          <div class="relative flex flex-col items-center group cursor-pointer -translate-x-1/2 -translate-y-1/2">
            ${
              isCritical
                ? `<span class="animate-ping absolute inline-flex h-9 w-9 rounded-full bg-rose-500 opacity-60"></span>`
                : ''
            }
            <div class="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center font-bold text-[11px] shadow-2xl transition-all duration-300 ${colorClass} ${
              isSelected ? 'scale-125 ring-4 ring-cyan-400 border-cyan-200' : 'hover:scale-110'
            }" style="font-family: monospace;">
              ${dist.priorityScore || 90}
            </div>
            <div class="mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold text-white shadow-md border border-slate-700 whitespace-nowrap bg-slate-950/90 transition-colors">
              ${dist.name} (${dist.state ? dist.state.slice(0, 2).toUpperCase() : 'IN'})
            </div>
          </div>
        `,
        iconSize: [36, 48],
        iconAnchor: [18, 24]
      });

      const marker = L.marker([Number(dist.lat), Number(dist.lng)], { icon: customIcon }).addTo(map);

      // Interactive Tooltip
      marker.bindTooltip(
        `<div class="p-1 text-xs space-y-0.5">
          <strong class="text-slate-900 block font-heading">${dist.name}, ${dist.state}</strong>
          <span class="text-[10px] text-slate-600 block">${dist.majorIssue}</span>
          <span class="text-[10px] font-bold text-rose-600 block">Priority: ${dist.priorityScore}/100</span>
        </div>`,
        { direction: 'top', offset: [0, -20], opacity: 0.95 }
      );

      // Marker click listener
      marker.on('click', () => {
        onSelectDistrict(dist);
        map.flyTo([Number(dist.lat), Number(dist.lng)], 7, { duration: 1 });
      });

      markersRef.current[dist.id] = marker;
    });
  }, [hotspots]);

  // Center & zoom on selected district when changed
  useEffect(() => {
    if (mapInstanceRef.current && selectedDistrict?.lat && selectedDistrict?.lng) {
      mapInstanceRef.current.flyTo(
        [Number(selectedDistrict.lat), Number(selectedDistrict.lng)],
        7,
        { duration: 1.2 }
      );
    }
  }, [selectedDistrict]);

  return (
    <div className={`relative w-full ${mapHeightClass} rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 bg-slate-950`}>
      <div ref={mapContainerRef} className="w-full h-full z-10" />
    </div>
  );
}
