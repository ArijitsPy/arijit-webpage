import React from 'react';
import { ArrowUp, Atom, Github, Mail, FileText } from 'lucide-react';
import { PROFILE_DATA } from '../data/cvData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white font-bold text-base font-serif-heading">
              <div className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Atom className="w-4 h-4" />
              </div>
              <span>{PROFILE_DATA.name}</span>
            </div>
            <p className="text-slate-400 text-xs">
              PhD Student · Department of Physics · IIT Kharagpur
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <a href="#research" className="hover:text-amber-400 transition-colors">Research Pillars</a>
            <a href="#bec-lab" className="hover:text-amber-400 transition-colors">Quantum Lab</a>
            <a href="#cv" className="hover:text-amber-400 transition-colors">Curriculum Vitae</a>
            <a href="#findings" className="hover:text-amber-400 transition-colors">Research Findings</a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">Connect</a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer self-start md:self-auto"
            title="Return to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>
            &copy; {new Date().getFullYear()} {PROFILE_DATA.name}. Research hosted at Indian Institute of Technology Kharagpur.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={PROFILE_DATA.cvPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors flex items-center gap-1"
            >
              <FileText className="w-3 h-3" />
              <span>Official CV (PDF)</span>
            </a>
            <a
              href={PROFILE_DATA.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors flex items-center gap-1"
            >
              <Github className="w-3 h-3" />
              <span>GitHub</span>
            </a>
            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="hover:text-slate-300 transition-colors flex items-center gap-1"
            >
              <Mail className="w-3 h-3" />
              <span>Email</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
