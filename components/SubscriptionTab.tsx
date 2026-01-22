
import React, { useState } from 'react';
import { ShieldCheck, Zap, Globe, Cpu, X, CreditCard, Lock, CheckCircle2, Loader2 } from 'lucide-react';

interface SubscriptionTabProps {
  currentPlan: 'free' | 'pro' | 'master';
  onPlanChange: (plan: 'free' | 'pro' | 'master') => void;
}

export const SubscriptionTab: React.FC<SubscriptionTabProps> = ({ currentPlan, onPlanChange }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<'free' | 'pro' | 'master' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'info' | 'processing' | 'success'>('info');

  const plans = [
    {
      id: 'free',
      name: 'OPERÁRIO',
      price: 'R$ 0',
      features: ['Treinos Básicos', 'Avatar Padrão', 'Tracking Simples'],
      icon: <Globe className="text-white/40" />,
      internalId: 'free'
    },
    {
      id: 'pro',
      name: 'NEXUS ELITE',
      price: 'R$ 29/mês',
      features: ['Dieta IA Ilimitada', 'Avatar Evolutivo', 'Todos os Treinos', 'IA Coach Ativo'],
      isPremium: true,
      icon: <Zap className="text-cyan-500" />,
      internalId: 'pro'
    },
    {
      id: 'master',
      name: 'GUARD' ,
      price: 'R$ 59/mês',
      features: ['Acompanhamento 1:1', 'Skins Exclusivas', 'Biofeedback Avançado', 'Prioridade na Matrix'],
      icon: <Cpu className="text-purple-500" />,
      internalId: 'master'
    }
  ];

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStep('processing');
    // Simulate real bank communication
    setTimeout(() => {
      setPaymentStep('success');
      if (selectedPlanId) {
        onPlanChange(selectedPlanId);
      }
    }, 3000);
  };

  return (
    <div className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-orbitron font-black mb-4">NÍVEIS DE ACESSO</h2>
        <p className="text-white/30 font-mono text-xs tracking-[0.3em]">ESCOLHA_SUA_PATENTE</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((p) => (
          <div 
            key={p.id} 
            className={`bg-glass p-8 border transition-all duration-500 flex flex-col relative ${
              currentPlan === p.id 
              ? 'border-cyan-500 bg-cyan-500/5 shadow-[0_0_30px_rgba(6,182,212,0.2)]' 
              : p.isPremium ? 'border-cyan-500/20 hover:border-cyan-500/50' : 'border-white/5 hover:border-white/20'
            }`}
          >
            {currentPlan === p.id && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-[9px] font-black px-3 py-1 font-orbitron tracking-widest uppercase">
                PATENTE_ATUAL
              </div>
            )}

            <div className="mb-8 flex justify-between items-start">
              <div className="p-3 bg-white/5 rounded-sm">{p.icon}</div>
              {p.isPremium && <span className="text-[8px] bg-cyan-500 text-black px-2 py-0.5 font-black uppercase">MAIS_POPULAR</span>}
            </div>
            
            <h3 className="text-2xl font-orbitron font-black mb-2 uppercase">{p.name}</h3>
            <div className="text-3xl font-orbitron font-bold text-white mb-8">{p.price}</div>
            
            <ul className="space-y-4 mb-10 flex-grow">
              {p.features.map((f, i) => (
                <li key={i} className="flex items-center space-x-3 text-xs text-white/50">
                  <ShieldCheck className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button 
              disabled={currentPlan === p.id}
              onClick={() => setSelectedPlanId(p.internalId as any)}
              className={`w-full py-4 font-orbitron text-xs font-black tracking-widest transition-all ${
                currentPlan === p.id 
                ? 'bg-white/5 text-white/20 cursor-default' 
                : p.isPremium ? 'bg-cyan-500 text-black hover:bg-white' : 'border border-white/10 hover:bg-white/5'
              }`}
            >
              {currentPlan === p.id ? 'ATIVADO' : 'ASSINAR_AGORA'}
            </button>
          </div>
        ))}
      </div>

      {/* Payment Modal */}
      {selectedPlanId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => !isProcessing && setSelectedPlanId(null)} />
          
          <div className="relative bg-glass border border-cyan-500/30 max-w-lg w-full p-8 md:p-12 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500" />
            
            {paymentStep !== 'processing' && (
              <button 
                onClick={() => setSelectedPlanId(null)}
                className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            )}

            {paymentStep === 'info' && (
              <div className="animate-in fade-in duration-500">
                <div className="mb-8">
                  <span className="text-[10px] font-orbitron text-cyan-500 tracking-widest uppercase mb-1 block">TERMINAL_DE_PAGAMENTO</span>
                  <h3 className="text-3xl font-orbitron font-black text-white uppercase tracking-tighter">EFETUAR_UPGRADE</h3>
                </div>

                <div className="bg-white/5 p-4 border border-white/10 mb-8 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] font-orbitron text-white/40 uppercase block">Plano Selecionado</span>
                    <span className="text-lg font-orbitron font-bold text-cyan-400 uppercase">
                      {plans.find(p => p.internalId === selectedPlanId)?.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-orbitron text-white/40 uppercase block">Total</span>
                    <span className="text-lg font-orbitron font-bold text-white">
                      {plans.find(p => p.internalId === selectedPlanId)?.price}
                    </span>
                  </div>
                </div>

                <form onSubmit={handlePayment} className="space-y-6">
                  <div>
                    <label className="block text-[9px] font-orbitron text-white/30 uppercase tracking-widest mb-2">Número do Cartão</label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input 
                        type="text" required maxLength={19} placeholder="0000 0000 0000 0000"
                        className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-sm focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-orbitron text-white/30 uppercase tracking-widest mb-2">Validade</label>
                      <input 
                        type="text" required placeholder="MM/AA" maxLength={5}
                        className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-orbitron text-white/30 uppercase tracking-widest mb-2">CVV</label>
                      <input 
                        type="password" required placeholder="***" maxLength={3}
                        className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-[9px] text-white/30 font-mono italic">
                    <Lock className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <p>Sua transação está protegida pelo Protocolo Nexus de Criptografia Neural. Seus dados financeiros não são armazenados em texto claro na Matrix.</p>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-5 bg-cyan-500 text-black font-black font-orbitron text-sm tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                  >
                    CONFIRMAR_PAGAMENTO
                  </button>
                </form>
              </div>
            )}

            {paymentStep === 'processing' && (
              <div className="py-12 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
                <Loader2 className="w-16 h-16 text-cyan-500 animate-spin mb-8" />
                <h3 className="text-2xl font-orbitron font-black text-white mb-4 uppercase">AUTENTICANDO...</h3>
                <p className="text-white/40 font-mono text-[10px] tracking-[0.2em] max-w-xs uppercase">
                  Comunicando com a central de bio-crédito. <br />Não feche este terminal.
                </p>
                
                <div className="w-48 h-1 bg-white/5 mt-8 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 animate-[loading_3s_ease-in-out_infinite]" />
                </div>
              </div>
            )}

            {paymentStep === 'success' && (
              <div className="py-8 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30 mb-8 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-3xl font-orbitron font-black text-white mb-4 uppercase tracking-tighter">PATENTE_ELEVADA</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-10 max-w-xs font-light">
                  Sua autorização foi atualizada com sucesso. <br />
                  <span className="text-cyan-400 font-bold uppercase">{selectedPlanId} Level Access Granted.</span>
                </p>
                
                <button 
                  onClick={() => { setSelectedPlanId(null); setPaymentStep('info'); }}
                  className="w-full py-4 bg-white text-black font-black font-orbitron text-xs tracking-widest hover:bg-cyan-500 transition-all"
                >
                  INICIAR_NOVA_ROTINA
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};
