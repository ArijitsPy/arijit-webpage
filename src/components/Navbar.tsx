import React, { useState } from 'react';
import { Moon, Sun, Menu, X, FileText, Send, Atom } from 'lucide-react';
import { PROFILE_DATA } from '../data/cvData';

interface NavbarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, onToggleTheme, onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-16">
        
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <a 
          href="#top" 
          className="flex items-center gap-2.5 text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-600/10 dark:bg-amber-400/10 border border-amber-600/20 dark:border-amber-400/20 flex items-center justify-center text-amber-700 dark:text-amber-400">
            <Atom className="w-5 h-5" />
          </div>
          <span>{PROFILE_DATA.name}</span>
        </a>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#research" className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Research Focus
          </a>
          <a href="#bec-lab" className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Interactive BEC Lab
          </a>
          <a href="#cv" className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Curriculum Vitae
          </a>
          <a href="#findings" className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Findings & Notes
          </a>
          <a href="#contact" className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action + Theme Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <a
            href={PROFILE_DATA.cvPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PDF CV</span>
          </a>

          <button
            type="button"
            onClick={onOpenContact}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-amber-600 rounded-lg hover:bg-slate-800 dark:hover:bg-amber-500 transition-colors whitespace-nowrap cursor-pointer shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-2">
          <a
            href="#research"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Research Focus
          </a>
          <a
            href="#bec-lab"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Interactive BEC Lab
          </a>
          <a
            href="#cv"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Curriculum Vitae
          </a>
          <a
            href="#findings"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Findings & Notes
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Contact
          </a>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <a
              href={PROFILE_DATA.cvPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200"
            >
              Download PDF CV
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
