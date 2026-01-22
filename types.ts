
import React from 'react';

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export interface UserProfile {
  weight: number;
  height: number;
  allergies: string;
  goal: 'gain' | 'lose';
  xp: number;
  level: number;
}

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  notes?: string;
}

export interface Workout {
  id: string;
  title: string;
  type: 'gym' | 'home';
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  duration: string;
  exercises: Exercise[];
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  category: 'Físico' | 'Mental' | 'Nutrição' | 'Hábito';
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  features: string[];
  isPremium?: boolean;
}
