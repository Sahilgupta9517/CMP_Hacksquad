import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  Send, 
  Sparkles, 
  Upload, 
  MapPin, 
  Image as ImageIcon, 
  CheckCircle, 
  Radio, 
  FileText,
  HelpCircle,
  Volume2,
  MessageCircle,
  Phone
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
  const [imageUploaded, setImageUploaded] = useState(false);
  const [activeTab, setActiveTab] = useState('text'); // 'text', 'voice', 'whatsapp'
  const [whatsappMsgs, setWhatsappMsgs] = useState([
    { sender: 'ai', text: 'Namaste! Please describe your infrastructure request or send a photo.', time: '10:00 AM' }
  ]);

  const demoHindiText = "हमारे गांव में सड़क बहुत खराब है और बारिश में एम्बुलेंस नहीं आ पाती।";

  const handleTryDemo = () => {
    setCitizenName('Ramesh Kumar (रमेश कुमार)');
    setMobileNumber('+91 98765 43210');
    setSelectedState('Uttar Pradesh');
    setSelectedDistrict('Bahraich');
    setSelectedLang('हिन्दी');
    setFeedbackText(demoHindiText);
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Native Speech Recognition or simulated speech input
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        try {
          const recognition = new SpeechRecognition();
          recognition.lang = 'hi-IN';
          recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (transcript) setFeedbackText(transcript);
            setIsRecording(false);
          };
          recognition.start();
        } catch (e) {
          console.log('Speech recognition fallback');
        }
      }
      setTimeout(() => {
        if (!feedbackText) {
          setFeedbackText(demoHindiText);
          setIsRecording(false);
        }
      }, 3500);
    } else {
      setIsRecording(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    onSubmitFeedback({
      citizenName: citizenName || 'Anonymous Citizen',
      mobileNumber: mobileNumber || '+91 98XXX XXXXX',
      state: selectedState,
      district: selectedDistrict,
      language: selectedLang,
      feedbackText: feedbackText,
      hasImage: imageUploaded
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-12">
      
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
      <div className="glass-panel p-6 sm:p-10 border border-slate-200/90 shadow-xl space-y-6">
        
        {/* Try Demo Shortcut Button */}
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

        {/* Action Tabs */}
        <div className="flex justify-center mb-6">
          <div className="bg-slate-100/50 p-1.5 rounded-20px inline-flex gap-1 border border-slate-200 shadow-inner">
            <button 
              onClick={() => setActiveTab('voice')} 
              className={`flex items-center px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'voice' ? 'bg-white text-blue-700 shadow-md border border-slate-200/50' : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'}`}
            >
              <Mic className="w-4 h-4 mr-2"/> Voice
            </button>
            <button 
              onClick={() => setActiveTab('text')} 
              className={`flex items-center px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'text' ? 'bg-white text-blue-700 shadow-md border border-slate-200/50' : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'}`}
            >
              <FileText className="w-4 h-4 mr-2"/> Text
            </button>
            <button 
              onClick={() => setActiveTab('whatsapp')} 
              className={`flex items-center px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'whatsapp' ? 'bg-[#25D366]/10 text-[#128C7E] shadow-md border border-[#25D366]/20' : 'text-slate-500 hover:text-[#128C7E] hover:bg-[#25D366]/5'}`}
            >
              <MessageCircle className="w-4 h-4 mr-2"/> WhatsApp
            </button>
          </div>
        </div>

        {activeTab === 'whatsapp' ? (
          <div className="bg-[#E5DDD5] rounded-2xl overflow-hidden border border-slate-300 max-w-sm mx-auto shadow-inner flex flex-col h-[500px]">
            {/* WA Header */}
            <div className="bg-[#075E54] text-white px-4 py-3 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">JanDrishti AI</h3>
                <p className="text-[10px] text-white/80">Govt. of India • Verified</p>
              </div>
            </div>
            {/* WA Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-cover">
              {whatsappMsgs.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-lg p-2.5 text-xs shadow-sm relative ${msg.sender === 'user' ? 'bg-[#DCF8C6] text-slate-900 rounded-tr-none' : 'bg-white text-slate-900 rounded-tl-none'}`}>
                    <p>{msg.text}</p>
                    {msg.sender === 'ai' && i > 0 && (
                      <div className="mt-2 pt-2 border-t border-slate-200/60 text-[10px]">
                        <strong>Category:</strong> Road Infrastructure<br/>
                        <strong>Location:</strong> Bahraich, UP<br/>
                        <strong>Priority:</strong> High
                      </div>
                    )}
                    <span className="text-[9px] text-slate-500 float-right mt-1 ml-3">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* WA Input */}
            <div className="bg-[#F0F0F0] p-2 flex items-center space-x-2">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 rounded-full px-4 py-2.5 text-xs focus:outline-none"
                value={feedbackText}
                onChange={e => setFeedbackText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && feedbackText) {
                    setWhatsappMsgs([...whatsappMsgs, { sender: 'user', text: feedbackText, time: '10:02 AM' }]);
                    setFeedbackText('');
                    setTimeout(() => {
                      setWhatsappMsgs(prev => [...prev, { sender: 'ai', text: 'I have understood your request. Do you want to submit this officially?', time: '10:02 AM' }]);
                    }, 1000);
                  }
                }}
              />
              <button 
                type="button" 
                className="w-10 h-10 rounded-full bg-[#128C7E] flex items-center justify-center text-white shrink-0"
                onClick={() => {
                  if(feedbackText) {
                    setWhatsappMsgs([...whatsappMsgs, { sender: 'user', text: feedbackText, time: '10:02 AM' }]);
                    setFeedbackText('');
                    setTimeout(() => {
                      setWhatsappMsgs(prev => [...prev, { sender: 'ai', text: 'I have understood your request. Do you want to submit this officially?', time: '10:02 AM' }]);
                    }, 1000);
                  } else if (whatsappMsgs.length > 1) {
                    handleSubmit({ preventDefault: () => {} });
                  }
                }}
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Row 1: Citizen Name & Mobile */}
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

          {/* Row 2: State, District, Language */}
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

          {/* Dynamic Input Area (Text or Voice) */}
          {activeTab === 'voice' ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-6 bg-slate-50 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={toggleRecording}
                className={`w-32 h-32 rounded-full flex items-center justify-center transition-all shadow-xl ${
                  isRecording 
                    ? 'bg-rose-500 text-white animate-pulse ring-8 ring-rose-500/20' 
                    : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white hover:scale-105'
                }`}
              >
                {isRecording ? <MicOff className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
              </button>
              <div className="text-center">
                <h3 className="font-bold text-slate-800 text-lg mb-1">{isRecording ? 'Listening...' : 'Press to speak'}</h3>
                <p className="text-xs text-slate-500">Speak clearly into your microphone in your chosen language.</p>
              </div>
              {feedbackText && (
                <div className="w-full max-w-lg px-6">
                  <p className="text-sm p-4 bg-white border border-slate-200 rounded-xl italic text-slate-700 text-center">"{feedbackText}"</p>
                </div>
              )}
            </div>
          ) : (
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
              
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setImageUploaded(!imageUploaded)}
                  className={`flex items-center justify-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition border w-full sm:w-auto ${
                    imageUploaded 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>{imageUploaded ? 'Photo Attached (1)' : t.uploadBtn}</span>
                </button>
              </div>
            </div>
          )}

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
