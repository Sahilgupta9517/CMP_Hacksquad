import React, { useState, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Send, 
  Sparkles, 
  Upload, 
  MapPin, 
  Image as ImageIcon, 
  CheckCircle2, 
  Radio, 
  FileText,
  HelpCircle,
  Volume2,
  MessageCircle,
  Phone,
  Building2,
  X,
  Play,
  Check
} from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';
import { DISTRICTS_DATA } from '../data/mockData';

export default function CitizenPortal({ 
  currentLanguage = 'English', 
  onSubmitFeedback 
}) {
  const t = TRANSLATIONS[currentLanguage]?.portal || TRANSLATIONS['English'].portal;

  const [citizenName, setCitizenName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedState, setSelectedState] = useState('Uttar Pradesh');
  const [selectedDistrict, setSelectedDistrict] = useState('Bahraich');
  const [selectedLang, setSelectedLang] = useState('हिन्दी');
  const [feedbackText, setFeedbackText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [attachedPhoto, setAttachedPhoto] = useState(null); // { name, size, dataUrl }
  const [activeTab, setActiveTab] = useState('text'); // 'text', 'voice', 'whatsapp'

  const fileInputRef = useRef(null);
  const timerRef = useRef(null);

  const demoHindiText = "हमारे गांव में सड़क बहुत खराब है और बारिश में एम्बुलेंस नहीं आ पाती।";

  const [whatsappMsgs, setWhatsappMsgs] = useState([
    { sender: 'ai', text: 'Namaste! Welcome to JanConnect AI WhatsApp DPI Portal. Describe your infrastructure request or choose a quick option below.', time: '10:00 AM' }
  ]);
  const [waInputText, setWaInputText] = useState('');

  // Handle Try Demo Shortcut
  const handleTryDemo = () => {
    setCitizenName('Ramesh Kumar (रमेश कुमार)');
    setMobileNumber('+91 98765 43210');
    setSelectedState('Uttar Pradesh');
    setSelectedDistrict('Bahraich');
    setSelectedLang('हिन्दी');
    setFeedbackText(demoHindiText);
  };

  // Handle Photo File Picker & Preview
  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const sizeKb = (file.size / 1024).toFixed(1);
      setAttachedPhoto({
        name: file.name,
        size: `${sizeKb} KB`,
        dataUrl: event.target?.result
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setAttachedPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle Voice Recording Simulation & Presets
  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordTime(0);

      timerRef.current = setInterval(() => {
        setRecordTime((prev) => prev + 1);
      }, 1000);

      // Web Speech API
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        try {
          const recognition = new SpeechRecognition();
          recognition.lang = selectedLang === 'हिन्दी' ? 'hi-IN' : 'en-IN';
          recognition.onresult = (event) => {
            const transcript = event.results[0][0]?.transcript;
            if (transcript) setFeedbackText(transcript);
            stopRecording();
          };
          recognition.onerror = () => stopRecording();
          recognition.start();
        } catch (e) {
          console.warn('Speech recognition fallback active');
        }
      }

      setTimeout(() => {
        if (!feedbackText) {
          setFeedbackText(demoHindiText);
        }
        stopRecording();
      }, 4000);

    } else {
      stopRecording();
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleVoicePreset = (presetText, presetLang) => {
    setSelectedLang(presetLang);
    setFeedbackText(presetText);
  };

  // Handle WhatsApp Chat Sending
  const handleSendWaMsg = (textToSend) => {
    const txt = textToSend || waInputText;
    if (!txt.trim()) return;

    const userMsg = { sender: 'user', text: txt, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setWhatsappMsgs((prev) => [...prev, userMsg]);
    setWaInputText('');

    setTimeout(() => {
      const aiReply = {
        sender: 'ai',
        text: `AI Vector Analysis: Request categorized under Infrastructure Demand for ${selectedDistrict}, ${selectedState}. Tap 'Submit Officially' to dispatch to policy engine.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showSubmitBtn: true
      };
      setWhatsappMsgs((prev) => [...prev, aiReply]);
    }, 1000);
  };

  // Handle Final Form Submission
  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const textToSubmit = feedbackText.trim() || (whatsappMsgs.length > 1 ? whatsappMsgs[whatsappMsgs.length - 1].text : '');
    if (!textToSubmit) return;

    onSubmitFeedback({
      citizenName: citizenName || 'Ramesh Kumar (Citizen)',
      mobileNumber: mobileNumber || '+91 98765 43210',
      state: selectedState,
      district: selectedDistrict,
      language: selectedLang,
      feedbackText: textToSubmit,
      hasImage: !!attachedPhoto,
      attachedPhoto: attachedPhoto
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-16">
      
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        accept="image/*" 
        onChange={handleFileChange} 
        className="hidden" 
      />

      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
          <Radio className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
          <span>{t.badge}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-heading">
          {t.title}
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Main Feedback Form Card */}
      <div className="glass-panel p-6 sm:p-10 border border-slate-200/90 shadow-xl space-y-6 bg-white rounded-2xl">
        
        {/* Hackathon Try Demo Button */}
        <div className="flex items-center justify-between p-3.5 rounded-20px bg-gradient-to-r from-blue-50 via-cyan-50 to-purple-50 border border-blue-200">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
            <span className="text-xs font-bold text-slate-800">
              Hackathon Demonstration Mode:
            </span>
          </div>
          <button
            type="button"
            onClick={handleTryDemo}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-sm transition transform hover:scale-105"
          >
            {t.tryDemoBtn}
          </button>
        </div>

        {/* Action Input Tabs: Voice | Text | WhatsApp */}
        <div className="flex justify-center mb-6">
          <div className="bg-slate-100 p-1.5 rounded-20px inline-flex gap-1 border border-slate-200 shadow-inner">
            <button 
              type="button"
              onClick={() => setActiveTab('text')} 
              className={`flex items-center px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'text' ? 'bg-white text-blue-700 shadow-md border border-slate-200/50' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <FileText className="w-4 h-4 mr-2"/> Text Input
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab('voice')} 
              className={`flex items-center px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'voice' ? 'bg-white text-blue-700 shadow-md border border-slate-200/50' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Mic className="w-4 h-4 mr-2"/> Voice Input
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab('whatsapp')} 
              className={`flex items-center px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'whatsapp' ? 'bg-[#25D366]/10 text-[#128C7E] shadow-md border border-[#25D366]/30' : 'text-slate-500 hover:text-[#128C7E]'}`}
            >
              <MessageCircle className="w-4 h-4 mr-2"/> WhatsApp Bot
            </button>
          </div>
        </div>

        {/* WHATSAPP BOT INTERFACE */}
        {activeTab === 'whatsapp' ? (
          <div className="bg-[#E5DDD5] rounded-2xl overflow-hidden border border-slate-300 max-w-md mx-auto shadow-xl flex flex-col h-[520px]">
            
            {/* WhatsApp Header */}
            <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between shadow-md">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-none">JanConnect AI WhatsApp Bot</h3>
                  <p className="text-[10px] text-emerald-200 mt-1 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mr-1 animate-pulse"></span>
                    Govt. of India DPI Gateway • Verified
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Quick Options */}
            <div className="bg-[#128C7E]/10 p-2.5 border-b border-slate-300 flex flex-wrap gap-1.5 text-[11px]">
              <span className="text-[10px] font-bold text-slate-600 block w-full">Quick Sample Requests:</span>
              <button
                type="button"
                onClick={() => handleSendWaMsg("हमारे गांव में मुख्य सड़क बारिश में पूरी तरह बह गई है। (Road Washout in Bahraich)")}
                className="px-2.5 py-1 rounded-full bg-white text-[#075E54] font-semibold border border-[#128C7E]/30 hover:bg-[#DCF8C6]"
              >
                🛣️ Road Washout (Bahraich)
              </button>
              <button
                type="button"
                onClick={() => handleSendWaMsg("Drinking water supply in Prayagraj ward 12 contaminated with heavy sediments.")}
                className="px-2.5 py-1 rounded-full bg-white text-[#075E54] font-semibold border border-[#128C7E]/30 hover:bg-[#DCF8C6]"
              >
                🚰 Water Contamination
              </button>
            </div>

            {/* WhatsApp Body Messages Stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#E5DDD5]">
              {whatsappMsgs.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-xl p-3 text-xs shadow-sm relative ${
                    msg.sender === 'user' 
                      ? 'bg-[#DCF8C6] text-slate-900 rounded-tr-none border border-emerald-200' 
                      : 'bg-white text-slate-900 rounded-tl-none border border-slate-200'
                  }`}>
                    <p className="leading-relaxed font-medium">{msg.text}</p>
                    
                    {msg.showSubmitBtn && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200">
                        <button
                          type="button"
                          onClick={() => handleSubmit({ preventDefault: () => {} })}
                          className="w-full py-2 rounded-lg bg-[#128C7E] hover:bg-[#075E54] text-white font-bold text-xs shadow flex items-center justify-center space-x-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Submit Officially via JanConnect DPI</span>
                        </button>
                      </div>
                    )}
                    
                    <span className="text-[9px] text-slate-500 float-right mt-1.5 ml-2 font-mono">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp Input Field */}
            <div className="bg-[#F0F0F0] p-2.5 flex items-center space-x-2 border-t border-slate-300">
              <input 
                type="text" 
                placeholder="Type your complaint or message..." 
                className="flex-1 rounded-full px-4 py-2 text-xs border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#128C7E]"
                value={waInputText}
                onChange={e => setWaInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendWaMsg();
                  }
                }}
              />
              <button 
                type="button" 
                className="w-9 h-9 rounded-full bg-[#128C7E] hover:bg-[#075E54] flex items-center justify-center text-white shrink-0 shadow"
                onClick={() => handleSendWaMsg()}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>
        ) : (
          /* REGULAR FORM (TEXT & VOICE MODE) */
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Citizen Details Row: Name & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {t.name}
                </label>
                <input
                  type="text"
                  placeholder="E.g. Ramesh Kumar"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {t.mobile}
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>
            </div>

            {/* Location Row: State, District, Language */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 flex items-center">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 mr-1" />
                  {t.state}
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-500 transition cursor-pointer"
                >
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Rajasthan">Rajasthan</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 flex items-center">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 mr-1" />
                  {t.district}
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-500 transition cursor-pointer"
                >
                  {DISTRICTS_DATA.map((d) => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {t.language}
                </label>
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-500 transition cursor-pointer"
                >
                  <option value="हिन्दी">हिन्दी (Hindi)</option>
                  <option value="English">English</option>
                  <option value="বাংলা">বাংলা (Bengali)</option>
                  <option value="मराठी">मराठी (Marathi)</option>
                  <option value="தமிழ்">தமிழ் (Tamil)</option>
                  <option value="తెలుగు">తెలుగు (Telugu)</option>
                </select>
              </div>
            </div>

            {/* DYNAMIC INPUT AREA (VOICE OR TEXT) */}
            {activeTab === 'voice' ? (
              <div className="p-6 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl border border-slate-800 space-y-6 shadow-xl">
                
                {/* Voice Status & Timer */}
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-500/40 text-cyan-300 text-xs font-mono">
                    <Radio className={`w-3.5 h-3.5 ${isRecording ? 'text-rose-500 animate-ping' : 'text-cyan-400'}`} />
                    <span>{isRecording ? `Recording Voice... 00:0${recordTime}` : 'Multilingual Speech-to-Text Studio'}</span>
                  </div>
                  
                  {/* Microphone Record Button */}
                  <div className="flex justify-center pt-2">
                    <button
                      type="button"
                      onClick={toggleRecording}
                      className={`w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-2xl ${
                        isRecording 
                          ? 'bg-rose-600 text-white ring-8 ring-rose-500/30 animate-pulse scale-105' 
                          : 'bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 text-white hover:scale-110 shadow-blue-500/30'
                      }`}
                    >
                      {isRecording ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
                      <span className="text-[10px] font-bold uppercase mt-1">
                        {isRecording ? 'Stop' : 'Speak'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Quick Regional Voice Presets */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="text-xs font-bold text-slate-300 block">Click a Voice Preset to Test Transcript:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleVoicePreset("हमारे गांव में मुख्य सड़क बारिश में पूरी तरह बह गई है।", "हिन्दी")}
                      className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-blue-900/50 border border-slate-700 text-left text-xs transition"
                    >
                      <span className="font-bold text-cyan-300 block">🎙️ Hindi Voice Sample</span>
                      <span className="text-[11px] text-slate-400 line-clamp-1 font-hindi">हमारे गांव में मुख्य सड़क...</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleVoicePreset("Piped water supply in ward 4 contaminated with heavy industrial rust.", "English")}
                      className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-blue-900/50 border border-slate-700 text-left text-xs transition"
                    >
                      <span className="font-bold text-cyan-300 block">🎙️ English Voice Sample</span>
                      <span className="text-[11px] text-slate-400 line-clamp-1">Piped water supply...</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleVoicePreset("आमच्या प्राथमिक आरोग्य केंद्रात ऑक्सिजन सिलिंडर उपलब्ध नाही.", "मराठी")}
                      className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-blue-900/50 border border-slate-700 text-left text-xs transition"
                    >
                      <span className="font-bold text-cyan-300 block">🎙️ Marathi Voice Sample</span>
                      <span className="text-[11px] text-slate-400 line-clamp-1">आमच्या प्राथमिक आरोग्य...</span>
                    </button>
                  </div>
                </div>

                {/* Transcript Output Box */}
                {feedbackText && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-cyan-400 block">Transcribed Voice Text:</span>
                    <p className="text-slate-200 italic leading-relaxed">"{feedbackText}"</p>
                  </div>
                )}

              </div>
            ) : (
              /* TEXT MODE TEXTAREA */
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800">
                    {t.feedbackLabel}
                  </label>
                  <span className="text-[11px] font-mono text-slate-500">
                    {feedbackText.length} / 500 {t.chars}
                  </span>
                </div>

                <textarea
                  rows={4}
                  maxLength={500}
                  placeholder={t.placeholder}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="w-full p-4 rounded-20px bg-white border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition leading-relaxed"
                ></textarea>
              </div>
            )}

            {/* Photo Attachment Section */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Photo Evidence Attachment</span>
                  <span className="text-[11px] text-slate-500">Attach photo proof of damaged road, water leakage, or building issue.</span>
                </div>

                <button
                  type="button"
                  onClick={handlePhotoClick}
                  className={`flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-sm border ${
                    attachedPhoto 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                      : 'bg-white text-blue-700 hover:bg-blue-50 border-blue-200'
                  }`}
                >
                  <ImageIcon className="w-4 h-4 text-blue-600" />
                  <span>{attachedPhoto ? 'Change Photo' : 'Attach Photo (Optional)'}</span>
                </button>
              </div>

              {/* Photo Preview Thumbnail Card */}
              {attachedPhoto && (
                <div className="p-3 rounded-xl bg-white border border-emerald-200 flex items-center justify-between shadow-sm animate-fadeIn">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={attachedPhoto.dataUrl} 
                      alt="Attached Evidence Preview" 
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-slate-900 truncate max-w-[200px]">{attachedPhoto.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block">Size: {attachedPhoto.size} • Verified Format</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                    title="Remove attached photo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-200">
              <button
                type="submit"
                disabled={!feedbackText.trim()}
                className="w-full py-4 rounded-20px bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-glow-blue transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.submitBtn}</span>
              </button>
            </div>

          </form>
        )}

      </div>

    </div>
  );
}
