
import React from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  level: number;
  xp: number;
  plan: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, level, xp, plan }) => {
  const tabs = [
    { id: 'home', label: 'INÍCIO' },
    { id: 'missoes', label: 'MISSÕES' },
    { id: 'treino', label: 'TREINO' },
    { id: 'avatar', label: 'AVATAR' },
    { id: 'dieta', label: 'DIETA' },
    { id: 'planos', label: 'PLANOS' },
    { id: 'coach', label: 'GUARDIÃO' },
  ];

  const xpProgress = (xp / (level * 1000)) * 100;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-2xl border-b border-white/5 px-4 md:px-8 h-16 flex justify-between items-center">
      <div 
        className="flex items-center space-x-2 cursor-pointer group flex-shrink-0 mr-4"
        onClick={() => setActiveTab('home')}
      >
        <div className="w-6 h-6 bg-cyan-500 rounded-sm rotate-45 flex items-center justify-center transition-transform group-hover:rotate-[135deg] duration-500">
          <div className="w-3 h-3 bg-black rounded-sm"></div>
        </div>
        <span className="font-orbitron font-bold text-lg tracking-tighter hidden lg:block">NEXUS</span>
      </div>
      
      <div className="flex space-x-4 md:space-x-6 whitespace-nowrap overflow-x-auto no-scrollbar py-2 flex-grow justify-center px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-[9px] md:text-xs font-bold tracking-[0.2em] transition-all relative py-2 ${
              activeTab === tab.id ? 'text-cyan-400' : 'text-white/40 hover:text-white'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-4 ml-4 flex-shrink-0">
        <div className="hidden sm:flex flex-col items-end">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-orbitron text-white/30 tracking-widest uppercase">LVL</span>
            <span className="text-xs font-orbitron font-black text-cyan-400">{level}</span>
          </div>
          <div className="w-24 h-1 bg-white/10 mt-1 rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan-500 shadow-[0_0_5px_#06b6d4] transition-all duration-500" 
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
           <span className={`text-[8px] font-orbitron px-2 py-0.5 rounded-sm mb-1 ${
             plan === 'free' ? 'text-white/30 border border-white/10' : 
             plan === 'pro' ? 'text-cyan-500 border border-cyan-500/30 bg-cyan-500/5' : 
             'text-purple-500 border border-purple-500/30 bg-purple-500/5'
           }`}>
             {plan.toUpperCase()}
           </span>
           <button 
             onClick={() => setActiveTab('acesso')}
             className="px-4 py-1.5 border border-white/10 hover:border-cyan-500/50 text-white/60 hover:text-cyan-400 font-orbitron text-[9px] tracking-widest rounded-sm transition-all whitespace-nowrap"
           >
             ID: NEXUS_ELITE
           </button>
        </div>
      </div>
    </nav>
  );
};
