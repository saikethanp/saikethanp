
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

export const analyzeResume = async (resume: string, jobDescription: string): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Analyze the following candidate resume against the provided job description.
    
    JOB DESCRIPTION:
    ${jobDescription}
    
    CANDIDATE RESUME:
    ${resume}
    
    Provide a detailed professional analysis and HR interview questions.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      systemInstruction: "You are a world-class HR Executive and Technical Recruiter with 20 years of experience. Your goal is to critically analyze resumes against job descriptions to find the best fit. Be honest, objective, and provide high-quality interview questions that probe for specific technical competence and culture fit based on the resume details.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          matchScore: {
            type: Type.NUMBER,
            description: "A score from 0 to 100 indicating the fit."
          },
          summary: {
            type: Type.STRING,
            description: "A professional executive summary of the match."
          },
          strengths: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of candidate's key strengths relative to the JD."
          },
          weaknesses: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of areas where the candidate falls short or needs improvement."
          },
          skillsAnalysis: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                skill: { type: Type.STRING },
                found: { type: Type.BOOLEAN }
              },
              required: ["skill", "found"]
            }
          },
          hrQuestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                rationale: { type: Type.STRING },
                expectedAnswer: { type: Type.STRING }
              },
              required: ["question", "rationale", "expectedAnswer"]
            }
          }
        },
        required: ["matchScore", "summary", "strengths", "weaknesses", "skillsAnalysis", "hrQuestions"]
      }
    }
  });

  const resultText = response.text;
  if (!resultText) throw new Error("No response from AI");
  
  return JSON.parse(resultText) as AnalysisResult;
};
