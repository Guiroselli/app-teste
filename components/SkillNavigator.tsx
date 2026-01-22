
import React from 'react';
import { Dumbbell, User, Apple, Lock } from 'lucide-react';

interface SkillNavigatorProps {
  onNavigate: (tab: string) => void;
  plan: string;
}

export const SkillNavigator: React.FC<SkillNavigatorProps> = ({ onNavigate, plan }) => {
  const isFree = plan === 'free';

  const skills = [
    { 
      id: 'treino', 
      label: 'FISIOLÓGICO', 
      sub: 'Protocolos de Treino', 
      icon: <Dumbbell className="w-8 h-8" />, 
      color: 'cyan',
      locked: false 
    },
    { 
      id: 'avatar', 
      label: 'BIOMÉTRICO', 
      sub: 'Evolução Holográfica', 
      icon: <User className="w-8 h-8" />, 
      color: 'purple',
      locked: false 
    },
    { 
      id: 'dieta', 
      label: 'NUTRICIONAL', 
      sub: 'Protocolo de Dieta IA', 
      icon: <Apple className="w-8 h-8" />, 
      color: 'red',
      locked: isFree 
    },
  ];

  return (
    <div className="py-20 px-6 max-w-6xl mx-auto w-full">
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-4xl font-orbitron font-black mb-2 tracking-tighter uppercase">NÚCLEO DO SISTEMA</h2>
        <p className="text-white/20 font-mono text-[9px] tracking-[0.4em] uppercase underline decoration-cyan-500/50 underline-offset-8">Sincronização de Habilidades</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
        {skills.map((skill) => (
          <div 
            key={skill.id}
            onClick={() => onNavigate(skill.id)}
            className="group perspective-1000 cursor-pointer h-64 md:h-80"
          >
            <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
              {/* Front Side */}
              <div className="absolute inset-0 backface-hidden bg-glass border border-white/5 flex flex-col items-center justify-center p-8 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors" />
                
                <div className={`w-20 h-20 rounded-sm border border-white/10 flex items-center justify-center mb-6 text-${skill.color}-500 shadow-[0_0_15px_rgba(255,255,255,0.02)]`}>
                  {skill.icon}
                </div>
                
                <h3 className="font-orbitron font-black text-xl tracking-widest text-white mb-2">{skill.label}</h3>
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">{skill.sub}</p>
                
                {skill.locked && (
                  <div className="mt-4 flex items-center space-x-2 text-red-500/50">
                    <Lock className="w-3 h-3" />
                    <span className="text-[8px] font-orbitron font-black tracking-widest uppercase">RESTRITO</span>
                  </div>
                )}
              </div>

              {/* Back Side (The Tab Reveal Style) */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-cyan-500 flex flex-col items-center justify-center p-8 text-black shadow-[0_0_50px_rgba(6,182,212,0.3)]">
                <div className="text-black font-black text-4xl mb-4">
                  {skill.locked ? <Lock className="w-12 h-12" /> : <Zap className="w-12 h-12" />}
                </div>
                <h4 className="font-orbitron font-black text-2xl mb-2">
                  {skill.locked ? 'UPGRADE_REQUIRED' : 'ACCESS_GRANTED'}
                </h4>
                <p className="text-[10px] font-bold text-black/60 uppercase tracking-widest text-center">
                  {skill.locked ? 'Desbloqueie o Protocolo Elite para sincronizar.' : 'Clique para entrar na Matrix de dados.'}
                </p>
                <div className="mt-6 px-6 py-2 border-2 border-black font-orbitron font-black text-[10px] tracking-widest">
                  ABRIR_MODULO
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

import { Zap } from 'lucide-react';
