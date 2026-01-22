
import React, { useState } from 'react';
import { Dumbbell, Home, Zap, Trophy, ChevronLeft, Clock, Activity, Calendar, Shield, Coffee, Footprints, Lock } from 'lucide-react';
import { Workout } from '../types';

interface WorkoutTabProps {
  addXp: (amount: number) => void;
  plan: string;
}

const WEEK_DAYS = [
  { id: 'seg', label: 'Segunda', target: 'Peito & Tríceps', focus: 'Push', isRest: false },
  { id: 'ter', label: 'Terça', target: 'Costas & Bíceps', focus: 'Pull', isRest: false },
  { id: 'qua', label: 'Quarta', target: 'Pernas & Glúteos', focus: 'Legs', isRest: false },
  { id: 'qui', label: 'Quinta', target: 'Ombros & Trapézio', focus: 'Shoulders', isRest: false },
  { id: 'sex', label: 'Sexta', target: 'Full Body Híbrido', focus: 'Conditioning', isRest: false },
  { id: 'sab', label: 'Sábado', target: 'Recuperação Ativa', focus: 'Opcional', isRest: true, restType: 'cardio' },
  { id: 'dom', label: 'Domingo', target: 'Descanso Total', focus: 'Rest', isRest: true, restType: 'full' },
];

const WORKOUT_DATABASE: Record<string, { home: Workout; gym: Workout }> = {
  'Peito & Tríceps': {
    home: { id: 'h1', title: 'Calistenia: Peito & Tríceps', type: 'home', difficulty: 'Intermediário', duration: '35m', exercises: [
      { name: 'Push-ups Diamante', sets: '4', reps: '12' },
      { name: 'Dips em Cadeira/Banco', sets: '3', reps: '15' },
      { name: 'Push-ups Inclinadas', sets: '3', reps: '15' },
      { name: 'Pseudo Planche Push-ups', sets: '3', reps: '8' }
    ]},
    gym: { id: 'g1', title: 'Academia: Peito & Tríceps', type: 'gym', difficulty: 'Intermediário', duration: '50m', exercises: [
      { name: 'Supino Reto (Barra)', sets: '4', reps: '8-10' },
      { name: 'Supino Inclinado (Halteres)', sets: '3', reps: '12' },
      { name: 'Tríceps Corda', sets: '3', reps: '15' },
      { name: 'Tríceps Testa', sets: '3', reps: '12' }
    ]}
  },
  'Costas & Bíceps': {
    home: { id: 'h2', title: 'Calistenia: Costas & Bíceps', type: 'home', difficulty: 'Intermediário', duration: '40m', exercises: [
      { name: 'Pull-ups Pronadas', sets: '4', reps: '8' },
      { name: 'Chin-ups Supinadas', sets: '4', reps: '8' },
      { name: 'Australian Pull-ups', sets: '3', reps: '12' },
      { name: 'Remada Invertida', sets: '3', reps: '15' }
    ]},
    gym: { id: 'g2', title: 'Academia: Costas & Bíceps', type: 'gym', difficulty: 'Intermediário', duration: '55m', exercises: [
      { name: 'Puxada Aberta (Pulley)', sets: '4', reps: '10' },
      { name: 'Remada Curvada (Barra)', sets: '4', reps: '8' },
      { name: 'Rosca Direta (W)', sets: '3', reps: '12' },
      { name: 'Rosca Martelo', sets: '3', reps: '12' }
    ]}
  },
  'Pernas & Glúteos': {
    home: { id: 'h3', title: 'Calistenia: Inferiores', type: 'home', difficulty: 'Intermediário', duration: '30m', exercises: [
      { name: 'Bulgarian Split Squats', sets: '4', reps: '12/lado' },
      { name: 'Agachamento com Salto', sets: '3', reps: '20' },
      { name: 'Glute Bridges', sets: '4', reps: '25' },
      { name: 'Pistol Squat (Assistido)', sets: '3', reps: '6/lado' }
    ]},
    gym: { id: 'g3', title: 'Academia: Inferiores', type: 'gym', difficulty: 'Avançado', duration: '60m', exercises: [
      { name: 'Agachamento Livre', sets: '4', reps: '10' },
      { name: 'Leg Press 45', sets: '3', reps: '12' },
      { name: 'Cadeira Extensora', sets: '3', reps: '15' },
      { name: 'Mesa Flexora', sets: '3', reps: '15' }
    ]}
  },
  'Ombros & Trapézio': {
    home: { id: 'h4', title: 'Calistenia: Ombros', type: 'home', difficulty: 'Intermediário', duration: '30m', exercises: [
      { name: 'Pike Push-ups', sets: '4', reps: '10' },
      { name: 'Hindu Push-ups', sets: '3', reps: '12' },
      { name: 'Wall Handstand Hold', sets: '3', reps: '30s' },
      { name: 'Prancha com Toque no Ombro', sets: '3', reps: '20' }
    ]},
    gym: { id: 'g4', title: 'Academia: Ombros', type: 'gym', difficulty: 'Intermediário', duration: '45m', exercises: [
      { name: 'Desenvolvimento Militar', sets: '4', reps: '10' },
      { name: 'Elevação Lateral', sets: '4', reps: '15' },
      { name: 'Face Pulls', sets: '3', reps: '15' },
      { name: 'Encolhimento (Halteres)', sets: '4', reps: '12' }
    ]}
  },
  'Full Body Híbrido': {
    home: { id: 'h5', title: 'Calistenia: HIIT Full Body', type: 'home', difficulty: 'Intermediário', duration: '25m', exercises: [
      { name: 'Burpees', sets: '4', reps: '15' },
      { name: 'Mountain Climbers', sets: '4', reps: '30s' },
      { name: 'Agachamentos Rápidos', sets: '4', reps: '30' },
      { name: 'Push-ups Padrão', sets: '4', reps: '20' }
    ]},
    gym: { id: 'g5', title: 'Academia: Circuito de Força', type: 'gym', difficulty: 'Avançado', duration: '40m', exercises: [
      { name: 'Thrusters', sets: '4', reps: '12' },
      { name: 'Remada Unilateral', sets: '3', reps: '12/lado' },
      { name: 'Walking Lunges', sets: '3', reps: '20 passos' },
      { name: 'Kettlebell Swings', sets: '4', reps: '20' }
    ]}
  },
  'Recuperação Ativa': {
    home: { id: 'h6', title: 'Cardio Opcional: Casa', type: 'home', difficulty: 'Iniciante', duration: '20m', exercises: [
       { name: 'Mobilidade Articular', sets: '1', reps: '10m' },
       { name: 'Pular Corda (Opcional)', sets: '3', reps: '2m' }
    ]},
    gym: { id: 'g6', title: 'Cardio Opcional: Esteira', type: 'gym', difficulty: 'Iniciante', duration: '30m', exercises: [
       { name: 'Caminhada Inclinada', sets: '1', reps: '20m' },
       { name: 'Elíptico Leve', sets: '1', reps: '10m' }
    ]}
  }
};

export const WorkoutTab: React.FC<WorkoutTabProps> = ({ addXp, plan }) => {
  const [selectedDay, setSelectedDay] = useState<typeof WEEK_DAYS[0] | null>(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState<'home' | 'gym' | null>(null);
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);
  const isFree = plan === 'free';

  const handleDayClick = (day: typeof WEEK_DAYS[0]) => {
    setSelectedDay(day);
    if (day.restType === 'full') {
      setActiveWorkout({ 
        id: 'rest', 
        title: 'Descanso Total', 
        type: 'home', 
        difficulty: 'Iniciante', 
        duration: '24h', 
        exercises: [{ name: 'Recuperação Mental e Física', sets: '-', reps: '-' }] 
      } as any);
    }
  };

  const selectEnvironment = (env: 'home' | 'gym') => {
    if (!selectedDay) return;
    const workout = WORKOUT_DATABASE[selectedDay.target]?.[env];
    if (workout) {
      setActiveWorkout(workout);
      setSelectedEnvironment(env);
    }
  };

  const finishWorkout = () => {
    addXp(500);
    setActiveWorkout(null);
    setSelectedDay(null);
    setSelectedEnvironment(null);
  };

  if (activeWorkout) {
    return (
      <div className="py-20 px-6 max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-500">
        <button 
          onClick={() => { setActiveWorkout(null); setSelectedEnvironment(null); }}
          className="flex items-center space-x-2 text-cyan-500 font-orbitron text-xs mb-8 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>ESCOLHER OUTRO AMBIENTE</span>
        </button>

        <div className="bg-glass border border-cyan-500/30 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            {activeWorkout.id === 'rest' ? <Coffee className="w-24 h-24 text-cyan-500" /> : 
             activeWorkout.type === 'home' ? <Home className="w-24 h-24 text-cyan-500" /> : 
             <Dumbbell className="w-24 h-24 text-cyan-500" />}
          </div>

          <div className="mb-10">
            <span className="text-[10px] font-orbitron text-cyan-500 tracking-[0.4em] uppercase mb-2 block">PROTOCOLO_ATIVO</span>
            <h2 className="text-4xl md:text-5xl font-orbitron font-black text-white uppercase">{activeWorkout.title}</h2>
            <div className="flex space-x-6 mt-4">
              <div className="flex items-center space-x-2 text-white/40 text-xs">
                <Clock className="w-4 h-4" />
                <span>{activeWorkout.duration}</span>
              </div>
              <div className="flex items-center space-x-2 text-white/40 text-xs">
                <Activity className="w-4 h-4" />
                <span>{activeWorkout.difficulty}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {activeWorkout.exercises.map((ex, i) => (
              <div key={i} className="bg-white/5 p-6 border border-white/5 flex flex-col md:flex-row md:items-center justify-between group hover:border-cyan-500/20 transition-all">
                <div className="flex items-center space-x-4">
                  <span className="text-cyan-500/50 font-orbitron font-bold text-sm">{(i + 1).toString().padStart(2, '0')}</span>
                  <h4 className="font-orbitron font-bold text-lg text-white group-hover:text-cyan-400 transition-colors uppercase">{ex.name}</h4>
                </div>
                <div className="flex space-x-8 mt-4 md:mt-0">
                  <div className="text-center">
                    <span className="block text-[8px] font-orbitron text-white/30 uppercase tracking-widest">SÉRIES</span>
                    <span className="text-xl font-orbitron font-bold text-white">{ex.sets}</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-[8px] font-orbitron text-white/30 uppercase tracking-widest">REPS</span>
                    <span className="text-xl font-orbitron font-bold text-white">{ex.reps}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={finishWorkout}
            className="w-full mt-10 py-5 bg-cyan-500 text-black font-black font-orbitron text-sm tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            {activeWorkout.id === 'rest' ? 'CONFIRMAR DESCANSO (+500 XP)' : 'CONCLUIR PROTOCOLO (+500 XP)'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 px-6 max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-12">
        <h2 className="text-4xl md:text-6xl font-orbitron font-black uppercase tracking-tighter">CRONOGRAMA SEMANAL</h2>
        <div className="h-1 w-24 bg-cyan-500 mt-2"></div>
      </div>

      {!selectedDay ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WEEK_DAYS.map((day, idx) => {
            const isLockedDay = isFree && idx >= 4 && !day.isRest;

            return (
              <div 
                key={day.id} 
                onClick={() => !isLockedDay && handleDayClick(day)}
                className={`bg-glass p-8 border transition-all group relative overflow-hidden flex flex-col min-h-[220px] ${
                  isLockedDay ? 'opacity-30 cursor-not-allowed border-white/5' : 'hover:border-cyan-500/30 cursor-pointer border-white/5'
                } ${day.isRest ? 'bg-white/5' : ''}`}
              >
                {isLockedDay && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-cyan-500 animate-pulse" />
                  </div>
                )}
                
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                  {day.isRest ? <Coffee className="w-16 h-16 text-cyan-500" /> : <Calendar className="w-16 h-16 text-cyan-500" />}
                </div>
                
                <div className="flex justify-between items-center mb-8">
                  <span className="text-[10px] font-orbitron text-white/30 tracking-widest uppercase">{day.label}</span>
                  <span className={`text-[10px] font-orbitron bg-cyan-500/10 px-2 py-0.5 ${day.isRest ? 'text-white/40' : 'text-cyan-500'}`}>{day.focus}</span>
                </div>
                
                <h4 className={`font-orbitron font-black text-xl mb-2 leading-tight uppercase group-hover:text-cyan-400 transition-colors ${day.isRest ? 'text-white/60' : 'text-white'}`}>
                  {day.target}
                </h4>
                
                <div className="mt-auto pt-4 flex items-center text-[9px] font-orbitron text-white/20 tracking-widest group-hover:text-cyan-500 transition-colors">
                  {day.restType === 'full' ? (
                    <><Zap className="w-3 h-3 mr-2 text-white/10" /> DESCANSO OBRIGATÓRIO</>
                  ) : (
                    <><Shield className="w-3 h-3 mr-2" /> ACESSAR PROTOCOLO</>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500 text-center">
          <button 
            onClick={() => setSelectedDay(null)}
            className="flex items-center space-x-2 text-white/30 font-orbitron text-xs mb-12 hover:text-white mx-auto"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>MUDAR DIA</span>
          </button>
          
          <h3 className="text-3xl font-orbitron font-black mb-2 uppercase text-cyan-400">{selectedDay.label}</h3>
          <p className="text-white/40 font-orbitron text-sm tracking-widest mb-12 uppercase">{selectedDay.target}</p>
          
          {selectedDay.restType === 'full' ? (
            <div className="bg-glass p-12 border border-white/5 flex flex-col items-center">
               <Coffee className="w-16 h-16 text-cyan-500/30 mb-6" />
               <p className="text-white font-orbitron text-lg mb-4">DIA DE REGENERAÇÃO</p>
               <p className="text-white/40 text-xs font-mono max-w-md mx-auto">Sua musculatura precisa de tempo para reconstrução. O Nexus recomenda descanso total para maximizar ganhos de segunda a sexta.</p>
               <button 
                 onClick={finishWorkout}
                 className="mt-8 px-10 py-4 bg-white/5 border border-white/10 text-white font-orbitron text-[10px] tracking-widest hover:bg-cyan-500 hover:text-black transition-all"
               >
                 SINCRONIZAR DESCANSO (+500 XP)
               </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <button 
                onClick={() => selectEnvironment('home')}
                className="bg-glass p-10 border border-white/5 hover:border-cyan-500 hover:scale-105 transition-all group flex flex-col items-center"
              >
                <Home className="w-12 h-12 text-white/20 group-hover:text-cyan-500 transition-colors mb-4" />
                <span className="font-orbitron font-black text-lg tracking-widest">TREINAR EM CASA</span>
                <span className="text-[9px] text-white/20 font-mono mt-2 uppercase">Calistenia & Mobilidade</span>
              </button>
              
              <button 
                disabled={isFree}
                onClick={() => selectEnvironment('gym')}
                className={`bg-glass p-10 border transition-all group flex flex-col items-center relative ${
                  isFree ? 'opacity-30 grayscale cursor-not-allowed border-white/5' : 'border-white/5 hover:border-cyan-500 hover:scale-105'
                }`}
              >
                {isFree && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <div className="bg-black/80 px-2 py-1 border border-cyan-500/30 flex items-center space-x-2">
                       <Lock className="w-3 h-3 text-cyan-500" />
                       <span className="text-[8px] font-orbitron text-cyan-500">PRO_ACCESS</span>
                    </div>
                  </div>
                )}
                <Dumbbell className="w-12 h-12 text-white/20 group-hover:text-cyan-500 transition-colors mb-4" />
                <span className="font-orbitron font-black text-lg tracking-widest">NA ACADEMIA</span>
                <span className="text-[9px] text-white/20 font-mono mt-2 uppercase">Cargas & Hipertrofia</span>
              </button>
              
              {selectedDay.isRest && (
                <div className="sm:col-span-2 mt-8 p-6 bg-cyan-500/5 border border-cyan-500/20 text-center">
                  <div className="flex items-center justify-center space-x-2 text-cyan-500 mb-2">
                    <Footprints className="w-4 h-4" />
                    <span className="text-[10px] font-orbitron tracking-widest">OPCIONAL: CARDIO</span>
                  </div>
                  <p className="text-[10px] text-white/40 font-mono">Para este dia de {selectedDay.label}, você pode optar por manter a mobilidade ou descanso total.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
