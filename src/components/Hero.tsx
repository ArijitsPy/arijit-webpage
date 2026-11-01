import React, { useState } from 'react';
import { Mail, Check, Copy, ExternalLink, ArrowRight, BookOpen, GraduationCap, Building2 } from 'lucide-react';
import { PROFILE_DATA } from '../data/cvData';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="top" className="relative pt-12 pb-16 md:pt-16 md:pb-20 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Background Subtle Gradient Field */}
      <div className="absolute inset-0 bg-radial-[at_top_right] from-amber-500/5 via-slate-500/0 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Typographic Presentation (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed scholarly metadata kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider text-amber-700 dark:text-amber-400 uppercase">
              <span>Department of Physics</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>IIT Kharagpur</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>Theoretical Physics</span>
            </div>

            {/* Display Headline with balanced wrap */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15] text-balance">
              Stochastic Bose–Einstein Condensation & Quantum Dynamics
            </h1>

            {/* Scholarly Narrative */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl">
              I am a PhD Student in the Department of Physics at <strong className="text-slate-900 dark:text-white font-semibold">IIT Kharagpur</strong> under the supervision of <strong className="text-slate-900 dark:text-white font-semibold">Prof. Sonjoy Majumder</strong>. My research investigates macroscopic phase coherence, reservoir coupling, and microscopic fluctuation dynamics in ultracold atomic systems using the <span className="italic">Stochastic Gross–Pitaevskii Equation (SGPE)</span>.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#bec-lab"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 rounded-lg transition-colors shadow-xs"
              >
                <span>Launch Interactive BEC Lab</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#cv"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors shadow-xs"
              >
                <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>View Full CV</span>
              </a>

              <button
                type="button"
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <span>Send a Message</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>

            {/* Quick Contact & Verified Profile Strip */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer group"
                title="Click to copy email address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />}
                <span className="font-mono text-slate-700 dark:text-slate-300">{PROFILE_DATA.email}</span>
                {copied && <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-medium">Copied!</span>}
              </button>

              <a
                href={PROFILE_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
              >
                <span>GitHub:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 font-medium">{PROFILE_DATA.githubUsername}</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <span className="text-slate-500 dark:text-slate-400">
                Supervisor: <strong className="text-slate-700 dark:text-slate-300 font-semibold">{PROFILE_DATA.supervisor}</strong>
              </span>
            </div>
          </div>

          {/* Right Column: Academic Profile Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-6">
              
              {/* Scholar Header with Photo */}
              <div className="flex items-start gap-4">
                <div className="relative w-18 h-18 rounded-2xl overflow-hidden shadow-md border-2 border-amber-500/30 dark:border-amber-400/30 shrink-0 bg-slate-100 dark:bg-slate-800">
                  <img
                    src={PROFILE_DATA.photoUrl}
                    alt={PROFILE_DATA.name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback if image fails
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {PROFILE_DATA.name}
                  </h2>
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                    PhD Student in Physics
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 shrink-0" />
                    <span>IIT Kharagpur, West Bengal, India</span>
                  </p>
                </div>
              </div>

              {/* Research Focus Summary */}
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px]">
                  Research Focus
                </div>
                <p className="leading-relaxed">
                  Coupling between condensed Bose modes and thermal reservoirs. Solving the projected Stochastic Gross–Pitaevskii Equation with complex dissipation and thermal noise to model finite-temperature Bose–Einstein condensation.
                </p>
              </div>

              {/* Quick Academic Affiliations */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span>Current Affiliation</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">IIT Kharagpur (Physics)</span>
                </div>
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span>Supervisor</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{PROFILE_DATA.supervisor}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span>M.Sc. Institution</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">RKMVERI, Belur Math</span>
                </div>
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span>B.Sc. Institution</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Barasat Govt. College</span>
                </div>
              </div>

              {/* Call to action within card */}
              <div className="pt-2">
                <a
                  href="#cv"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>View Qualifications & CV in CV Section</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
