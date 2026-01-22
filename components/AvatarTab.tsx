
import React, { useMemo } from 'react';
import { Lock } from 'lucide-react';

interface AvatarTabProps {
  weight: number;
  setWeight: (w: number) => void;
  height: number;
  setHeight: (h: number) => void;
  plan: string;
}

export const AvatarTab: React.FC<AvatarTabProps> = ({ weight, setWeight, height, setHeight, plan }) => {
  const isFree = plan === 'free';
  
  const stats = useMemo(() => {
    const bmiValue = (weight / ((height / 100) ** 2));
    const bmi = bmiValue.toFixed(1);
    let status = 'OPTIMAL_BALANCE';
    if (bmiValue > 25) status = 'HEAVY_LOAD';
    if (bmiValue < 18.5) status = 'LIGHT_AGILITY';
    
    // Scaling factors normalized to 70kg and 170cm
    const wScale = weight / 70;
    const hScale = height / 170;
    
    return { bmi, status, wScale, hScale };
  }, [weight, height]);

  return (
    <div className="py-20 px-6 max-w-5xl mx-auto h-full flex flex-col justify-center">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-orbitron font-black mb-2 tracking-tighter uppercase">HOLOGRAMA BIOMÉTRICO</h2>
        <p className="text-white/30 font-mono text-[10px] tracking-[0.4em]">PROJEÇÃO_DE_EVOLUÇÃO_v2.0</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Controls */}
        <div className="space-y-8 order-2 lg:order-1">
          <div className="bg-glass p-8 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 opacity-20" />
            <div className="flex justify-between items-center mb-6">
              <label className="font-orbitron text-xs text-white/50 tracking-widest uppercase">Massa Corporal</label>
              <span className="text-cyan-400 font-orbitron text-lg">{weight} kg</span>
            </div>
            <input 
              type="range" min="40" max="150" value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>

          <div className="bg-glass p-8 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 opacity-20" />
            <div className="flex justify-between items-center mb-6">
              <label className="font-orbitron text-xs text-white/50 tracking-widest uppercase">Estatura Vertical</label>
              <span className="text-cyan-400 font-orbitron text-lg">{height} cm</span>
            </div>
            <input 
              type="range" min="140" max="220" value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 border border-white/5 bg-white/5 text-center">
              <span className="block text-[10px] font-orbitron text-white/30 mb-1">ÍNDICE_IMC</span>
              <span className="text-2xl font-orbitron font-bold text-white">{stats.bmi}</span>
            </div>
            <div className="p-6 border border-cyan-500/20 bg-cyan-500/5 text-center relative overflow-hidden group">
              {isFree && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Lock className="w-4 h-4 text-cyan-500" />
                </div>
              )}
              <span className="block text-[10px] font-orbitron text-white/30 mb-1">STATUS_SISTEMA</span>
              <span className="text-xs font-orbitron font-bold text-cyan-400 block mt-2">{stats.status}</span>
            </div>
          </div>
        </div>

        {/* Avatar Display */}
        <div className="relative flex justify-center items-center h-[500px] bg-white/5 rounded-sm border border-white/5 overflow-hidden order-1 lg:order-2">
          {/* Scanning lines */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="w-full h-px bg-cyan-500 absolute animate-[scan_4s_linear_infinite]" style={{ top: '0%' }} />
          </div>
          
          <div className="absolute bottom-10 w-full flex justify-center">
             <div className="w-48 h-8 bg-cyan-500/10 rounded-[100%] blur-xl animate-pulse" />
          </div>

          <svg 
            viewBox="0 0 200 400" 
            className={`h-[80%] transition-all duration-500 ${plan === 'master' ? 'drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]' : 'drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]'}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="nexusGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={plan === 'master' ? '#a855f7' : '#22d3ee'} stopOpacity="0.8" />
                <stop offset="100%" stopColor={plan === 'master' ? '#6b21a8' : '#0891b2'} stopOpacity="0.4" />
              </linearGradient>
            </defs>

            <g transform={`translate(100, 200) scale(${stats.wScale}, ${stats.hScale}) translate(-100, -200)`}>
              <circle cx="100" cy="60" r="22" fill="url(#nexusGradient)" />
              <rect x={100 - (30 * stats.wScale)} y="90" width={60 * stats.wScale} height="100" rx="15" fill="url(#nexusGradient)" />
              <rect x={100 - (30 * stats.wScale) - (15 * stats.wScale)} y="95" width={12 * stats.wScale} height="80" rx="6" fill="url(#nexusGradient)" transform={`rotate(5, ${100 - (30 * stats.wScale)}, 95)`} />
              <rect x={100 + (30 * stats.wScale) + 3} y="95" width={12 * stats.wScale} height="80" rx="6" fill="url(#nexusGradient)" transform={`rotate(-5, ${100 + (30 * stats.wScale)}, 95)`} />
              <rect x={100 - (22 * stats.wScale)} y="195" width={18 * stats.wScale} height="120" rx="8" fill="url(#nexusGradient)" />
              <rect x={100 + (4 * stats.wScale)} y="195" width={18 * stats.wScale} height="120" rx="8" fill="url(#nexusGradient)" />
            </g>
          </svg>

          {isFree ? (
            <div className="absolute top-6 right-6 text-[10px] font-mono text-white/40 bg-white/5 px-2 py-1 border border-white/10">
              BIO_SYNC: LIMITED
            </div>
          ) : (
            <div className="absolute top-6 right-6 text-[10px] font-mono text-cyan-500 animate-pulse bg-cyan-500/10 px-2 py-1 border border-cyan-500/30">
              BIO_SYNC: {plan === 'master' ? 'FULL_MATRIX' : 'EVOLVING'}
            </div>
          )}
          
          <div className="absolute bottom-6 left-6 text-[9px] font-mono text-white/20 tracking-widest uppercase">
            ID: {plan === 'master' ? 'GUARD_ALPHA' : plan === 'pro' ? 'ELITE_SYNC' : 'OPER_BASE'}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};
