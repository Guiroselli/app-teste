
import React, { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AICoachPreview } from './components/AICoachPreview';
import { WaitlistForm } from './components/WaitlistForm';
import { WorkoutTab } from './components/WorkoutTab';
import { AvatarTab } from './components/AvatarTab';
import { DietTab } from './components/DietTab';
import { SubscriptionTab } from './components/SubscriptionTab';
import { MissionsTab } from './components/MissionsTab';
import { AccessDenied } from './components/AccessDenied';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [userPlan, setUserPlan] = useState<'free' | 'pro' | 'master'>('free');
  
  // Global Bio & RPG State
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);

  // Logic for Leveling Up
  useEffect(() => {
    const xpToNextLevel = level * 1000;
    if (xp >= xpToNextLevel) {
      setXp(prev => prev - xpToNextLevel);
      setLevel(prev => prev + 1);
    }
  }, [xp, level]);

  const addXp = (amount: number) => {
    setXp(prev => prev + amount);
  };

  const renderContent = () => {
    // Access Control Logic
    const isPro = userPlan === 'pro' || userPlan === 'master';
    const isMaster = userPlan === 'master';

    switch (activeTab) {
      case 'home':
        return <Hero onNavigate={() => setActiveTab('acesso')} />;
      case 'missoes':
        return <MissionsTab xp={xp} level={level} addXp={addXp} plan={userPlan} />;
      case 'treino':
        // Treino is basic for everyone but we could limit specific routines
        return <WorkoutTab addXp={addXp} plan={userPlan} />;
      case 'avatar':
        return <AvatarTab weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} plan={userPlan} />;
      case 'dieta':
        if (!isPro) return <AccessDenied requiredPlan="NEXUS ELITE" onUpgrade={() => setActiveTab('planos')} />;
        return <DietTab weight={weight} height={height} />;
      case 'planos':
        return <SubscriptionTab currentPlan={userPlan} onPlanChange={setUserPlan} />;
      case 'coach':
        if (!isPro) return <AccessDenied requiredPlan="NEXUS ELITE" onUpgrade={() => setActiveTab('planos')} />;
        return <AICoachPreview />;
      case 'acesso':
        return <WaitlistForm />;
      default:
        return <Hero onNavigate={() => setActiveTab('home')} />;
    }
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black flex flex-col">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} level={level} xp={xp} plan={userPlan} />
        
        <main className="flex-grow pt-16">
          <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {renderContent()}
          </div>
        </main>
        
        <footer className="py-8 border-t border-white/5 text-center text-white/20 text-[10px] tracking-[0.4em] uppercase font-orbitron">
          NEXUS PROTOCOL // SECURE_LINE_STABLE // PLAN: {userPlan.toUpperCase()}
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
