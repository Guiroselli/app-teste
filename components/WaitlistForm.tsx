
import React, { useState } from 'react';

export const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Simulate API call
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className="py-24 px-6 bg-gradient-to-t from-cyan-900/20 to-black relative">
      <div className="max-w-2xl mx-auto text-center">
        {!submitted ? (
          <>
            <h2 className="text-4xl md:text-6xl font-orbitron font-black mb-8">ACESSO ANTECIPADO</h2>
            <p className="text-white/60 mb-12 text-lg">
              Junte-se aos primeiros 1.000 fundadores. <br />
              Ganhe recompensas exclusivas e itens cosméticos únicos no lançamento.
            </p>
            
            <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                className="w-full bg-white/5 border border-white/20 p-6 rounded-sm text-center focus:outline-none focus:border-cyan-500 transition-all font-orbitron"
              />
              <button 
                type="submit"
                className="mt-4 w-full bg-white text-black font-black py-5 rounded-sm hover:bg-cyan-500 transition-all font-orbitron tracking-widest"
              >
                DESBLOQUEAR CONVITE
              </button>
            </form>
          </>
        ) : (
          <div className="bg-glass p-12 animate-in zoom-in-95 duration-500">
            <h2 className="text-4xl font-orbitron text-cyan-500 mb-4">CONVITE ACEITO</h2>
            <p className="text-white/70 mb-6">Você agora faz parte da elite do Nexus. Verifique seu terminal (e-mail) em breve.</p>
            <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 text-xs font-mono">
              USER_ID: NX-88219-B
            </div>
          </div>
        )}
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
    </section>
  );
};
