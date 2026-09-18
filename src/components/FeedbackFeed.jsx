import React, { useState } from 'react';
import { 
  Radio, 
  Search, 
  Filter, 
  ThumbsUp, 
  Volume2, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Mic, 
  Send,
  ArrowUpDown,
  Sparkles,
  Share2
} from 'lucide-react';

export default function FeedbackFeed({ 
  requests = [], 
  onUpvote 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [channelFilter, setChannelFilter] = useState('All');
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'upvotes', 'priority'

  // Speech synthesis audio playback
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Filter & Sort
  const filteredRequests = requests.filter(req => {
    const matchesSearch = (req.original_text || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (req.translated_text || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (req.district || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (req.state || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (req.ticket_id || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPriority = priorityFilter === 'All' || req.urgency_level === priorityFilter;
    const matchesChannel = channelFilter === 'All' || req.channel === channelFilter;

    return matchesSearch && matchesPriority && matchesChannel;
  }).sort((a, b) => {
    if (sortBy === 'upvotes') return (b.upvotes || 0) - (a.upvotes || 0);
    if (sortBy === 'priority') return (b.priority_score || 80) - (a.priority_score || 80);
    return new Date(b.created_at || 0) - new Date(a.created_at || 0);
  });

  return (
    <section className="mb-14">
      
      {/* Section Header */}
      <div className="flex flex-col sm-flex-row sm-items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <Radio className="w-5 h-5 text-blue-700" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#0A192F] font-heading">
              LIVE CITIZEN FEEDBACK
            </h2>
          </div>
          <p className="text-sm text-slate-600">
            Real-time public infrastructure demand stream indexed across Indian languages
          </p>
        </div>

        <span className="gov-badge gov-badge-blue font-mono">
          {filteredRequests.length} Indexed Tickets
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="gov-card p-4 mb-6 bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tickets, text, or district..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="gov-input pl-8 py-1.5 text-xs"
          />
        </div>

        {/* Priority Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-slate-500 font-bold">Priority:</span>
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            {['All', 'Critical', 'High', 'Medium'].map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`px-2 py-0.5 rounded font-semibold transition ${
                  priorityFilter === p ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Channel Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-slate-500 font-bold">Channel:</span>
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="gov-input py-1.5 text-xs w-auto cursor-pointer"
          >
            <option value="All">All Channels</option>
            <option value="Voice">Voice</option>
            <option value="Text">Text</option>
            <option value="WhatsApp">WhatsApp</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="flex items-center space-x-2">
          <span className="text-slate-500 font-bold">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="gov-input py-1.5 text-xs w-auto cursor-pointer"
          >
            <option value="recent">Most Recent</option>
            <option value="upvotes">Most Supported (👍)</option>
            <option value="priority">Highest Priority Score</option>
          </select>
        </div>

      </div>

      {/* Feed Cards Grid */}
      <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3 gap-5">
        {filteredRequests.map((req) => (
          <div
            key={req.id}
            className="gov-card p-5 border border-slate-200 bg-white hover:border-blue-300 transition flex flex-col justify-between space-y-4 shadow-sm group"
          >
            <div className="space-y-3">
              
              {/* Card Top Metadata */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <span className="px-2 py-0.5 rounded font-mono text-10px font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    {req.ticket_id}
                  </span>
                  <span className="text-10px text-slate-500 font-medium">
                    {req.language}
                  </span>
                </div>

                <span className={`gov-badge ${
                  req.urgency_level === 'Critical' ? 'gov-badge-critical' :
                  req.urgency_level === 'High' ? 'gov-badge-high' : 'gov-badge-moderate'
                }`}>
                  {req.urgency_level} Priority
                </span>
              </div>

              {/* Location & Category */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0A192F] flex items-center">
                  <MapPin className="w-3.5 h-3.5 text-blue-700 mr-1" />
                  {req.district}, {req.state}
                </span>

                <span className="text-10px font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  {req.category}
                </span>
              </div>

              {/* Original Feedback */}
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <p className="text-xs text-slate-900 font-medium italic leading-relaxed">
                  "{req.original_text}"
                </p>
              </div>

              {/* AI Translation if available */}
              {req.translated_text && req.translated_text !== req.original_text && (
                <div className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100">
                  <span className="block text-10px font-bold text-blue-800 uppercase tracking-wide">AI Translation:</span>
                  <p className="text-xs text-slate-800 mt-0.5 leading-relaxed">
                    {req.translated_text}
                  </p>
                </div>
              )}

            </div>

            {/* Card Footer: Audio Listen, Channel, Upvote */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => speakText(req.translated_text || req.original_text)}
                  className="p-1.5 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-slate-100 transition"
                  title="Listen to audio"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <span className="text-11px text-slate-500 font-medium">
                  Via {req.channel}
                </span>
              </div>

              <button
                type="button"
                onClick={() => onUpvote(req.id)}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold transition transform group-hover:scale-105"
                title="Support this community request"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{req.upvotes || 1}</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
