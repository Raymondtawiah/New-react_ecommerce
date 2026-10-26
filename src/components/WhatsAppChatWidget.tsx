import React, { useState } from 'react';
import { MessageSquare, X, Send, PhoneCall, ShieldCheck } from 'lucide-react';

export const WhatsAppChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: 'Akwaaba! Welcome to ApexTech Ghana official support desk. Looking for a specific phone, warranty check, or branch stock inquiry in Accra, Kumasi, or Takoradi?',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    const newMsg = {
      sender: 'user' as const,
      text: userMsg,
      time: 'Just now'
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Responsive intelligent bot reply
    setTimeout(() => {
      let reply = "All smartphones at ApexTech Ghana include an official 12-month manufacturer warranty with free delivery in Accra and Kumasi. You can also visit our Kwame Nkrumah Circle flagship branch or call 030 222 5651!";
      if (userMsg.toLowerCase().includes('price') || userMsg.toLowerCase().includes('cost')) {
        reply = "Our prices are fully matched to official manufacturer factory rates in Ghana Cedis (GH₵). You can filter by price or use code APEX50 for GH₵ 50 off!";
      } else if (userMsg.toLowerCase().includes('samsung') || userMsg.toLowerCase().includes('iphone')) {
        reply = "We have authentic factory-sealed Samsung Galaxy and Apple iPhones in stock right now with 1-year official warranty and same-day delivery.";
      } else if (userMsg.toLowerCase().includes('delivery') || userMsg.toLowerCase().includes('location')) {
        reply = "We offer same-day express delivery in Greater Accra, next-day delivery in Kumasi, and 24-48 hours across all 16 regions in Ghana.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: reply,
          time: 'Just now'
        }
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-[#073c2c] text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-emerald-300" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight">ApexTech Support Desk</h4>
                <div className="flex items-center gap-1 text-[10px] text-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Online • Hotline: 030 222 5651</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white cursor-pointer p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages list */}
          <div className="p-3.5 space-y-3 h-64 overflow-y-auto bg-slate-50 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-2.5 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#073c2c] text-white rounded-br-none'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-2xs'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-0.5 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Quick prompt suggestions */}
          <div className="px-3 py-2 bg-slate-100/70 border-t border-slate-200 flex gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
            <button
              onClick={() => setInputText('How fast is delivery to Kumasi?')}
              className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-full whitespace-nowrap hover:bg-slate-50 cursor-pointer"
            >
              Delivery time?
            </button>
            <button
              onClick={() => setInputText('How does ApexTech Warranty work?')}
              className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-full whitespace-nowrap hover:bg-slate-50 cursor-pointer"
            >
              Warranty coverage?
            </button>
            <button
              onClick={() => setInputText('Do you support MTN MoMo payment?')}
              className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-full whitespace-nowrap hover:bg-slate-50 cursor-pointer"
            >
              MoMo accepted?
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-2 bg-white border-t border-slate-200 flex items-center gap-1.5">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about phones, warranty, branches..."
              className="flex-1 px-3 py-2 text-xs text-slate-800 focus:outline-none bg-slate-50 rounded-xl"
            />
            <button
              type="submit"
              className="bg-[#073c2c] hover:bg-[#05291e] text-white p-2 rounded-xl transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button with "Chat With Us" and Unread (1) pill */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <div className="bg-white text-slate-800 text-[11px] font-bold py-1 px-2.5 rounded-full shadow-md border border-slate-200 flex items-center gap-1.5 select-none animate-bounce">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Chat With Us</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-12 h-12 rounded-full bg-[#15803d] hover:bg-[#166534] text-white shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          title="Chat with ApexTech Desk"
        >
          <MessageSquare className="w-6 h-6 fill-current" />
          {!isOpen && (
            <span className="absolute -top-1 -right-1 bg-[#dc2626] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
              1
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
