import React, { useState } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  Send, 
  X, 
  ChevronUp, 
  ChevronDown, 
  Bot, 
  User, 
  CornerDownLeft,
  HelpCircle
} from 'lucide-react';
import { dataService } from '../services/dataService';

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am your JanDrishti AI Governance Assistant. Ask me anything about district demand hotspots, citizen feedback trends, or infrastructure priority scoring.'
    }
  ]);

  const quickPrompts = [
    'Which infrastructure issues are increasing in Bihar?',
    'Show me highest-demand categories',
    'What are the major healthcare gaps?',
    'Why is Purnia prioritized?'
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    setChatHistory(prev => [...prev, { sender: 'user', text: query }]);
    setInputQuery('');

    // Query dataService
    setTimeout(() => {
      const response = dataService.queryAIAssistant(query);
      setChatHistory(prev => [
        ...prev, 
        { 
          sender: 'ai', 
          text: response.answer,
          suggestedNext: response.suggestedNext 
        }
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      
      {/* Floating Trigger Button when closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 px-4 py-3 rounded-full bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-xl shadow-blue-700/30 transition transform hover:scale-105"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          <span>JanDrishti AI Assistant</span>
        </button>
      )}

      {/* Expanded Assistant Drawer */}
      {isOpen && (
        <div className="gov-card p-4 border border-slate-200 shadow-2xl w-80 sm:w-96 bg-white rounded-2xl flex flex-col h-[500px] animate-fadeIn">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-blue-100 text-blue-800">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#0A192F] font-heading">
                  JanDrishti AI Assistant
                </h3>
                <span className="text-10px text-slate-500 font-mono">
                  DPI Intelligence Model
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto space-y-3 p-2 my-2 text-xs">
            {chatHistory.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[90%] p-3 rounded-xl leading-relaxed whitespace-pre-line shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-blue-700 text-white rounded-br-none'
                      : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Suggested followups */}
                {msg.suggestedNext && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.suggestedNext.map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSend(sug)}
                        className="text-10px font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-md border border-blue-200 transition"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Prompts Carousel if at start */}
          {chatHistory.length <= 2 && (
            <div className="pb-2 space-y-1">
              <span className="text-10px font-bold text-slate-500 block uppercase">Suggested Prompts:</span>
              <div className="flex flex-wrap gap-1">
                {quickPrompts.slice(0, 2).map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(p)}
                    className="text-10px text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-left truncate max-w-full"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Box */}
          <div className="pt-2 border-t border-slate-200 flex space-x-2">
            <input
              type="text"
              placeholder="Ask governance AI assistant..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="gov-input text-xs"
            />
            <button
              onClick={() => handleSend()}
              className="px-3 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold transition"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
