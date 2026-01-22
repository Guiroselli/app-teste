
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiCoachResponse } from '../services/gemini';
import { Message } from '../types';
import { Send, Terminal } from 'lucide-react';

export const AICoachPreview: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Saudações, herói. O Nexus está pronto. O que te impede de evoluir hoje?' }
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await getGeminiCoachResponse(userMsg);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
  };

  return (
    <section id="coach" className="py-24 px-6 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-orbitron font-black mb-6">O GUARDIÃO</h2>
          <p className="text-white/40 text-lg">Teste a IA que dará direção ao seu futuro. Pergunte qualquer coisa.</p>
        </div>

        <div className="bg-glass rounded-sm border border-white/10 overflow-hidden shadow-2xl">
          <div className="bg-white/5 px-6 py-3 flex items-center space-x-2 border-b border-white/10">
            <Terminal className="w-4 h-4 text-cyan-500" />
            <span className="text-xs font-orbitron tracking-widest text-white/50">NEXUS_OS_v1.0.4.TERMINAL</span>
          </div>

          <div className="h-96 overflow-y-auto p-6 space-y-4 font-mono text-sm">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-sm ${m.role === 'user' ? 'bg-cyan-500 text-black font-bold' : 'bg-white/10 text-cyan-500 border border-cyan-500/20'}`}>
                  <span className="opacity-50 text-[10px] mb-1 block uppercase">{m.role === 'user' ? 'Você' : 'Guardião'}</span>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-cyan-500 animate-pulse text-xs tracking-widest uppercase">
                Analisando realidade...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-white/10 flex space-x-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite seu desafio..."
              className="flex-1 bg-white/5 border border-white/10 p-4 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <button 
              onClick={handleSend}
              className="bg-cyan-500 text-black px-6 hover:bg-white transition-all group"
            >
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
