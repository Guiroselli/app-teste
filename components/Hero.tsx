
import React from 'react';
import { SkillNavigator } from './SkillNavigator';

interface HeroProps {
  onNavigate: (tab: string) => void;
  plan: string;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, plan }) => {
  return (
    <div className="w-full">
      <section className="relative h-[calc(80vh-64px)] w-full flex items-center justify-center overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black z-10" />
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000" 
            alt="Atmosphere"
            className="w-full h-full object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
        </div>

        <div className="relative z-20 text-center px-4 max-w-4xl">
          <div className="inline-block px-3 py-1 border border-cyan-500/30 bg-cyan-500/5 mb-8">
            <h2 className="text-cyan-500 font-orbitron tracking-[0.5em] text-[10px] md:text-xs animate-pulse uppercase">
              SISTEMA DE EVOLUÇÃO OPERACIONALIZADO
            </h2>
          </div>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-orbitron font-black leading-none mb-8 glitch-text">
            SUA VIDA <br /> <span className="text-white uppercase">COMO UM JOGO.</span>
          </h1>
          <p className="text-base md:text-xl text-white/50 font-light max-w-xl mx-auto mb-12 leading-relaxed tracking-wide">
            Desmonte o tradicional. Otimize seu espaço. Reconstrua sua rotina através de micro-missões guiadas por IA.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => onNavigate('acesso')}
              className="w-full sm:w-auto px-12 py-5 bg-cyan-500 text-black font-black text-sm rounded-sm hover:scale-105 transition-transform font-orbitron shadow-[0_0_30px_rgba(6,182,212,0.3)] tracking-widest uppercase"
            >
              INICIAR SEQUÊNCIA
            </button>
            <button className="w-full sm:w-auto px-12 py-5 border border-white/10 text-white/60 font-bold text-sm rounded-sm hover:bg-white/5 hover:text-white transition-all font-orbitron tracking-widest uppercase">
              TRAILER_01
            </button>
          </div>
        </div>
      </section>

      {/* Skills Matrix Navigation - Hidden on Mobile, Shown on MD and up */}
      <section className="hidden md:block bg-black border-y border-white/5">
        <SkillNavigator onNavigate={onNavigate} plan={plan} />
      </section>
    </div>
  );
};
