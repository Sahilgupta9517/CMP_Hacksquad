import { supabase, isLiveSupabaseConnected } from '../lib/supabaseClient';

// 12 Indian Languages Config
export const SUPPORTED_LANGUAGES = [
  { code: 'Hindi', label: 'हिंदी (Hindi)', script: 'Devanagari' },
  { code: 'English', label: 'English', script: 'Latin' },
  { code: 'Punjabi', label: 'ਪੰਜਾਬੀ (Punjabi)', script: 'Gurmukhi' },
  { code: 'Bengali', label: 'বাংলা (Bengali)', script: 'Bengali' },
  { code: 'Tamil', label: 'தமிழ் (Tamil)', script: 'Tamil' },
  { code: 'Telugu', label: 'తెలుగు (Telugu)', script: 'Telugu' },
  { code: 'Marathi', label: 'मराठी (Marathi)', script: 'Devanagari' },
  { code: 'Gujarati', label: 'ગુજરાતી (Gujarati)', script: 'Gujarati' },
  { code: 'Kannada', label: 'ಕನ್ನಡ (Kannada)', script: 'Kannada' },
  { code: 'Malayalam', label: 'മലയാളം (Malayalam)', script: 'Malayalam' },
  { code: 'Odia', label: 'ଓଡ଼ିଆ (Odia)', script: 'Odia' },
  { code: 'Assamese', label: 'অসমীয়া (Assamese)', script: 'Bengali-Assamese' }
];

// Rich Prototype Datasets across Indian States
const MOCK_CITIZEN_REQUESTS = [
  {
    id: 'req-101',
    ticket_id: 'JD-MH-8821',
    citizen_name: 'Rameshwar Pawar (रामेश्वर पवार)',
    channel: 'Voice',
    language: 'Marathi',
    original_text: 'आमच्या गावात प्राथमीक आरोग्य केंद्रात ऑक्सिजन सिलिंडर आणि व्हेंटिलेटर उपलब्ध नाहीत. रुग्णांना ५० किमी लांब जावे लागते.',
    translated_text: 'Our village primary health center lacks doctors, essential medicines, and emergency oxygen supply.',
    category: 'Healthcare',
    urgency_level: 'Critical',
    state: 'Maharashtra',
    district: 'Gadchiroli',
    locality: 'Dhanora Tribal Block',
    pincode: '442605',
    latitude: 20.1848,
    longitude: 80.0022,
    upvotes: 342,
    priority_score: 89,
    status: 'AI Analyzed',
    ai_confidence: 0.96,
    created_at: new Date(Date.now() - 3600000 * 3).toISOString()
  },
  {
    id: 'req-102',
    ticket_id: 'JD-BR-1102',
    citizen_name: 'Suresh Kumar Mandal (सुरेश मंडल)',
    channel: 'Voice',
    language: 'Hindi',
    original_text: 'हमारे गांव की सड़क बारिश में खराब हो जाती है और स्कूल तक पहुंचना मुश्किल हो जाता है।',
    translated_text: 'Our village rural road gets washed away in monsoons making access to secondary school impassable.',
    category: 'Roads',
    urgency_level: 'Critical',
    state: 'Bihar',
    district: 'Purnia',
    locality: 'Kasba Panchayat',
    pincode: '854301',
    latitude: 25.7771,
    longitude: 87.4753,
    upvotes: 620,
    priority_score: 91,
    status: 'In Project Plan',
    ai_confidence: 0.98,
    created_at: new Date(Date.now() - 3600000 * 6).toISOString()
  },
  {
    id: 'req-103',
    ticket_id: 'JD-OR-9042',
    citizen_name: 'Minati Majhi (ମିନାତି ମାଝୀ)',
    channel: 'WhatsApp',
    language: 'Odia',
    original_text: 'ଆମ ପଞ୍ଚାୟତରେ ପାନୀୟ ଜଳ ପାଇଁ କୂଅ ଶୁଖିଗଲାଣି। ଆମକୁ ୪ କିଲୋମିଟର ଦୂରରୁ ନଳକୂପ ପାଣି ଆଣିବାକୁ ପଡୁଛି।',
    translated_text: 'Drinking water wells in our panchayat have dried up. Women must fetch water from tube-wells 4km away.',
    category: 'Water',
    urgency_level: 'High',
    state: 'Odisha',
    district: 'Kalahandi',
    locality: 'Bhawanipatna Block',
    pincode: '766001',
    latitude: 19.9137,
    longitude: 83.1649,
    upvotes: 489,
    priority_score: 87,
    status: 'In Project Plan',
    ai_confidence: 0.94,
    created_at: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'req-104',
    ticket_id: 'JD-PB-3310',
    citizen_name: 'Harpreet Singh (ਹਰਪ੍ਰੀਤ ਸਿੰਘ)',
    channel: 'Text',
    language: 'Punjabi',
    original_text: 'ਨਹਿਰੀ ਪਾਣੀ ਦੀ ਟੇਲ ਤੇ ਪਾਣੀ ਨਹੀਂ ਪਹੁੰਚ ਰਿਹਾ, ਝੋਨੇ ਦੀ ਫਸਲ ਲਈ ਬਿਜਲੀ ਦੇ ਕੱਟ ਬਹੁਤ ਲੱਗ ਰਹੇ ਹਨ।',
    translated_text: 'Canal water tail-end is dry and agricultural feeder electricity has severe 14-hour cuts.',
    category: 'Electricity',
    urgency_level: 'High',
    state: 'Punjab',
    district: 'Ludhiana',
    locality: 'Samrala Sub-Division',
    pincode: '141114',
    latitude: 30.9010,
    longitude: 75.8573,
    upvotes: 275,
    priority_score: 82,
    status: 'AI Analyzed',
    ai_confidence: 0.93,
    created_at: new Date(Date.now() - 3600000 * 18).toISOString()
  },
  {
    id: 'req-105',
    ticket_id: 'JD-UP-4521',
    citizen_name: 'Anand Prakash Shukla (आनंद शुक्ल)',
    channel: 'WhatsApp',
    language: 'Hindi',
    original_text: 'तहसील के सरकारी स्कूल में छत टपक रही है और डिजिटल कंप्यूटर लैब बंद पड़ी है।',
    translated_text: 'Government school building ceiling leaks and the digital computer lab is non-functional.',
    category: 'Education',
    urgency_level: 'Medium',
    state: 'Uttar Pradesh',
    district: 'Gorakhpur',
    locality: 'Campierganj Block',
    pincode: '273001',
    latitude: 26.7606,
    longitude: 83.3732,
    upvotes: 198,
    priority_score: 76,
    status: 'Pending Review',
    ai_confidence: 0.91,
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 'req-106',
    ticket_id: 'JD-TN-4091',
    citizen_name: 'K. Anbarasan (கே. அன்பரசன்)',
    channel: 'Text',
    language: 'Tamil',
    original_text: 'எங்கள் கிராமத்துப் பள்ளியில் பாரத்நெட் ஃபைபர் இணைப்பு வேலை செய்யவில்லை. ஆன்லைன் கல்வி பாதிக்கப்பட்டுள்ளது.',
    translated_text: 'BharatNet high-speed fiber broadband connection in our village school is non-functional.',
    category: 'Internet / Digital Access',
    urgency_level: 'Medium',
    state: 'Tamil Nadu',
    district: 'Dharmapuri',
    locality: 'Pennagaram Taluk',
    pincode: '636701',
    latitude: 12.1211,
    longitude: 78.1582,
    upvotes: 185,
    priority_score: 72,
    status: 'Pending Review',
    ai_confidence: 0.91,
    created_at: new Date(Date.now() - 3600000 * 30).toISOString()
  },
  {
    id: 'req-107',
    ticket_id: 'JD-RJ-5512',
    citizen_name: 'Geeta Devi (गीता देवी)',
    channel: 'WhatsApp',
    language: 'Hindi',
    original_text: 'हमारे ढाणी में 24 घंटे में से केवल 2 घंटे बिजली आती है। सौर ऊर्जा मिनी-ग्रिड लगवाने का निवेदन है।',
    translated_text: 'Power supply available for only 2 hours daily. Requesting installation of Solar Micro-grid.',
    category: 'Electricity',
    urgency_level: 'High',
    state: 'Rajasthan',
    district: 'Barmer',
    locality: 'Chohtan Block',
    pincode: '344001',
    latitude: 25.7532,
    longitude: 71.4181,
    upvotes: 310,
    priority_score: 84,
    status: 'AI Analyzed',
    ai_confidence: 0.95,
    created_at: new Date(Date.now() - 3600000 * 36).toISOString()
  },
  {
    id: 'req-108',
    ticket_id: 'JD-KL-3019',
    citizen_name: 'Vineeth Nair (വിനീത് നായർ)',
    channel: 'Voice',
    language: 'Malayalam',
    original_text: 'ആദിവാസി മേഖലയിലെ പ്രൈമറി സ്കൂളിൽ അധ്യാപകരുടെ കുറവും ഡിജിറ്റൽ സ്മാർട്ട് ക്ലാസ് റൂമുകളുടെ അഭാവവുമുണ്ട്.',
    translated_text: 'Shortage of teachers and lack of digital smart classrooms in tribal area primary school.',
    category: 'Education',
    urgency_level: 'Medium',
    state: 'Kerala',
    district: 'Wayanad',
    locality: 'Sulthan Bathery',
    pincode: '673121',
    latitude: 11.6854,
    longitude: 76.1320,
    upvotes: 215,
    priority_score: 68,
    status: 'AI Analyzed',
    ai_confidence: 0.89,
    created_at: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

const MOCK_AI_PROJECTS = [
  {
    id: 'proj-1',
    project_code: 'DPI-BR-2026-04',
    title: 'Rural Road Connectivity Improvement & Elevated Culverts',
    category: 'Roads',
    state: 'Bihar',
    district: 'Purnia',
    issue: 'Rural Roads Washout & School Cutoff',
    requests_count: 1284,
    target_beneficiaries: 8420,
    estimated_budget_inr: 1850,
    priority_score: 91,
    infrastructure_gap: 'High',
    urgency_reason: 'High citizen demand combined with an identified infrastructure gap and essential-service impact.',
    sdg_goal: 'SDG 9: Industry, Innovation & Infrastructure',
    status: 'Proposed',
    scoring_factors: {
      citizen_demand: 92,
      infrastructure_gap: 88,
      population_impact: 84,
      essential_service: 95,
      recent_trend: 79
    },
    expected_impact: ['Schools accessibility', 'Healthcare emergency transport', 'Agricultural market access', 'Public services mobility']
  },
  {
    id: 'proj-2',
    project_code: 'DPI-MH-2026-01',
    title: '50-Bed Emergency Sub-Center & Decentralized Oxygen Network',
    category: 'Healthcare',
    state: 'Maharashtra',
    district: 'Gadchiroli',
    issue: 'Primary Healthcare Center Unavailable',
    requests_count: 967,
    target_beneficiaries: 6820,
    estimated_budget_inr: 450,
    priority_score: 89,
    infrastructure_gap: 'High',
    urgency_reason: 'Combines 342 tribal voice logs with 78.5% healthcare deficit index and high remoteness.',
    sdg_goal: 'SDG 3: Good Health & Well-being',
    status: 'Approved',
    scoring_factors: {
      citizen_demand: 88,
      infrastructure_gap: 94,
      population_impact: 86,
      essential_service: 98,
      recent_trend: 81
    },
    expected_impact: ['Emergency maternity care', 'Oxygen supply within 5km radius', 'Tribal community health coverage']
  },
  {
    id: 'proj-3',
    project_code: 'DPI-OR-2026-02',
    title: 'Solar Deep Borewell Water Grid & Decentralized Filtration',
    category: 'Water',
    state: 'Odisha',
    district: 'Kalahandi',
    issue: 'Drinking Water Depletion',
    requests_count: 842,
    target_beneficiaries: 5910,
    estimated_budget_inr: 680,
    priority_score: 87,
    infrastructure_gap: 'High',
    urgency_reason: 'Groundwater depletion affecting 8 villages. Fuses 489 Odia language WhatsApp/Voice inputs.',
    sdg_goal: 'SDG 6: Clean Water & Sanitation',
    status: 'Work In Progress',
    scoring_factors: {
      citizen_demand: 86,
      infrastructure_gap: 91,
      population_impact: 82,
      essential_service: 96,
      recent_trend: 84
    },
    expected_impact: ['Clean piped drinking water', 'Eliminates 4km daily walking for women', 'Waterborne disease prevention']
  },
  {
    id: 'proj-4',
    project_code: 'DPI-RJ-2026-09',
    title: '2MW Solar Micro-Grid & Decentralized Battery Storage',
    category: 'Electricity',
    state: 'Rajasthan',
    district: 'Barmer',
    issue: 'Severe 18-Hour Power Deficit',
    requests_count: 760,
    target_beneficiaries: 4650,
    estimated_budget_inr: 520,
    priority_score: 84,
    infrastructure_gap: 'High',
    urgency_reason: 'Desert terrain with 18 hours/day outage. Aligns with PM-KUSUM decentralized solar goals.',
    sdg_goal: 'SDG 7: Affordable & Clean Energy',
    status: 'Proposed',
    scoring_factors: {
      citizen_demand: 82,
      infrastructure_gap: 86,
      population_impact: 78,
      essential_service: 88,
      recent_trend: 76
    },
    expected_impact: ['24x7 power for rural homes', 'Cold storage for farm produce', 'Street lighting safety']
  }
];

const MOCK_STATE_HOTSPOTS = [
  { 
    id: 'hotspot-1',
    state: 'Bihar', 
    district: 'Purnia', 
    demandLevel: 'Critical', 
    intensity: 96, 
    requestsCount: 1284, 
    topNeed: 'Rural Roads', 
    trend: '+21% monthly', 
    priorityScore: 91, 
    affectedPopulation: '8,420 citizens', 
    infrastructureGap: 'High (Kosi basin flood washouts)' 
  },
  { 
    id: 'hotspot-2',
    state: 'Maharashtra', 
    district: 'Gadchiroli', 
    demandLevel: 'High', 
    intensity: 89, 
    requestsCount: 967, 
    topNeed: 'Healthcare Access', 
    trend: '+16% monthly', 
    priorityScore: 89, 
    affectedPopulation: '6,820 citizens', 
    infrastructureGap: 'High (78.5% medical deficit)' 
  },
  { 
    id: 'hotspot-3',
    state: 'Odisha', 
    district: 'Kalahandi', 
    demandLevel: 'High', 
    intensity: 87, 
    requestsCount: 842, 
    topNeed: 'Drinking Water', 
    trend: '+19% monthly', 
    priorityScore: 87, 
    affectedPopulation: '5,910 citizens', 
    infrastructureGap: 'High (Groundwater table drop)' 
  },
  { 
    id: 'hotspot-4',
    state: 'Rajasthan', 
    district: 'Barmer', 
    demandLevel: 'High', 
    intensity: 84, 
    requestsCount: 760, 
    topNeed: 'Electricity Grid', 
    trend: '+12% monthly', 
    priorityScore: 84, 
    affectedPopulation: '4,650 citizens', 
    infrastructureGap: 'Moderate (18hr daily outage)' 
  },
  { 
    id: 'hotspot-5',
    state: 'Punjab', 
    district: 'Ludhiana', 
    demandLevel: 'Emerging', 
    intensity: 76, 
    requestsCount: 680, 
    topNeed: 'Canal Irrigation', 
    trend: '+9% monthly', 
    priorityScore: 82, 
    affectedPopulation: '4,100 citizens', 
    infrastructureGap: 'Emerging (Tail-end canal stress)' 
  },
  { 
    id: 'hotspot-6',
    state: 'Uttar Pradesh', 
    district: 'Gorakhpur', 
    demandLevel: 'Emerging', 
    intensity: 72, 
    requestsCount: 590, 
    topNeed: 'School Infrastructure', 
    trend: '+14% monthly', 
    priorityScore: 76, 
    affectedPopulation: '3,800 citizens', 
    infrastructureGap: 'Emerging (School building renovation)' 
  },
  { 
    id: 'hotspot-7',
    state: 'Tamil Nadu', 
    district: 'Dharmapuri', 
    demandLevel: 'Lower Demand', 
    intensity: 58, 
    requestsCount: 420, 
    topNeed: 'Digital Access', 
    trend: '+5% monthly', 
    priorityScore: 72, 
    affectedPopulation: '2,900 citizens', 
    infrastructureGap: 'Moderate (BharatNet last-mile)' 
  },
  { 
    id: 'hotspot-8',
    state: 'Kerala', 
    district: 'Wayanad', 
    demandLevel: 'Lower Demand', 
    intensity: 52, 
    requestsCount: 340, 
    topNeed: 'Education & Tech', 
    trend: '+4% monthly', 
    priorityScore: 68, 
    affectedPopulation: '2,150 citizens', 
    infrastructureGap: 'Low-Moderate (Tribal smart labs)' 
  }
];

const MOCK_STATE_NODES = [
  { state: 'Bihar', requests: 2840, hotspots: 64, categories: 8, status: 'Connected', nodeColor: '#DC2626' },
  { state: 'Maharashtra', requests: 2410, hotspots: 52, categories: 9, status: 'Connected', nodeColor: '#D97706' },
  { state: 'Odisha', requests: 1980, hotspots: 46, categories: 7, status: 'Connected', nodeColor: '#D97706' },
  { state: 'Punjab', requests: 1820, hotspots: 42, categories: 8, status: 'Connected', nodeColor: '#CA8A04' },
  { state: 'Uttar Pradesh', requests: 3120, hotspots: 78, categories: 10, status: 'Connected', nodeColor: '#CA8A04' },
  { state: 'Rajasthan', requests: 1650, hotspots: 38, categories: 7, status: 'Connected', nodeColor: '#D97706' },
  { state: 'Tamil Nadu', requests: 1420, hotspots: 32, categories: 8, status: 'Connected', nodeColor: '#16A34A' },
  { state: 'Kerala', requests: 940, hotspots: 18, categories: 6, status: 'Connected', nodeColor: '#16A34A' },
  { state: 'Haryana', requests: 880, hotspots: 22, categories: 6, status: 'Connected', nodeColor: '#16A34A' },
  { state: 'Assam', requests: 1120, hotspots: 29, categories: 7, status: 'Connected', nodeColor: '#CA8A04' },
  { state: 'Gujarat', requests: 1340, hotspots: 26, categories: 7, status: 'Connected', nodeColor: '#16A34A' },
  { state: 'Karnataka', requests: 1250, hotspots: 28, categories: 8, status: 'Connected', nodeColor: '#16A34A' }
];

const MOCK_POLICY_INSIGHTS = [
  {
    id: 'insight-1',
    number: '01',
    title: 'Road connectivity is emerging as the highest-volume infrastructure concern across selected districts.',
    evidence: {
      requests: '1,284 citizen requests',
      growth: '+21% monthly growth',
      demographics: '68% from rural and flood-prone locations'
    },
    recommendation: 'Evaluate rural road connectivity interventions and elevated culvert construction in high-demand districts.',
    district: 'Purnia District, Bihar'
  },
  {
    id: 'insight-2',
    number: '02',
    title: 'Healthcare access requests are concentrated around remote tribal districts with limited service availability.',
    evidence: {
      requests: '967 citizen distress logs',
      growth: '+16% monthly growth',
      demographics: '78.5% healthcare deficit index in tribal blocks'
    },
    recommendation: 'Deploy decentralized 50-bed sub-centers with solar-powered oxygen generation to cut travel times from 50km to under 8km.',
    district: 'Gadchiroli District, Maharashtra'
  },
  {
    id: 'insight-3',
    number: '03',
    title: 'Water access complaints show strong seasonal clustering and acute groundwater table depletion.',
    evidence: {
      requests: '842 citizen complaints',
      growth: '+19% monthly growth',
      demographics: '8 villages with non-functional surface wells'
    },
    recommendation: 'Fast-track solar deep borewell water grids and community filtration plants under Jal Jeevan Mission.',
    district: 'Kalahandi District, Odisha'
  }
];

// Helper to get local storage requests or default
const getStoredRequests = () => {
  const local = localStorage.getItem('JANDRISHTI_REQUESTS');
  return local ? JSON.parse(local) : MOCK_CITIZEN_REQUESTS;
};

const saveStoredRequests = (data) => {
  localStorage.setItem('JANDRISHTI_REQUESTS', JSON.stringify(data));
};

const getStoredProjects = () => {
  const local = localStorage.getItem('JANDRISHTI_PROJECTS');
  return local ? JSON.parse(local) : MOCK_AI_PROJECTS;
};

const saveStoredProjects = (data) => {
  localStorage.setItem('JANDRISHTI_PROJECTS', JSON.stringify(data));
};

export const dataService = {
  // Fetch All Citizen Requests
  async getCitizenRequests() {
    if (isLiveSupabaseConnected && supabase) {
      try {
        const { data, error } = await supabase
          .from('citizen_requests')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) return data;
      } catch (e) {
        console.warn('Falling back to local storage requests');
      }
    }
    return getStoredRequests();
  },

  // Submit New Citizen Request (Voice/Text/WhatsApp)
  async submitCitizenRequest(newReq) {
    const ticketId = `JD-${(newReq.state || 'IN').substring(0, 2).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullRequest = {
      id: `req-${Date.now()}`,
      ticket_id: ticketId,
      citizen_name: newReq.citizen_name || 'Anonymous Citizen',
      channel: newReq.channel || 'Voice',
      language: newReq.language || 'Hindi',
      original_text: newReq.original_text,
      translated_text: newReq.translated_text || newReq.original_text,
      category: newReq.category || 'Roads',
      urgency_level: newReq.urgency_level || 'High',
      state: newReq.state || 'Bihar',
      district: newReq.district || 'Purnia',
      locality: newReq.locality || 'Rural Gram Panchayat',
      pincode: newReq.pincode || '854301',
      latitude: newReq.latitude || 25.7771,
      longitude: newReq.longitude || 87.4753,
      upvotes: 1,
      priority_score: newReq.priority_score || 88,
      status: 'AI Analyzed',
      ai_confidence: 0.95,
      created_at: new Date().toISOString()
    };

    if (isLiveSupabaseConnected && supabase) {
      try {
        const { data, error } = await supabase
          .from('citizen_requests')
          .insert([fullRequest])
          .select();
        if (!error && data) return data[0];
      } catch (e) {
        console.warn('Supabase insert failed, saving locally', e);
      }
    }

    const current = getStoredRequests();
    const updated = [fullRequest, ...current];
    saveStoredRequests(updated);
    return fullRequest;
  },

  // Upvote Citizen Request
  async upvoteRequest(id) {
    const current = getStoredRequests();
    const updated = current.map(item => {
      if (item.id === id) {
        return { ...item, upvotes: (item.upvotes || 0) + 1 };
      }
      return item;
    });
    saveStoredRequests(updated);

    if (isLiveSupabaseConnected && supabase) {
      try {
        const target = updated.find(i => i.id === id);
        if (target) {
          await supabase
            .from('citizen_requests')
            .update({ upvotes: target.upvotes })
            .eq('id', id);
        }
      } catch (e) {
        console.warn('Supabase upvote update failed');
      }
    }

    return updated;
  },

  // Get AI Recommended Projects
  async getAIProjects() {
    if (isLiveSupabaseConnected && supabase) {
      try {
        const { data, error } = await supabase
          .from('ai_recommended_projects')
          .select('*')
          .order('priority_score', { ascending: false });
        if (!error && data && data.length > 0) return data;
      } catch (e) {
        console.warn('Falling back to local storage projects');
      }
    }
    return getStoredProjects();
  },

  // Update AI Project status
  async updateProjectStatus(projectId, newStatus) {
    const current = getStoredProjects();
    const updated = current.map(p => {
      if (p.id === projectId) return { ...p, status: newStatus };
      return p;
    });
    saveStoredProjects(updated);

    if (isLiveSupabaseConnected && supabase) {
      try {
        await supabase
          .from('ai_recommended_projects')
          .update({ status: newStatus })
          .eq('id', projectId);
      } catch (e) {
        console.warn('Supabase project status update failed');
      }
    }
    return updated;
  },

  // Get State Demand Hotspot Matrix
  getHotspotAnalytics() {
    return MOCK_STATE_HOTSPOTS;
  },

  // Get State Network Nodes
  getStateNetworkNodes() {
    return MOCK_STATE_NODES;
  },

  // Get Policy Insights
  getPolicyInsights() {
    return MOCK_POLICY_INSIGHTS;
  },

  // Simulated Multilingual AI Translation & Tagging Engine
  async simulateAITranslationAndAnalysis(text, language, state = 'Bihar', district = 'Purnia') {
    // Realistic AI pipeline latency
    await new Promise(res => setTimeout(res, 900));

    const lower = text.toLowerCase();
    let category = 'Roads';
    let urgency = 'High';
    let issue = 'Rural road damage affecting mobility and school access';
    let affectedService = 'Public transport & school commute';
    let translated = text;
    let priorityScore = 88;

    // Multilingual keyword mapping
    if (lower.includes('पानी') || lower.includes('जल') || lower.includes('water') || lower.includes('କୂଅ') || lower.includes('পানীয') || lower.includes('தண்ணீர்') || lower.includes('నీరు')) {
      category = 'Water';
      issue = 'Severe drinking water shortage & groundwater contamination';
      affectedService = 'Safe drinking water supply';
      translated = `Our village drinking water wells have dried up and piped tap connections are non-functional. Women must fetch water from tube-wells 4km away.`;
      urgency = 'High';
      priorityScore = 87;
    } else if (lower.includes('अस्पताल') || lower.includes('आरोग्य') || lower.includes('डॉक्टर') || lower.includes('hospital') || lower.includes('health') || lower.includes('दवा') || lower.includes('மருத்துவமனை') || lower.includes('ಆಸ್ಪತ್ರೆ')) {
      category = 'Healthcare';
      issue = 'Primary healthcare center unavailable with doctor & emergency medicine shortage';
      affectedService = 'Primary emergency healthcare';
      translated = `In our village primary health center, doctors and essential medicines are unavailable. Critical patients must travel 50km to district center.`;
      urgency = 'Critical';
      priorityScore = 89;
    } else if (lower.includes('सड़क') || lower.includes('रोड') || lower.includes('road') || lower.includes('पूल') || lower.includes('bridge') || lower.includes('बाढ़') || lower.includes('सड़क') || lower.includes('ਸੜਕ') || lower.includes('சாலை')) {
      category = 'Roads';
      issue = 'Poor rural road connectivity with monsoon flood washout';
      affectedService = 'School & emergency hospital access';
      translated = `Our village rural road gets washed away in monsoons making access to secondary school impassable.`;
      urgency = 'Critical';
      priorityScore = 91;
    } else if (lower.includes('बिजली') || lower.includes('सौर') || lower.includes('solar') || lower.includes('power') || lower.includes('electricity') || lower.includes('ਬਿਜਲੀ') || lower.includes('மின்சாரம்')) {
      category = 'Electricity';
      issue = '18-hour daily power outage affecting agricultural feeders and homes';
      affectedService = 'Grid electricity & irrigation';
      translated = `Frequent blackouts exceeding 16 hours daily. Urgent request for decentralized solar micro-grid installation.`;
      urgency = 'High';
      priorityScore = 84;
    } else if (lower.includes('इंटरनेट') || lower.includes('स्कूल') || lower.includes('डिजिटल') || lower.includes('internet') || lower.includes('fiber') || lower.includes('பள்ளி') || lower.includes('ಶಾಲೆ')) {
      category = 'Internet / Digital Access';
      issue = 'BharatNet high-speed fiber broadband down affecting digital school labs';
      affectedService = 'Digital education & e-governance';
      translated = `BharatNet optical fiber connection in village school is non-functional, halting digital classrooms.`;
      urgency = 'Medium';
      priorityScore = 72;
    } else if (lower.includes('कचरा') || lower.includes('नाली') || lower.includes('sanitation') || lower.includes('drain')) {
      category = 'Sanitation';
      issue = 'Open sewage overflow and lack of solid waste management';
      affectedService = 'Public sanitation & disease prevention';
      translated = `Sewage drain blockage causing overflow near primary school. Needs concrete underground drain line.`;
      urgency = 'Medium';
      priorityScore = 74;
    } else {
      translated = `[AI Multilingual Translation from ${language}]: ${text}`;
    }

    return {
      language,
      original_text: text,
      translated_text: translated,
      category,
      location: `${district}, ${state}`,
      issue,
      affected_service: affectedService,
      urgency_level: urgency,
      priority_score: priorityScore,
      affected_population_est: 'Estimated 5,000 - 10,000 citizens',
      ai_confidence: 0.95 + Math.random() * 0.03,
      ai_reasoning: [
        'High citizen demand volume in local block',
        'Severe service gap identified via infrastructure census index',
        'Essential public infrastructure impact (Education & Health)',
        'Positive ROI alignment with national DPI expenditure plan'
      ]
    };
  },

  // AI Assistant Query Answerer
  queryAIAssistant(prompt) {
    const q = prompt.toLowerCase();
    if (q.includes('bihar') || q.includes('purnia')) {
      return {
        answer: `In Bihar (specifically Purnia district), Road Infrastructure is the highest-volume concern with 1,284 aggregated requests (+21% monthly growth). The primary driver is seasonal Kosi basin flood washouts isolating 42 panchayats. AI recommends prioritizing all-weather elevated rural roads and culverts.`,
        suggestedNext: ['Show Bihar demand hotspot', 'View Purnia priority breakdown', 'Check budget estimate']
      };
    } else if (q.includes('healthcare') || q.includes('health') || q.includes('gadchiroli')) {
      return {
        answer: `Healthcare is the #1 critical urgency category nationwide, led by Gadchiroli (Maharashtra) with 967 requests and a 78.5% healthcare deficit index. Common citizen complaints cite 50km travel distances for emergency oxygen. AI recommends 50-bed sub-centers with solar oxygen generation.`,
        suggestedNext: ['View Gadchiroli hotspot', 'Show Healthcare requests', 'Review SDG 3 alignment']
      };
    } else if (q.includes('highest') || q.includes('categories') || q.includes('demand')) {
      return {
        answer: `Top 3 infrastructure demand categories by volume across India:\n1. Roads & Bridges (38% of total volume)\n2. Healthcare & Oxygen Sub-centers (29%)\n3. Drinking Water & Filtration (18%)\nDigital Connectivity and Solar Power make up the remaining 15%.`,
        suggestedNext: ['Explore demand charts', 'Filter by Roads', 'Check State Network']
      };
    } else if (q.includes('why') || q.includes('priority') || q.includes('score')) {
      return {
        answer: `JanDrishti AI uses a transparent 5-factor scoring model: Citizen Demand (30%), Infrastructure Deficit Gap (25%), Population Reach (20%), Essential Public Service Weight (15%), and Recent Growth Trend (10%). No black-box scores are produced.`,
        suggestedNext: ['Inspect Purnia Score (91/100)', 'Inspect Gadchiroli Score (89/100)', 'View scoring formula']
      };
    } else {
      return {
        answer: `Based on the latest JanDrishti AI dataset across 28 States/UTs, 12,840 citizen requests have identified 742 demand hotspots. Priority recommendations focus on flood-resilient rural connectivity, tribal healthcare sub-centers, and solar water grids.`,
        suggestedNext: ['Which issues are growing in Bihar?', 'Show major healthcare gaps', 'Explain priority scoring']
      };
    }
  }
};
