
export interface SkillMatch {
  skill: string;
  found: boolean;
}

export interface AnalysisResult {
  matchScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  skillsAnalysis: SkillMatch[];
  hrQuestions: {
    question: string;
    rationale: string;
    expectedAnswer: string;
  }[];
}

export interface AppState {
  resumeText: string;
  jobDescription: string;
  isAnalyzing: boolean;
  result: AnalysisResult | null;
  error: string | null;
}
