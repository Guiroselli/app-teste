
import React, { useState } from 'react';
import { Menu, X, Activity, Cpu, Shield, User, Apple, Dumbbell, Zap, Layout, CreditCard } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  level: number;
  xp: number;
  plan: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, level, xp, plan }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { id: 'home', label: 'INÍCIO', icon: <Layout className="w-4 h-4" /> },
    { id: 'missoes', label: 'MISSÕES', icon: <Zap className="w-4 h-4" /> },
    { id: 'treino', label: 'TREINO', icon: <Dumbbell className="w-4 h-4" /> },
    { id: 'avatar', label: 'AVATAR', icon: <User className="w-4 h-4" /> },
    { id: 'dieta', label: 'DIETA', icon: <Apple className="w-4 h-4" /> },
    { id: 'planos', label: 'PLANOS', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'coach', label: 'GUARDIÃO', icon: <Cpu className="w-4 h-4" /> },
  ];

  const xpProgress = (xp / (level * 1000)) * 100;

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] bg-black/80 backdrop-blur-2xl border-b border-white/5 px-4 md:px-8 h-16 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center space-x-2 cursor-pointer group flex-shrink-0 mr-4"
          onClick={() => handleTabClick('home')}
        >
          <div className="w-6 h-6 bg-cyan-500 rounded-sm rotate-45 flex items-center justify-center transition-transform group-hover:rotate-[135deg] duration-500">
            <div className="w-3 h-3 bg-black rounded-sm"></div>
          </div>
          <span className="font-orbitron font-bold text-lg tracking-tighter hidden lg:block">NEXUS</span>
        </div>
        
        {/* Desktop Navigation Tabs */}
        <div className="hidden md:flex space-x-6 whitespace-nowrap py-2 flex-grow justify-center px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`text-xs font-bold tracking-[0.2em] transition-all relative py-2 ${
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

        {/* Right Side Info & Mobile Trigger */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          {/* Desktop Stats */}
          <div className="hidden md:flex flex-col items-end">
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

          {/* Desktop ID/Plan */}
          <div className="hidden md:flex flex-col items-center">
             <span className={`text-[8px] font-orbitron px-2 py-0.5 rounded-sm mb-1 ${
               plan === 'free' ? 'text-white/30 border border-white/10' : 
               plan === 'pro' ? 'text-cyan-400 border border-cyan-500/30 bg-cyan-500/5' : 
               'text-purple-500 border border-purple-500/30 bg-purple-500/5'
             }`}>
               {plan.toUpperCase()}
             </span>
          </div>

          {/* Mobile Specific: Three Action Icons */}
          <div 
            className="flex md:hidden items-center space-x-3 cursor-pointer p-2 hover:bg-white/5 transition-colors"
            onClick={() => setIsMenuOpen(true)}
          >
            <Activity className="w-4 h-4 text-cyan-500" />
            <Cpu className="w-4 h-4 text-purple-500" />
            <Shield className="w-4 h-4 text-white/40" />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[200] md:hidden animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setIsMenuOpen(false)} />
          
          <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-glass border-l border-white/10 p-8 flex flex-col animate-in slide-in-from-right duration-500">
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-cyan-500 rotate-45 flex items-center justify-center">
                  <div className="w-2 h-2 bg-black"></div>
                </div>
                <span className="font-orbitron font-black text-sm tracking-widest text-white">CENTRO_DE_COMANDO</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X className="w-6 h-6 text-white/40" />
              </button>
            </div>

            {/* Stats Summary Mobile */}
            <div className="bg-white/5 border border-white/10 p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-orbitron text-white/30 uppercase tracking-widest">Nível_Operacional</span>
                <span className="text-xl font-orbitron font-black text-cyan-400">{level}</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" 
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Patente</span>
                <span className="text-[8px] font-orbitron text-cyan-400 font-bold uppercase">{plan}</span>
              </div>
            </div>

            {/* Navigation List */}
            <div className="flex-grow space-y-2 overflow-y-auto no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`w-full flex items-center space-x-4 p-4 transition-all border ${
                    activeTab === tab.id 
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' 
                    : 'border-transparent text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className={activeTab === tab.id ? 'text-cyan-400' : 'text-white/20'}>
                    {tab.icon}
                  </div>
                  <span className="font-orbitron font-bold text-xs tracking-[0.2em]">{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <p className="text-[8px] font-mono text-white/10 uppercase tracking-[0.4em]">NEXUS_v2.5_MOBILE_STABLE</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
