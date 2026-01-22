
import React, { useState } from 'react';
import { getDietProtocol } from '../services/gemini';
import { Apple, AlertTriangle, Play, CheckCircle } from 'lucide-react';

interface DietTabProps {
  weight: number;
  height: number;
}

export const DietTab: React.FC<DietTabProps> = ({ weight, height }) => {
  const [allergies, setAllergies] = useState('');
  const [goal, setGoal] = useState<'gain' | 'lose'>('lose');
  const [protocol, setProtocol] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await getDietProtocol(weight, height, allergies, goal);
    setProtocol(result);
    setLoading(false);
  };

  return (
    <div className="py-20 px-6 max-w-5xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-orbitron font-black uppercase tracking-tighter">PROTOCOLO ALIMENTAR</h2>
          <div className="h-1 w-20 bg-cyan-500 mt-2"></div>
        </div>
        <div className="flex space-x-4 bg-white/5 p-4 border border-white/5 rounded-sm">
           <div className="text-center">
             <span className="block text-[8px] font-orbitron text-white/30 tracking-widest uppercase">PESO_ATUAL</span>
             <span className="text-cyan-400 font-orbitron font-bold">{weight}kg</span>
           </div>
           <div className="w-px h-full bg-white/10" />
           <div className="text-center">
             <span className="block text-[8px] font-orbitron text-white/30 tracking-widest uppercase">ALTURA_ATUAL</span>
             <span className="text-cyan-400 font-orbitron font-bold">{height}cm</span>
           </div>
           <div className="ml-2 flex items-center">
             <CheckCircle className="w-4 h-4 text-cyan-500 opacity-50" />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Parameters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-glass p-8 border border-white/5 space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 opacity-10 group-hover:opacity-100 transition-opacity" />
            <h3 className="font-orbitron text-[10px] text-white/60 tracking-[0.3em] uppercase mb-4">CONFIGURAÇÕES_METABÓLICAS</h3>

            <div>
              <label className="text-[10px] font-orbitron text-white/30 block mb-3 uppercase tracking-widest">Alergias / Intolerâncias</label>
              <textarea 
                value={allergies} 
                onChange={(e) => setAllergies(e.target.value)}
                placeholder="Ex: Glúten, Lactose, Nozes..."
                className="w-full bg-white/5 p-4 text-sm border border-white/10 h-28 focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-white/10"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-orbitron text-white/30 block uppercase tracking-widest">Objetivo Primário</label>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setGoal('lose')}
                  className={`w-full py-4 text-xs font-orbitron font-black tracking-widest transition-all border-2 ${
                    goal === 'lose' 
                    ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                    : 'bg-white/5 text-white border-white/10 hover:border-white/20'
                  }`}
                >
                  PERDA DE PESO
                </button>
                <button 
                  onClick={() => setGoal('gain')}
                  className={`w-full py-4 text-xs font-orbitron font-black tracking-widest transition-all border-2 ${
                    goal === 'gain' 
                    ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                    : 'bg-white/5 text-white border-white/10 hover:border-white/20'
                  }`}
                >
                  GANHO DE MASSA
                </button>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-5 bg-white text-black font-black font-orbitron text-sm tracking-widest hover:bg-cyan-500 transition-all flex items-center justify-center space-x-3 group"
            >
              {loading ? (
                <span className="animate-pulse">SINCRONIZANDO...</span>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" /> 
                  <span>GERAR PROTOCOLO IA</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Side: Protocol Display */}
        <div className="lg:col-span-2 bg-glass border border-white/5 relative min-h-[500px] flex flex-col">
          <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-white/20 uppercase tracking-widest">
            NEXUS_BIO_OS_SECURE
          </div>
          
          {protocol ? (
            <div className="p-8 md:p-12 overflow-y-auto max-h-[700px] custom-scrollbar">
               <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-white/80 protocol-content">
                 {protocol}
               </div>
            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-12 space-y-6">
              <div className="relative">
                <Apple className="w-16 h-16 text-cyan-500 opacity-10 animate-pulse" />
                <AlertTriangle className="w-6 h-6 text-cyan-500 absolute -bottom-1 -right-1 opacity-40" />
              </div>
              <div>
                <p className="font-orbitron text-xs tracking-[0.4em] text-white/20 uppercase">AGUARDANDO SEQUÊNCIA DE COMANDO</p>
                <p className="text-[10px] text-white/10 mt-2">Insira suas restrições e selecione o objetivo.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        .protocol-content h1, .protocol-content h2, .protocol-content h3 {
          color: #22d3ee;
          font-family: 'Orbitron', sans-serif;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .protocol-content strong {
          color: #fff;
          font-weight: 800;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};
