
import React, { useState, useCallback } from 'react';
import { analyzeResume } from './services/geminiService';
import { AnalysisResult } from './types';
import Watermark from './components/Watermark';
import { 
  FileText, 
  Search, 
  CheckCircle, 
  AlertCircle, 
  BarChart, 
  HelpCircle,
  Briefcase,
  User,
  Zap,
  ArrowRight,
  RefreshCw,
  Clock
} from 'lucide-react';

const App: React.FC = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError("Please provide both a resume and a job description.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    try {
      const data = await analyzeResume(resumeText, jobDescription);
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to analyze. Please check your inputs and try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setResumeText('');
    setJobDescription('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 relative pb-20">
      <Watermark />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                Resume<span className="text-indigo-600">Intellect</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">
                By kethanstudios
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!result ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-5 h-5 text-indigo-500" />
                  <h2 className="text-lg font-semibold text-slate-800">Job Description</h2>
                </div>
                <textarea
                  className="w-full h-64 p-4 text-sm text-slate-900 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none bg-slate-50 focus:bg-white"
                  placeholder="Paste the target job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-indigo-500" />
                  <h2 className="text-lg font-semibold text-slate-800">Resume / Profile</h2>
                </div>
                <textarea
                  className="w-full h-64 p-4 text-sm text-slate-900 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none bg-slate-50 focus:bg-white"
                  placeholder="Paste candidate's resume or LinkedIn text here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-3
                  ${isAnalyzing 
                    ? 'bg-slate-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'}`}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Generate Deep Analysis
                  </>
                )}
              </button>
            </div>

            {/* Feature Highlights */}
            <div className="flex flex-col justify-center space-y-12 lg:pl-8">
              <div className="space-y-2">
                <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                  Hire Faster with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">AI Intelligence.</span>
                </h1>
                <p className="text-lg text-slate-500">
                  Instantly compare candidate potential against specific job requirements using advanced Gemini 3 Pro reasoning.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FeatureCard 
                  icon={<BarChart className="text-blue-500" />}
                  title="Match Scoring"
                  desc="Get a precise data-driven fit percentage for every applicant."
                />
                <FeatureCard 
                  icon={<FileText className="text-emerald-500" />}
                  title="Skill Mapping"
                  desc="Identify exactly which skills are present and which are missing."
                />
                <FeatureCard 
                  icon={<HelpCircle className="text-amber-500" />}
                  title="Smart Interviewing"
                  desc="Receive tailored HR questions designed to verify claimed skills."
                />
                <FeatureCard 
                  icon={<Clock className="text-rose-500" />}
                  title="Rapid Screening"
                  desc="Cut manual review time by 90% with automated summaries."
                />
              </div>
            </div>
          </div>
        ) : (
          /* Result Section */
          <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Score Card */}
              <div className="w-full md:w-1/3 space-y-6">
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 text-center flex flex-col items-center">
                  <h3 className="text-slate-500 font-semibold mb-6 uppercase tracking-wider text-xs">Match Score</h3>
                  <div className="relative flex items-center justify-center">
                    <svg className="w-48 h-48 transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        className="text-slate-100"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={552.92}
                        strokeDashoffset={552.92 * (1 - result.matchScore / 100)}
                        className={`${result.matchScore > 75 ? 'text-emerald-500' : result.matchScore > 50 ? 'text-amber-500' : 'text-rose-500'} transition-all duration-1000 ease-out`}
                      />
                    </svg>
                    <span className="absolute text-5xl font-black text-slate-800">
                      {Math.round(result.matchScore)}%
                    </span>
                  </div>
                  <p className="mt-6 text-slate-600 italic">
                    {result.matchScore > 80 ? "Excellent Match" : result.matchScore > 60 ? "Potential Fit" : "Low Alignment"}
                  </p>
                </div>

                <div className="bg-indigo-600 p-6 rounded-3xl shadow-xl text-white">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Executive Summary
                  </h3>
                  <p className="text-sm leading-relaxed opacity-90">
                    {result.summary}
                  </p>
                </div>
                
                <button
                  onClick={handleReset}
                  className="w-full py-4 px-6 rounded-xl font-bold bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Analyze Another Candidate
                </button>
              </div>

              {/* Details & Questions */}
              <div className="w-full md:w-2/3 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-emerald-600 mb-4 flex items-center gap-2 uppercase tracking-wide text-sm">
                      <CheckCircle className="w-4 h-4" /> Key Strengths
                    </h4>
                    <ul className="space-y-3">
                      {result.strengths.map((s, i) => (
                        <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-rose-500 mb-4 flex items-center gap-2 uppercase tracking-wide text-sm">
                      <AlertCircle className="w-4 h-4" /> Gaps & Concerns
                    </h4>
                    <ul className="space-y-3">
                      {result.weaknesses.map((w, i) => (
                        <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Skill Matrix */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2 uppercase tracking-wide text-sm">
                    <BarChart className="w-4 h-4 text-indigo-500" /> Skill Matching Matrix
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.skillsAnalysis.map((sk, i) => (
                      <span 
                        key={i} 
                        className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 border ${
                          sk.found 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                            : 'bg-slate-50 text-slate-400 border-slate-100'
                        }`}
                      >
                        {sk.found ? <CheckCircle className="w-3 h-3" /> : <div className="w-1 h-1 rounded-full bg-slate-300" />}
                        {sk.skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interview Questions */}
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide text-sm">
                    <HelpCircle className="w-4 h-4 text-indigo-500" /> Recommended HR Interview Questions
                  </h4>
                  {result.hrQuestions.map((q, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-colors group">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold flex-shrink-0">
                          {i + 1}
                        </div>
                        <div className="space-y-3">
                          <p className="font-semibold text-slate-900 leading-snug">
                            {q.question}
                          </p>
                          <div className="space-y-2">
                            <p className="text-xs text-slate-400 uppercase font-bold">Why ask this?</p>
                            <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100 italic">
                              {q.rationale}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-xs text-emerald-600 uppercase font-bold">Ideal Response</p>
                            <p className="text-sm text-slate-600">
                              {q.expectedAnswer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="absolute bottom-8 w-full text-center">
        <p className="text-sm text-slate-400">
          Powered by Gemini 3 Pro &bull; Developed by <span className="font-bold text-slate-600">kethanstudios</span>
        </p>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-white/50 p-6 rounded-2xl border border-slate-200 backdrop-blur-sm group hover:bg-white hover:shadow-md transition-all">
    <div className="bg-white w-12 h-12 rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="font-bold text-slate-800 mb-1">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

export default App;
