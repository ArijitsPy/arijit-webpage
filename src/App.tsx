import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ResearchOverview } from './components/ResearchOverview';
import { InteractiveBECLab } from './components/InteractiveBECLab';
import { CVSection } from './components/CVSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('arijit_portfolio_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [contactOpen, setContactOpen] = useState<boolean>(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('arijit_portfolio_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('arijit_portfolio_theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      <Navbar
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
        onOpenContact={() => setContactOpen(true)}
      />

      <main className="flex-1">
        <Hero onOpenContact={() => setContactOpen(true)} />
        <ResearchOverview />
        <InteractiveBECLab />
        <CVSection />
        <BlogSection />
        <ContactSection />
      </main>

      <Footer />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}
