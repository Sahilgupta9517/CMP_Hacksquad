import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, AlertCircle, RefreshCw, Layers, ShieldCheck, Info } from 'lucide-react';

// Custom dark map styling for JanConnect AI theme
const DARK_MAP_STYLES = [
  { elementType: 'geometry', stylers: [{ color: '#0b1329' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0b1329' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#748bba' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#38bdf8' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#64748b' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#0d1f38' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#1e293b' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#0f172a' }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#94a3b8' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#1e3a8a' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1e293b' }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#1e293b' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#030816' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#38bdf8' }]
  }
];

export default function GoogleHotspotsMap({
  hotspots = [],
  selectedDistrict = null,
  onSelectDistrict = () => {},
  mapHeightClass = 'h-[520px] md:h-[580px] lg:h-[620px]'
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [loadError, setLoadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || 'DEMO_MAP_ID';

  const initMap = async () => {
    setIsLoading(true);
    setLoadError(false);
    setErrorMessage('');

    if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
      setLoadError(true);
      setErrorMessage('Google Maps API key is not configured in VITE_GOOGLE_MAPS_API_KEY environment variable.');
      setIsLoading(false);
      return;
    }

    try {
      const loader = new Loader({
        apiKey: apiKey,
        version: 'weekly',
        libraries: ['marker', 'places', 'geometry']
      });

      const { Map } = await loader.importLibrary('maps');
      let AdvancedMarkerElement = null;
      try {
        const markerLib = await loader.importLibrary('marker');
        AdvancedMarkerElement = markerLib.AdvancedMarkerElement;
      } catch (e) {
        console.warn('AdvancedMarkerElement not available, falling back to standard Marker', e);
      }

      if (!mapContainerRef.current) return;

      // Initialize map instance centered on India
      const mapOptions = {
        center: { lat: 22.5937, lng: 78.9629 },
        zoom: 5,
        styles: DARK_MAP_STYLES,
        mapId: mapId,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true
      };

      const map = new Map(mapContainerRef.current, mapOptions);
      mapInstanceRef.current = map;

      // Clear old markers
      markersRef.current.forEach((m) => {
        if (m.setMap) m.setMap(null);
        else if (m.map) m.map = null;
      });
      markersRef.current = [];

      // Add markers for hotspots
      hotspots.forEach((dist) => {
        if (!dist.lat || !dist.lng) return;

        const isSelected = selectedDistrict?.id === dist.id;
        const isCritical = dist.hotspotLevel === 'Critical';
        const isHigh = dist.hotspotLevel === 'High';
        const isEmerging = dist.hotspotLevel === 'Emerging';

        const colorHex = isCritical
          ? '#EF4444'
          : isHigh
          ? '#F97316'
          : isEmerging
          ? '#EAB308'
          : '#3B82F6';

        if (AdvancedMarkerElement) {
          // Modern AdvancedMarkerElement
          const pinContent = document.createElement('div');
          pinContent.className = 'relative group cursor-pointer';
          pinContent.innerHTML = `
            <div class="flex flex-col items-center">
              <div class="relative flex items-center justify-center">
                ${
                  isCritical
                    ? `<span class="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-rose-500 opacity-65"></span>`
                    : ''
                }
                <div class="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center font-bold text-[11px] text-white shadow-xl transition-transform duration-200 group-hover:scale-110 ${
                  isSelected ? 'scale-125 ring-4 ring-cyan-400' : ''
                }" style="background-color: ${colorHex}; font-family: monospace;">
                  ${dist.priorityScore || 90}
                </div>
              </div>
              <div class="mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold text-white shadow-md border border-slate-700 whitespace-nowrap bg-slate-950/90 transition-colors">
                ${dist.name} (${dist.state ? dist.state.slice(0, 2).toUpperCase() : 'IN'})
              </div>
            </div>
          `;

          const marker = new AdvancedMarkerElement({
            map: map,
            position: { lat: Number(dist.lat), lng: Number(dist.lng) },
            title: `${dist.name} (${dist.hotspotLevel} - Score: ${dist.priorityScore})`,
            content: pinContent
          });

          marker.addListener('click', () => {
            onSelectDistrict(dist);
            map.panTo({ lat: Number(dist.lat), lng: Number(dist.lng) });
            map.setZoom(7);
          });

          markersRef.current.push(marker);
        } else {
          // Standard Marker Fallback
          const marker = new window.google.maps.Marker({
            position: { lat: Number(dist.lat), lng: Number(dist.lng) },
            map: map,
            title: `${dist.name} - ${dist.hotspotLevel} Hotspot`,
            label: {
              text: `${dist.priorityScore}`,
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: '10px'
            }
          });

          marker.addListener('click', () => {
            onSelectDistrict(dist);
            map.panTo({ lat: Number(dist.lat), lng: Number(dist.lng) });
            map.setZoom(7);
          });

          markersRef.current.push(marker);
        }
      });

      setIsLoading(false);
    } catch (err) {
      console.error('Google Maps Load Error:', err);
      setLoadError(true);
      setErrorMessage(err.message || 'Failed to initialize Google Maps. Please check your network or API key settings.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initMap();
  }, [apiKey]);

  // Center map on selected district when changed
  useEffect(() => {
    if (mapInstanceRef.current && selectedDistrict?.lat && selectedDistrict?.lng) {
      mapInstanceRef.current.panTo({
        lat: Number(selectedDistrict.lat),
        lng: Number(selectedDistrict.lng)
      });
      mapInstanceRef.current.setZoom(7);
    }
  }, [selectedDistrict]);

  if (loadError) {
    return (
      <div className={`${mapHeightClass} w-full rounded-2xl glass-panel p-6 border border-rose-500/30 bg-slate-950 flex flex-col items-center justify-center text-center space-y-4 text-white relative overflow-hidden shadow-2xl`}>
        <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 animate-pulse">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="max-w-md space-y-2">
          <h3 className="text-lg font-extrabold text-white font-heading">
            Interactive Google Map Unavailable
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {errorMessage || 'Google Maps configuration is unavailable or key restriction active.'}
          </p>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300 text-left space-y-1">
            <span className="text-slate-400 font-sans block text-[10px] uppercase font-bold">Developer Environment Key:</span>
            <span>VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key</span>
          </div>
        </div>
        <div className="flex items-center space-x-3 pt-2">
          <button
            type="button"
            onClick={initMap}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition flex items-center space-x-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Map Load</span>
          </button>
        </div>
        <div className="text-[10px] text-emerald-400 flex items-center space-x-1 pt-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Hotspot dataset and list cards remain 100% operational below.</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${mapHeightClass} rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 bg-slate-950`}>
      {isLoading && (
        <div className="absolute inset-0 bg-slate-950/90 z-20 flex flex-col items-center justify-center space-y-3 text-cyan-400">
          <RefreshCw className="w-8 h-8 animate-spin" />
          <span className="text-xs font-mono font-semibold">Loading Official Google Maps GIS Canvas...</span>
        </div>
      )}
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}
