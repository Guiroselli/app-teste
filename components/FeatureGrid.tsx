
import React from 'react';
import { Target, Zap, Layout, ShieldAlert } from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-10 h-10" />,
    title: "CALISTENIA ADAPTATIVA",
    desc: "Treinos calculados pelo seu nível de fadiga real. Cada movimento gera data para sua evolução física.",
    color: "cyan",
    tag: "PHYSICAL"
  },
  {
    icon: <Target className="w-10 h-10" />,
    title: "DIREÇÃO CONSISTENTE",
    desc: "O fim da paralisia de escolha. Receba a próxima ação lógica para sua melhora imediata.",
    color: "purple",
    tag: "COGNITIVE"
  },
  {
    icon: <Layout className="w-10 h-10" />,
    title: "ARQUITETURA DA CASA",
    desc: "Transforme sua sala em uma zona de alta performance sem equipamentos caros. Física robótica aplicada.",
    color: "green",
    tag: "ENVIRONMENT"
  },
  {
    icon: <ShieldAlert className="w-10 h-10" />,
    title: "DESMONTE MENTAL",
    desc: "Infiltre-se nas suas próprias crenças limitantes e as remova sistematicamente.",
    color: "red",
    tag: "NEURAL"
  }
];

export const FeatureGrid: React.FC = () => {
  return (
    <section className="py-20 px-6 min-h-[calc(100vh-64px)] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-orbitron font-black mb-4 tracking-tighter uppercase">ARQUITETURA DO SISTEMA</h2>
          <p className="text-white/30 font-mono text-xs tracking-[0.3em]">VERSION_2.5_CORE_MODULES</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-glass p-8 group border border-white/5 hover:border-cyan-500/40 transition-all duration-500 relative overflow-hidden flex flex-col h-full">
              <div className="flex justify-between items-start mb-10">
                <div className={`text-${f.color}-500 transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]`}>
                  {f.icon}
                </div>
                <span className="text-[9px] font-orbitron text-white/20 border border-white/10 px-2 py-1 tracking-widest">{f.tag}</span>
              </div>
              
              <h3 className="text-xl font-orbitron font-bold mb-4 tracking-tighter group-hover:text-cyan-400 transition-colors">{f.title}</h3>
              <p className="text-white/40 leading-relaxed font-light text-sm mb-8 flex-grow">{f.desc}</p>
              
              <div className="pt-4 border-t border-white/5">
                <button className="text-[10px] font-orbitron tracking-widest text-cyan-500 hover:text-white transition-colors">
                  EXPLORAR_MÓDULO >
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
