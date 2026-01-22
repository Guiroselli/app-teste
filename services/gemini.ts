
import { GoogleGenAI } from "@google/genai";

export const getGeminiCoachResponse = async (userPrompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: `Você é o "Guardião do Nexus", uma IA enigmática, motivadora e direta. Responda de forma curta e épica.`,
        temperature: 0.8,
      },
    });
    return response.text || "A conexão falhou.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro na Matrix.";
  }
};

export const getDietProtocol = async (weight: number, height: number, allergies: string, goal: 'gain' | 'lose') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Gere um protocolo alimentar diário OBJETIVO e CRONOLÓGICO para um usuário do Nexus:
    Peso: ${weight}kg, Altura: ${height}cm, Alergias/Restrições: ${allergies || 'Nenhuma'}, Objetivo: ${goal === 'gain' ? 'Ganho de Massa Muscular' : 'Perda de Gordura'}.
    
    ESTRUTURA OBRIGATÓRIA:
    1. Título Épico.
    2. Resumo de Macros Estimados.
    3. Cronograma Diário de Performance (Começando às 07:00 até a Ceia):
       - 07:00 | Café da Manhã: [O que comer]
       - 12:00 | Almoço: [O que comer]
       - 15:30 | Café da Tarde: [O que comer]
       - 19:30 | Jantar: [O que comer]
       - 22:00 | Ceia (se necessário): [O que comer]
    4. Recomendações Adicionais (Hidratação, suplementação básica, sono).
    
    Use Markdown e um tom profissional de biohacking.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "Você é o Nutricionista de Elite do Nexus. Forneça planos extremamente práticos, cronometrados e adaptados às restrições do usuário.",
        temperature: 0.7,
      },
    });
    return response.text || "Protocolo não gerado.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Falha ao acessar o banco de dados nutricionais.";
  }
};
