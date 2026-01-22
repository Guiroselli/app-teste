
import React from 'react';
import { Hero } from '../components/Hero';
import { FeatureGrid } from '../components/FeatureGrid';
import { AICoachPreview } from '../components/AICoachPreview';
import { WaitlistForm } from '../components/WaitlistForm';

const LandingPage: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-1000">
      <Hero />
      <FeatureGrid />
      
      {/* Narrative Section */}
      <section className="py-24 px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-6 leading-tight">
              A GUERRA DA IA ESTÁ <br /> 
              <span className="text-cyan-500">APENAS COMEÇANDO.</span>
            </h2>
            <p className="text-white/50 text-lg mb-6 leading-relaxed">
              Enquanto o mundo se perde no tradicional, nós construímos o futuro. O Nexus não é apenas uma ferramenta; é um ecossistema projetado para que qualquer pessoa alcance o topo através de mudanças simples e consistentes.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-cyan-400">
                <div className="w-2 h-2 bg-cyan-500 rotate-45" />
                <span className="font-mono text-sm tracking-widest">ESTÉTICA MODERNA ÚNICA</span>
              </li>
              <li className="flex items-center space-x-3 text-cyan-400">
                <div className="w-2 h-2 bg-cyan-500 rotate-45" />
                <span className="font-mono text-sm tracking-widest">FIGURAS ESPORTIVAS COMO GUIAS</span>
              </li>
              <li className="flex items-center space-x-3 text-cyan-400">
                <div className="w-2 h-2 bg-cyan-500 rotate-45" />
                <span className="font-mono text-sm tracking-widest">RECOMPENSAS REAIS E VIRTUAIS</span>
              </li>
            </ul>
          </div>
          <div className="flex-1 relative">
            <div className="aspect-square bg-white/5 rounded-sm overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1548690312-e3b507d17a12?auto=format&fit=crop&q=80&w=800" 
                alt="Vision"
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/40 to-transparent" />
            </div>
            {/* Visual Glitch Frame */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b-2 border-r-2 border-cyan-500" />
            <div className="absolute -top-4 -left-4 w-32 h-32 border-t-2 border-l-2 border-cyan-500" />
          </div>
        </div>
      </section>

      <AICoachPreview />
      <WaitlistForm />
    </div>
  );
};

export default LandingPage;
