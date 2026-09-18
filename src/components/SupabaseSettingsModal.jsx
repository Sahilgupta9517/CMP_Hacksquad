import React, { useState } from 'react';
import { 
  X, 
  Database, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  ExternalLink,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { updateSupabaseCredentials, isLiveSupabaseConnected } from '../lib/supabaseClient';

export default function SupabaseSettingsModal({ isOpen, onClose, onRefresh }) {
  const [url, setUrl] = useState(localStorage.getItem('JANDRISHTI_SUPABASE_URL') || '');
  const [key, setKey] = useState(localStorage.getItem('JANDRISHTI_SUPABASE_KEY') || '');
  const [statusMsg, setStatusMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('connect');

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    const result = updateSupabaseCredentials(url, key);
    setStatusMsg(result.message);
    if (onRefresh) onRefresh();
    setTimeout(() => {
      if (result.success) onClose();
    }, 1200);
  };

  const handleClear = () => {
    setUrl('');
    setKey('');
    const result = updateSupabaseCredentials('', '');
    setStatusMsg('Cleared credentials. Reverted to offline prototype data mode.');
    if (onRefresh) onRefresh();
  };

  const sqlSchemaSnippet = `-- Run this in your Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS citizen_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id VARCHAR(20) UNIQUE NOT NULL,
    citizen_name VARCHAR(100),
    channel VARCHAR(30),
    language VARCHAR(30),
    original_text TEXT NOT NULL,
    translated_text TEXT,
    category VARCHAR(50),
    urgency_level VARCHAR(20),
    state VARCHAR(50),
    district VARCHAR(50),
    locality VARCHAR(100),
    upvotes INT DEFAULT 1,
    priority_score NUMERIC(5, 2) DEFAULT 85.0,
    status VARCHAR(30) DEFAULT 'Pending Review',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE citizen_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Requests Read/Write" ON citizen_requests FOR ALL USING (true);`;

  const copySQL = () => {
    navigator.clipboard.writeText(sqlSchemaSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden gov-card-elevated">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-800">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0A192F] font-heading">
                Supabase Backend Configuration
              </h3>
              <p className="text-xs text-slate-500">
                Connect your live Supabase cloud database or run local prototype simulation
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/50 px-6">
          <button
            onClick={() => setActiveTab('connect')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition ${
              activeTab === 'connect'
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Credentials & Status
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition ${
              activeTab === 'schema'
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            SQL Schema Generator
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6">
          {activeTab === 'connect' ? (
            <form onSubmit={handleSave} className="space-y-4">
              
              {/* Status Banner */}
              <div className={`p-4 rounded-xl border flex items-start space-x-3 ${
                isLiveSupabaseConnected 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}>
                {isLiveSupabaseConnected ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    {isLiveSupabaseConnected ? 'Live Cloud Supabase Connected' : 'Offline Prototype Simulation Active'}
                  </h4>
                  <p className="text-xs mt-1 text-slate-700 leading-relaxed">
                    {isLiveSupabaseConnected 
                      ? 'Citizen requests and AI recommendations are syncing in real-time with your live Supabase cloud database.'
                      : 'The application is fully operational using realistic in-memory Indian DPI datasets. Enter your Supabase project keys below to switch to live cloud database persistence.'}
                  </p>
                </div>
              </div>

              {/* Input Fields */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Supabase Project URL (`VITE_SUPABASE_URL`)
                  </label>
                  <input
                    type="url"
                    placeholder="https://your-project.supabase.co"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="gov-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Supabase Anon Public Key (`VITE_SUPABASE_ANON_KEY`)
                  </label>
                  <input
                    type="password"
                    placeholder="eyJhYmdj..."
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="gov-input text-xs font-mono"
                  />
                </div>
              </div>

              {statusMsg && (
                <div className="p-2.5 rounded-lg bg-slate-100 text-xs text-center font-semibold text-slate-800">
                  {statusMsg}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-rose-600 transition"
                >
                  Clear & Revert to Prototype Mode
                </button>

                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary text-xs"
                  >
                    Connect Supabase
                  </button>
                </div>
              </div>

            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-700">
                  Copy and run this schema in your <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="text-blue-700 font-bold underline inline-flex items-center">Supabase SQL Editor <ExternalLink className="w-3 h-3 ml-1"/></a>:
                </p>
                <button
                  onClick={copySQL}
                  className="flex items-center space-x-1 px-3 py-1 bg-slate-800 hover:bg-slate-900 text-xs text-white rounded-md transition"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied!' : 'Copy SQL'}</span>
                </button>
              </div>

              <div className="relative p-3 rounded-lg bg-[#0A192F] font-mono text-11px text-emerald-300 max-h-60 overflow-y-auto">
                <pre>{sqlSchemaSnippet}</pre>
              </div>

              <p className="text-11px text-slate-500 flex items-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1.5 shrink-0" />
                This table enables Row Level Security (RLS) allowing anonymous citizen feedback submissions while maintaining data integrity.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
