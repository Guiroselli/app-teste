
import React from 'react';
import { Lock, ShieldAlert } from 'lucide-react';

interface AccessDeniedProps {
  requiredPlan: string;
  onUpgrade: () => void;
}

export const AccessDenied: React.FC<AccessDeniedProps> = ({ requiredPlan, onUpgrade }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="bg-glass border border-red-500/20 p-12 max-w-lg w-full text-center relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-all" />
        
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/30 animate-pulse">
            <Lock className="w-10 h-10 text-red-500" />
          </div>
        </div>

        <h2 className="text-3xl font-orbitron font-black mb-4 text-white uppercase tracking-tighter">ACESSO_NEGADO</h2>
        <p className="text-white/40 font-mono text-xs tracking-widest mb-8 uppercase">CRIPTOGRAFIA DE NÍVEL 4 DETECTADA</p>
        
        <div className="bg-white/5 p-6 border border-white/10 mb-8 text-left">
          <div className="flex items-center space-x-3 mb-2">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span className="text-[10px] font-orbitron text-red-400 tracking-widest">AVISO_DE_SISTEMA</span>
          </div>
          <p className="text-sm text-white/70 leading-relaxed italic">
            "Este módulo é restrito a operadores de patente <span className="text-cyan-400 font-bold">{requiredPlan}</span> ou superior. Seu nível atual de autorização é insuficiente para processar estes dados."
          </p>
        </div>

        <button 
          onClick={onUpgrade}
          className="w-full py-5 bg-cyan-500 text-black font-black font-orbitron text-sm tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
        >
          ELEVAR PATENTE AGORA
        </button>
        
        <p className="mt-6 text-[9px] font-mono text-white/10 tracking-[0.3em] uppercase">SISTEMA_OPERACIONAL_NEXUS</p>
      </div>
    </div>
  );
};
