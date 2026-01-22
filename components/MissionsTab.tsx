
import React, { useState } from 'react';
import { CheckCircle, Zap, Brain, Apple, Sun, Target, TrendingUp, Lock } from 'lucide-react';
import { Mission } from '../types';

interface MissionsTabProps {
  xp: number;
  level: number;
  addXp: (amount: number) => void;
  plan: string;
}

const INITIAL_MISSIONS: Mission[] = [
  // Fixed category typo from 'Habito' to 'Hábito' to match types.ts
  { id: 'm1', title: 'Hidratação Nível 1', description: 'Beber 2 litros de água hoje.', xpReward: 150, completed: false, category: 'Hábito' } as any,
  { id: 'm2', title: 'Foco Absoluto', description: 'Realizar 20 minutos de meditação ou silêncio.', xpReward: 200, completed: false, category: 'Mental' } as any,
  { id: 'm3', title: 'Combustível Limpo', description: 'Seguir 100% o protocolo nutricional gerado.', xpReward: 300, completed: false, category: 'Nutrição' } as any,
  // Fixed category typo from 'Habito' to 'Hábito' to match types.ts
  { id: 'm4', title: 'Exposição Solar', description: '10 minutos de luz solar direta pela manhã.', xpReward: 100, completed: false, category: 'Hábito' } as any,
  { id: 'm5', title: 'Desafio Físico', description: 'Completar qualquer missão de treino do Nexus.', xpReward: 500, completed: false, category: 'Físico' } as any,
];

export const MissionsTab: React.FC<MissionsTabProps> = ({ xp, level, addXp, plan }) => {
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);
  const isFree = plan === 'free';

  const completeMission = (id: string) => {
    setMissions(prev => prev.map(m => {
      if (m.id === id && !m.completed) {
        addXp(m.xpReward);
        return { ...m, completed: true };
      }
      return m;
    }));
  };

  const completedCount = missions.filter(m => m.completed).length;
  const xpToNextLevel = level * 1000;
  const progressPercent = (xp / xpToNextLevel) * 100;

  return (
    <div className="py-20 px-6 max-w-5xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-orbitron font-black uppercase tracking-tighter">MODO CAMPANHA</h2>
          <div className="h-1 w-24 bg-cyan-500 mt-2"></div>
        </div>
        
        <div className="bg-glass p-6 border border-white/5 min-w-[300px]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-orbitron text-white/30 tracking-widest">PROGRESSO_GLOBAL</span>
            <span className="text-xs font-orbitron text-cyan-400">LVL {level}</span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4] transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[9px] font-mono text-white/20">{xp} XP</span>
            <span className="text-[9px] font-mono text-white/20">{xpToNextLevel} XP</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Missions List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-2 mb-6">
            <Target className="w-5 h-5 text-cyan-500" />
            <h3 className="font-orbitron text-sm font-bold tracking-widest text-white/60">MISSÕES_DIÁRIAS</h3>
          </div>
          
          {missions.map((m, index) => {
            const isLocked = isFree && index >= 2;
            
            return (
              <div 
                key={m.id}
                className={`bg-glass p-6 border transition-all duration-300 relative overflow-hidden group ${
                  m.completed ? 'border-green-500/20 opacity-60' : 'border-white/5 hover:border-cyan-500/30'
                } ${isLocked ? 'grayscale opacity-40 cursor-not-allowed' : ''}`}
              >
                {isLocked && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-10 flex items-center justify-center">
                    <div className="bg-black/80 p-2 border border-cyan-500/30 flex items-center space-x-2">
                      <Lock className="w-3 h-3 text-cyan-500" />
                      <span className="text-[8px] font-orbitron text-cyan-500 uppercase tracking-widest">Upgrade_Necessário</span>
                    </div>
                  </div>
                )}
                
                {m.completed && (
                  <div className="absolute inset-0 bg-green-500/5 pointer-events-none" />
                )}
                
                <div className="flex items-start justify-between">
                  <div className="flex space-x-4">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-sm border ${
                      m.completed ? 'bg-green-500/10 border-green-500/30' : 'bg-white/5 border-white/10'
                    }`}>
                      {m.category === 'Físico' && <Zap className={m.completed ? 'text-green-400' : 'text-cyan-400'} />}
                      {m.category === 'Mental' && <Brain className={m.completed ? 'text-green-400' : 'text-purple-400'} />}
                      {m.category === 'Nutrição' && <Apple className={m.completed ? 'text-green-400' : 'text-red-400'} />}
                      {/* Fixed category typo from 'Habito' to 'Hábito' to match types.ts */}
                      {m.category === 'Hábito' && <Sun className={m.completed ? 'text-green-400' : 'text-yellow-400'} />}
                    </div>
                    <div>
                      <h4 className={`font-orbitron font-bold text-lg uppercase ${m.completed ? 'text-green-400 line-through' : 'text-white'}`}>
                        {m.title}
                      </h4>
                      <p className="text-white/40 text-xs mt-1 leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-3">
                    <span className={`text-[10px] font-mono ${m.completed ? 'text-green-500' : 'text-cyan-500'} font-bold`}>
                      +{m.xpReward} XP
                    </span>
                    {!m.completed ? (
                      <button 
                        disabled={isLocked}
                        onClick={() => completeMission(m.id)}
                        className="px-4 py-2 border border-cyan-500/30 text-cyan-500 font-orbitron text-[9px] font-black tracking-widest hover:bg-cyan-500 hover:text-black transition-all"
                      >
                        CONCLUIR
                      </button>
                    ) : (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar Status */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-glass p-8 border border-white/5 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full border-4 border-cyan-500/20 flex items-center justify-center mb-6 relative">
              <span className="text-4xl font-orbitron font-black text-white">{level}</span>
              <div className="absolute inset-0 border-t-4 border-cyan-500 rounded-full animate-[spin_3s_linear_infinite]" />
            </div>
            <h4 className="font-orbitron font-bold text-lg text-cyan-400 tracking-widest uppercase">
               {plan === 'free' ? 'OPERADOR_BASE' : plan === 'pro' ? 'OPERADOR_ELITE' : 'GUARDIÃO_DO_NEXUS'}
            </h4>
            <p className="text-[10px] text-white/20 mt-2 tracking-[0.2em]">SISTEMA_OPERACIONAL_STABLE</p>
            
            <div className="w-full h-px bg-white/5 my-6" />
            
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-orbitron text-white/30 uppercase tracking-widest">Missões Diárias</span>
                <span className="text-sm font-orbitron font-bold text-white">{completedCount} / {isFree ? '2' : missions.length}</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-500 transition-all duration-500" 
                  style={{ width: `${(completedCount / (isFree ? 2 : missions.length)) * 100}%` }}
                />
              </div>
              {completedCount >= 2 ? (
                <div className="flex items-center space-x-2 text-green-400/80 justify-center pt-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-[9px] font-orbitron tracking-widest">BÔNUS_DIÁRIO_ATIVO</span>
                </div>
              ) : (
                <p className="text-[9px] font-orbitron text-white/10 tracking-widest uppercase text-center pt-2">
                  Complete {isFree ? '2' : '3'} para bônus
                </p>
              )}
            </div>
          </div>

          <div className="bg-cyan-500/5 border border-cyan-500/20 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-4 h-4 text-cyan-500" />
              <span className="text-[9px] font-orbitron text-cyan-400 tracking-widest uppercase">INSIGHT_DO_GUARDIÃO</span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed font-light">
              "A consistência é o código fonte da maestria. Cada missão completada hoje reescreve seu amanhã. Não pare agora."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
