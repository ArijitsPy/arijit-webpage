import React, { useState } from 'react';
import { Atom, Waves, Cpu, ChevronRight } from 'lucide-react';

interface ResearchPillar {
  id: string;
  title: string;
  subtitle: string;
  institutionNote: string;
  overview: string;
  equationTitle: string;
  equationDescription: string;
  renderEquation: () => React.ReactNode;
  bulletPoints: string[];
  keywords: string[];
  icon: React.ReactNode;
}

export const ResearchOverview: React.FC = () => {
  const [activePillarId, setActivePillarId] = useState<string>('bec');

  const pillars: ResearchPillar[] = [
    {
      id: 'bec',
      title: 'Stochastic Bose–Einstein Condensation',
      subtitle: 'Open Quantum Dynamics & Finite-Temperature SGPE',
      institutionNote: 'PhD Research · IIT Kharagpur (Supervisor: Prof. Sonjoy Majumder)',
      overview: 'Investigating how an open quantum gas condenses into a coherent macroscopic state when coupled to a thermal reservoir. By solving the projected Stochastic Gross–Pitaevskii Equation, we track phase coherence emergence, defect formation, and fluctuation dynamics.',
      equationTitle: 'Projected Stochastic Gross–Pitaevskii Formulation',
      equationDescription: 'Combines deterministic nonlinear Hamiltonian evolution with non-Hermitian thermal reservoir damping (γ) and Gaussian Langevin noise η(r, t).',
      renderEquation: () => (
        <div className="space-y-4">
          <div className="bg-slate-900 text-amber-300 p-4 sm:p-5 rounded-xl border border-amber-500/30 overflow-x-auto font-mono text-sm sm:text-base leading-relaxed tracking-wide shadow-inner">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-cyan-400 font-bold">iħ</span>
              <span className="text-white">·</span>
              <span className="inline-flex flex-col items-center justify-center text-xs sm:text-sm px-1">
                <span className="border-b border-amber-300/60 pb-0.5">∂ψ(r, t)</span>
                <span className="pt-0.5">∂t</span>
              </span>
              <span className="text-white font-bold">=</span>
              <span className="text-emerald-400">(1 − iγ)</span>
              <span className="text-slate-300">[</span>
              <span className="inline-flex flex-col items-center justify-center text-xs sm:text-sm px-1">
                <span className="border-b border-amber-300/60 pb-0.5">−ħ²</span>
                <span className="pt-0.5">2m</span>
              </span>
              <span className="text-amber-200">∇²</span>
              <span className="text-white">+</span>
              <span className="text-amber-200">V_ext(r)</span>
              <span className="text-white">+</span>
              <span className="text-amber-200">g|ψ|²</span>
              <span className="text-white">−</span>
              <span className="text-amber-200">μ</span>
              <span className="text-slate-300">]</span>
              <span className="text-cyan-400">ψ</span>
              <span className="text-white font-bold">+</span>
              <span className="text-rose-400 font-bold">η(r, t)</span>
            </div>
          </div>

          <div className="bg-slate-900/60 text-slate-300 p-3 sm:p-4 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
            <div className="text-amber-400 font-semibold text-[11px] uppercase tracking-wider">
              Fluctuation–Dissipation Correlation:
            </div>
            <div className="text-slate-200 overflow-x-auto py-1">
              ⟨η(r, t) · η*(r&apos;, t&apos;)⟩ = 2 γ k_B T ħ · δ(r − r&apos;) δ(t − t&apos;)
            </div>
            <div className="text-[11px] text-slate-400">
              Guarantees convergence to the correct grand-canonical thermal equilibrium at temperature T.
            </div>
          </div>
        </div>
      ),
      bulletPoints: [
        'Formulating projected classical field dynamics with delta-correlated Gaussian Langevin thermal noise.',
        'Tracking spontaneous nucleation of quantized vortex-antivortex pairs during finite-time temperature quenches.',
        'Analyzing phase coherence length and macroscopic off-diagonal long-range order (ODLRO).'
      ],
      keywords: ['Stochastic GPE', 'Langevin Noise', 'Vortex Dynamics', 'Finite-T BEC', 'IIT Kharagpur'],
      icon: <Atom className="w-6 h-6 text-amber-600 dark:text-amber-400" />
    },
    {
      id: 'smatrix',
      title: 'Analytical Properties of the S-Matrix',
      subtitle: 'Complex Scattering Poles, Resonances & Unitarity',
      institutionNote: 'M.Sc. Project · RKMVERI Belur Math (2023–2024)',
      overview: 'Analytical examination of the Scattering operator (S-Matrix) in quantum mechanics and quantum field theory, connecting analytic continuation in the complex momentum plane with observable bound states and scattering cross sections.',
      equationTitle: 'Partial-Wave Unitarity & Dispersion Relations',
      equationDescription: 'Analytic continuation of partial-wave amplitudes S_l(k) into the complex k-plane.',
      renderEquation: () => (
        <div className="space-y-4">
          <div className="bg-slate-900 text-amber-300 p-4 sm:p-5 rounded-xl border border-amber-500/30 overflow-x-auto font-mono text-sm sm:text-base leading-relaxed tracking-wide shadow-inner">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-cyan-400 font-bold">S_l(k)</span>
              <span className="text-white">=</span>
              <span className="text-emerald-400">e^(2i δ_l(k))</span>
              <span className="text-white">=</span>
              <span className="text-white">1 + 2ik ·</span>
              <span className="text-amber-200">f_l(k)</span>
              <span className="text-slate-400 mx-2">|</span>
              <span className="text-rose-400">S† S = I</span>
              <span className="text-white">⟹</span>
              <span className="text-cyan-300">Im f_l(k) = k |f_l(k)|²</span>
            </div>
          </div>

          <div className="bg-slate-900/60 text-slate-300 p-3 sm:p-4 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
            <div className="text-amber-400 font-semibold text-[11px] uppercase tracking-wider">
              Optical Theorem & Complex Poles:
            </div>
            <div className="text-slate-200 overflow-x-auto py-1">
              σ_total = (4π / k) · Im f(θ = 0), &nbsp; Bound States at k = +iκ (E = −ħ²κ² / 2m &lt; 0)
            </div>
            <div className="text-[11px] text-slate-400">
              Scattering singularities on the positive imaginary axis describe stable bound states; 4th quadrant poles denote Breit–Wigner resonances.
            </div>
          </div>
        </div>
      ),
      bulletPoints: [
        'Mapped physical bound states to simple poles on the positive imaginary momentum axis of the physical Riemann sheet.',
        'Characterized Breit–Wigner resonances as unphysical-sheet poles with decay width Γ = ħ / τ.',
        'Enforced strict causality conditions via Kramers–Kronig dispersion relations and forward scattering interference.'
      ],
      keywords: ['S-Matrix Theory', 'Complex Analyticity', 'Bound States', 'Resonance Poles', 'RKMVERI Thesis'],
      icon: <Waves className="w-6 h-6 text-amber-600 dark:text-amber-400" />
    },
    {
      id: 'computation',
      title: 'Computational Physics & Numerical Methods',
      subtitle: 'Split-Step Fourier, Stochastic RK & Scientific Solvers',
      institutionNote: 'Computational Work · Fortran, Python & Linux HPC',
      overview: 'Developing scalable numerical simulation algorithms for complex non-linear partial differential equations, stochastic Langevin field equations, and data processing.',
      equationTitle: 'Second-Order Symplectic Split-Step Fourier Method',
      equationDescription: 'Operator splitting algorithm separating kinetic dispersion in reciprocal space from nonlinear potential in real space.',
      renderEquation: () => (
        <div className="space-y-4">
          <div className="bg-slate-900 text-amber-300 p-4 sm:p-5 rounded-xl border border-amber-500/30 overflow-x-auto font-mono text-sm sm:text-base leading-relaxed tracking-wide shadow-inner">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-cyan-400 font-bold">ψ(t + Δt)</span>
              <span className="text-white">≈</span>
              <span className="text-emerald-400">exp(−i V̂ Δt / 2ħ)</span>
              <span className="text-amber-200">· exp(−i T̂ Δt / ħ)</span>
              <span className="text-emerald-400">· exp(−i V̂ Δt / 2ħ)</span>
              <span className="text-cyan-400">ψ(t)</span>
              <span className="text-white">+</span>
              <span className="text-rose-400">Δη_t</span>
            </div>
          </div>

          <div className="bg-slate-900/60 text-slate-300 p-3 sm:p-4 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
            <div className="text-amber-400 font-semibold text-[11px] uppercase tracking-wider">
              Reciprocal Momentum Transformation:
            </div>
            <div className="text-slate-200 overflow-x-auto py-1">
              T̂ ψ(r) = ℱ⁻¹ [ (ħ² k² / 2m) · ℱ[ψ(r)] ]
            </div>
            <div className="text-[11px] text-slate-400">
              Fast Fourier Transforms (FFT) enable kinetic energy propagation in O(N log N) operations per timestep.
            </div>
          </div>
        </div>
      ),
      bulletPoints: [
        'Implemented fast kinetic operator updates in reciprocal momentum space using FFT routines.',
        'Employed 4th-order stochastic Runge–Kutta algorithms for Langevin thermal noise integration.',
        'Authored high-precision numerical scripts in Fortran and Python (NumPy, SciPy, Matplotlib).'
      ],
      keywords: ['Fortran', 'Python', 'Split-Step Fourier', 'Stochastic RK4', 'Linux HPC'],
      icon: <Cpu className="w-6 h-6 text-amber-600 dark:text-amber-400" />
    }
  ];

  const activePillar = pillars.find(p => p.id === activePillarId) || pillars[0];

  return (
    <section id="research" className="py-16 md:py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-700 dark:text-amber-400 uppercase">
            <span>Research Focus</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Theoretical & Computational Physics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-serif-heading">
            Research Pillars & Theoretical Foundations
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            An overview of my doctoral research on Stochastic Bose–Einstein Condensation alongside my earlier theoretical investigations in S-Matrix scattering theory.
          </p>
        </div>

        {/* 3 Pillar Selection Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pillars.map((pillar, idx) => {
            const isSelected = pillar.id === activePillarId;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActivePillarId(pillar.id)}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'bg-amber-50/80 dark:bg-amber-950/20 border-amber-500/60 shadow-xs ring-1 ring-amber-500/30'
                    : 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-amber-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                    {pillar.icon}
                  </div>
                  <span className={`text-xs font-mono font-bold ${isSelected ? 'text-amber-700 dark:text-amber-400' : 'text-slate-400'}`}>
                    0{idx + 1}
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className={`text-base font-bold ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {pillar.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Detailed Card */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 lg:p-10 space-y-8 shadow-xs">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                {activePillar.institutionNote}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-serif-heading">
                {activePillar.title}
              </h3>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              {activePillar.keywords.map((kw, i) => (
                <span key={i} className="text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <p className="text-base text-slate-700 dark:text-slate-200 leading-relaxed max-w-4xl">
            {activePillar.overview}
          </p>

          {/* Mathematical Formulation Display (Crisp, High-Contrast & Beautifully Rendered) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
              <span className="uppercase tracking-wider font-bold text-slate-800 dark:text-slate-200">
                Core Formulation & Governing Mathematics
              </span>
              <span className="font-mono text-amber-700 dark:text-amber-400">
                {activePillar.equationTitle}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {activePillar.equationDescription}
            </p>

            {/* Rendered Equation Block */}
            {activePillar.renderEquation()}
          </div>

          {/* Key Methodologies & Outcomes */}
          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Methodological Focus & Theoretical Results
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activePillar.bulletPoints.map((point, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                    Point 0{idx + 1}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
