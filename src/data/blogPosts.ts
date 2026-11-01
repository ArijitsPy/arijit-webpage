export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  publishedDate: string;
  readTime: string;
  category: 'Quantum Dynamics' | 'Scattering Theory' | 'Statistical Physics' | 'Scientific Computing' | 'Laboratory Notes';
  excerpt: string;
  abstract: string;
  content: string; // Markdown or rich HTML-compatible text
  equations?: { label: string; formula: string; description: string }[];
  keyFindings: string[];
  tags: string[];
}

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: "sgpe-condensate-growth",
    slug: "sgpe-condensate-growth-dynamics",
    title: "Stochastic Gross–Pitaevskii Equation: Simulating Condensate Growth from Finite-Temperature Noise",
    publishedDate: "October 2026",
    readTime: "7 min read",
    category: "Quantum Dynamics",
    excerpt: "How coupling an open quantum gas to a thermal bath using stochastic Langevin noise reveals the spontaneous growth of phase coherence and topological defect nucleation.",
    abstract: "Standard zero-temperature Gross-Pitaevskii equations fail to capture the spontaneous nucleation of a Bose-Einstein condensate from an incoherent thermal cloud. Here we examine the projected Stochastic Gross-Pitaevskii Equation (SGPE) with complex dissipation and Gaussian noise, observing how thermal fluctuations seed macroscopic phase order.",
    content: `
### Background & Theoretical Motivation
The conventional deterministic Gross-Pitaevskii equation (GPE) governs mean-field order parameters at zero temperature ($T = 0$). However, real experimental evaporative cooling takes place at non-zero temperatures, where the condensate mode exchanges energy and particles with a macroscopic thermal reservoir.

To capture this stochastic relaxation, Gardiner, Anglin, and Davis formulated the Stochastic Gross-Pitaevskii Equation (SGPE). The dynamics are governed by:

$$i\\hbar \\frac{\\partial \\psi(\\mathbf{r}, t)}{\\partial t} = (1 - i\\gamma) \\hat{\\mathcal{L}}_{\\text{GP}} \\psi(\\mathbf{r}, t) + \\eta(\\mathbf{r}, t)$$

where $\\gamma$ represents the dimensionless damping parameter dictating the rate of thermal equilibration, and $\\hat{\\mathcal{L}}_{\\text{GP}} = -\\frac{\\hbar^2}{2m}\\nabla^2 + V_{\\text{ext}}(\\mathbf{r}) + g|\\psi|^2 - \\mu$.

### Fluctuation-Dissipation Theorem
The stochastic complex noise term $\\eta(\\mathbf{r}, t)$ satisfies the fluctuation-dissipation theorem:

$$\\langle \\eta(\\mathbf{r}, t) \\eta^*(\\mathbf{r}', t') \\rangle = 2 \\gamma k_B T \\hbar \\, \\delta(\\mathbf{r} - \\mathbf{r}') \\delta(t - t')$$

This guarantees that in the long-time limit ($t \\to \\infty$), the distribution of classical field configurations relaxes to the correct grand-canonical thermal equilibrium distribution $\\mathcal{P}[\\psi] \\propto \\exp(-K[\\psi] / k_B T)$.

### Numerical Findings
1. **Critical Slowing Down:** Near $T \\approx T_c$, the relaxation time of long-wavelength fluctuations diverges, exhibiting signature power-law scaling.
2. **Kibble-Zurek Defect Formation:** Rapid quenching across $T_c$ leads to independent domains choosing uncorrelated phases, freezing quantized vortex loops into the nascent condensate.
3. **Bimodal Density Distribution:** The spatial density profile $|\psi|^2$ clearly decomposes into a high-density central Thomas-Fermi peak surrounded by a diffuse Gaussian thermal mantle.
    `,
    equations: [
      {
        label: "Stochastic Gross-Pitaevskii Equation",
        formula: "iħ ∂ψ/∂t = (1 - iγ)[-ħ²/(2m) ∇² + V_ext + g|ψ|² - μ]ψ + η(r, t)",
        description: "Langevin-type field equation combining deterministic nonlinear dispersion with reservoir dissipation and thermal noise."
      },
      {
        label: "Fluctuation-Dissipation Correlation",
        formula: "<η(r, t) η*(r', t')> = 2 γ k_B T ħ δ(r - r') δ(t - t')",
        description: "Guarantees convergence to the grand-canonical thermal equilibrium distribution at temperature T."
      }
    ],
    keyFindings: [
      "Dissipation parameter γ controls both thermal equilibration speed and phase diffusion rate.",
      "Spontaneous vortex-antivortex pairs form during sudden temperature quenches.",
      "Split-step Fourier with stochastic Runge-Kutta 4th-order algorithm preserves numerical symplecticity."
    ],
    tags: ["Bose-Einstein Condensation", "SGPE", "Open Quantum Systems", "Phase Coherence", "IIT Kharagpur"]
  },
  {
    id: "analytic-properties-smatrix",
    slug: "analytic-properties-s-matrix-review",
    title: "Analytical Properties of the S-Matrix: Poles, Bound States, and Unitarity",
    publishedDate: "May 2024",
    readTime: "9 min read",
    category: "Scattering Theory",
    excerpt: "Insights from my Master's research on how scattering amplitude singularities on the complex Riemann surface encode stable bound states, unstable resonances, and causality.",
    abstract: "The S-matrix connects the asymptotic 'in' states before an interaction to the 'out' states after scattering. This study reviews the analytical structure of partial wave scattering amplitudes $S_l(k)$ as functions of complex momentum $k$, linking physical observables directly to complex analysis.",
    content: `
### Scattering Operator & Partial Waves
In scattering theory, the scattering operator $\\hat{S}$ transforms free asymptotic wavepackets before interaction ($t \\to -\\infty$) into asymptotic states long after interaction ($t \\to +\\infty$).

$$\\hat{S} = \\lim_{t_2 \\to +\\infty, t_1 \\to -\\infty} e^{i\\hat{H}_0 t_2 / \\hbar} e^{-i\\hat{H}(t_2 - t_1)/\\hbar} e^{-i\\hat{H}_0 t_1 / \\hbar}$$

For spherically symmetric potentials, the amplitude expands into partial waves with phase shifts $\\delta_l(k)$:

$$S_l(k) = e^{2i\\delta_l(k)} = 1 + 2ik f_l(k)$$

### Physical Interpretation of Complex Poles
By analytically continuing $k$ into the complex plane:
- **Bound States:** Correspond to simple poles of $S_l(k)$ located on the positive imaginary axis ($k = i\\kappa$, where $\\kappa > 0$). The bound state energy is $E = -\\hbar^2 \\kappa^2 / (2m) < 0$.
- **Resonances (Quasi-bound States):** Lie in the fourth quadrant of the complex momentum plane ($k = k_r - i\\gamma/2$ with $k_r > 0, \\gamma > 0$). These produce Breit-Wigner peaks in the scattering cross section.
- **Virtual States:** Located on the negative imaginary axis ($k = -i\\kappa$).

### Unitarity & The Optical Theorem
Conservation of probability dictates that the S-matrix must be strictly unitary: $\\hat{S}^\\dagger \\hat{S} = \\hat{I}$. This directly yields the celebrated Optical Theorem:

$$\\sigma_{\\text{total}} = \\frac{4\\pi}{k} \\text{Im}\\, f(k, \\theta = 0)$$

The total cross-section is entirely determined by the imaginary part of the forward scattering amplitude.
    `,
    equations: [
      {
        label: "Unitarity Condition",
        formula: "S† · S = I  ⇒  Im f_l(k) = k |f_l(k)|²",
        description: "Strict probability conservation constraining the scattering matrix."
      },
      {
        label: "Optical Theorem",
        formula: "σ_tot = (4π / k) · Im f(0)",
        description: "Links total extinction cross section to forward-angle forward interference."
      }
    ],
    keyFindings: [
      "Bound states are physical poles on the positive imaginary momentum axis of the physical sheet.",
      "Causality demands analyticity in the upper-half energy plane (Kramers-Kronig dispersion relations).",
      "Resonance widths are inversely proportional to decaying state lifetimes τ = ħ / Γ."
    ],
    tags: ["S-Matrix", "Quantum Field Theory", "Scattering Poles", "RKMVERI Thesis", "Unitarity"]
  },
  {
    id: "offline-exam-engine-design",
    slug: "offline-exam-engine-open-source",
    title: "Designing an Offline-First Exam Engine for Remote Learning Environments",
    publishedDate: "August 2025",
    readTime: "5 min read",
    category: "Scientific Computing",
    excerpt: "Architecting a zero-telemetry, browser-native examination interface with PDF question pairing, automated timing, and client-side cryptographic integrity.",
    abstract: "In rural educational initiatives like Vivekdisha, unreliable connectivity often disrupts computer-based tests. We built an offline-first exam platform running entirely in client browsers with local response validation and CSV reporting.",
    content: `
### Problem Statement
Standard computer-based test (CBT) software requires constant active internet connections. When testing in rural districts where connections drop frequently, students lose test progress or suffer timed lockouts.

### Architectural Decisions
- **Zero Server Overhead:** The application operates completely within the client browser.
- **Embedded PDF Rendering:** Question papers render directly via sandboxed PDF renderers.
- **Local State Machine:** Uses indexed DB and local storage to cache answers every second.
- **Export & Integrity:** Upon submission, an encrypted/hashed CSV report is generated locally for the examiner to collect via USB.
    `,
    equations: [
      {
        label: "Client State Invariant",
        formula: "S_t+1 = f(S_t, a_t)  where Data ∈ LocalStorage(Sandboxed)",
        description: "Ensures complete offline continuity with zero network packet dependency."
      }
    ],
    keyFindings: [
      "Zero telemetry ensures absolute student privacy and runs on low-spec school computers.",
      "Supports MCQ (single answer) and MSQ (multiple select) grading rubrics.",
      "Successfully deployed for student practice tests at local West Bengal centers."
    ],
    tags: ["Open Source", "Educational Software", "Offline First", "Vivekdisha", "Python/JS"]
  }
];

const LOCAL_STORAGE_KEY = 'arijit_sikder_research_notes_v2';

export function getStoredBlogPosts(): BlogPost[] {
  if (typeof window === 'undefined') return INITIAL_BLOG_POSTS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return INITIAL_BLOG_POSTS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load blog posts from storage', e);
  }
  return INITIAL_BLOG_POSTS;
}

export function saveBlogPost(post: BlogPost): BlogPost[] {
  const existing = getStoredBlogPosts();
  const updated = [post, ...existing.filter(p => p.id !== post.id)];
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save blog post to storage', e);
  }
  return updated;
}
