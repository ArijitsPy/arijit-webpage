import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Play, Pause, RotateCcw, Video, Sliders, Eye, 
  HelpCircle, Info, Activity, Flame, Wind, Maximize2, FileText, CheckCircle2,
  TrendingUp, Compass, Sparkles, Layers
} from 'lucide-react';
import { 
  calculateCondensateFraction, 
  calculateThomasFermiRadius, 
  calculateSpatialDensity, 
  calculatePhaseCoherence,
  getBECSummaryMetrics,
  BECParameters 
} from '../utils/becPhysics';
import { RESEARCH_ASSETS } from '../data/cvData';

type LabTab = 'simulationVideo' | 'interactiveCanvas' | 'growthKinetics';
type CanvasView = 'density2D' | 'crossSection' | 'phaseField';
type ResearchFigureId = 'dynamics' | 'vortices' | 'derivatives';

interface VortexCore {
  x: number;
  y: number;
  charge: 1 | -1; // +1 = cyan, -1 = red
  vx: number;
  vy: number;
}

export const InteractiveBECLab: React.FC = () => {
  // Main Lab Tab
  const [activeTab, setActiveTab] = useState<LabTab>('simulationVideo');
  const [activeFigure, setActiveFigure] = useState<ResearchFigureId>('dynamics');

  // Video player state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [videoCurrentTime, setVideoCurrentTime] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(0);

  // Canvas interactive model state
  const [canvasView, setCanvasView] = useState<CanvasView>('density2D');
  const [temperatureRatio, setTemperatureRatio] = useState<number>(0.65);
  const [atomCount, setAtomCount] = useState<number>(120000);
  const [dampingGamma, setDampingGamma] = useState<number>(0.03);
  const [quenchTauQ, setQuenchTauQ] = useState<number>(90.0);
  const [isSimPlaying, setIsSimPlaying] = useState<boolean>(true);
  const [showTheory, setShowTheory] = useState<boolean>(false);

  // Vortex tracking particles
  const initialVorticesList: VortexCore[] = [
    { x: -0.32, y: 0.25, charge: 1, vx: 0.0012, vy: -0.0008 },
    { x: -0.25, y: 0.31, charge: -1, vx: -0.001, vy: 0.0011 },
    { x: 0.18, y: -0.42, charge: 1, vx: -0.0015, vy: 0.0006 },
    { x: 0.26, y: -0.38, charge: -1, vx: 0.0012, vy: -0.0009 },
    { x: 0.45, y: 0.15, charge: 1, vx: 0.0008, vy: 0.0014 },
    { x: 0.38, y: 0.22, charge: -1, vx: -0.0011, vy: -0.001 },
    { x: -0.15, y: -0.35, charge: 1, vx: 0.0014, vy: 0.0005 },
    { x: -0.10, y: -0.28, charge: -1, vx: -0.0009, vy: -0.0012 },
    { x: 0.52, y: -0.22, charge: 1, vx: -0.0007, vy: 0.0013 },
    { x: 0.48, y: -0.15, charge: -1, vx: 0.0011, vy: -0.0008 },
    { x: -0.45, y: -0.18, charge: 1, vx: 0.0009, vy: -0.0011 },
    { x: -0.40, y: -0.12, charge: -1, vx: -0.0013, vy: 0.0007 },
    { x: 0.05, y: 0.48, charge: 1, vx: -0.001, vy: -0.001 },
    { x: 0.12, y: 0.42, charge: -1, vx: 0.0014, vy: 0.0008 },
    { x: -0.28, y: 0.52, charge: 1, vx: 0.0012, vy: -0.0007 },
    { x: -0.22, y: 0.58, charge: -1, vx: -0.0008, vy: 0.0012 },
  ];
  const vorticesRef = useRef<VortexCore[]>(initialVorticesList);
  const [vortexCounts, setVortexCounts] = useState<{ positive: number; negative: number }>({
    positive: 8,
    negative: 8,
  });

  const timeStepRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Computed metrics
  const physicsParams: BECParameters = useMemo(() => ({
    temperatureRatio,
    atomCount,
    trapFrequencyHz: 120,
    aspectRatio: 1.0,
    dampingGamma,
    interactionStrength: 1.0,
  }), [temperatureRatio, atomCount, dampingGamma]);

  const metrics = useMemo(() => getBECSummaryMetrics(physicsParams), [physicsParams]);
  const condensateFraction = metrics.condensateFraction;
  const tfRadius = useMemo(() => calculateThomasFermiRadius(atomCount, 1.0), [atomCount]);

  // Video event handlers
  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      setVideoCurrentTime(videoRef.current.currentTime);
      setVideoDuration(videoRef.current.duration || 0);
    }
  };

  // Color generator matching Arijit's simulation colormap (Blue -> Cyan -> Green -> Yellow)
  const getSimulationColor = (val: number): [number, number, number] => {
    const v = Math.max(0, Math.min(1, val));
    if (v < 0.2) {
      // Deep blue to royal blue
      const t = v / 0.2;
      return [Math.round(10 * (1 - t) + 15 * t), Math.round(20 * (1 - t) + 60 * t), Math.round(180 * (1 - t) + 230 * t)];
    } else if (v < 0.5) {
      // Royal blue to cyan
      const t = (v - 0.2) / 0.3;
      return [Math.round(15 * (1 - t) + 0 * t), Math.round(60 * (1 - t) + 200 * t), Math.round(230 * (1 - t) + 210 * t)];
    } else if (v < 0.8) {
      // Cyan to emerald/green
      const t = (v - 0.5) / 0.3;
      return [Math.round(0 * (1 - t) + 30 * t), Math.round(200 * (1 - t) + 225 * t), Math.round(210 * (1 - t) + 110 * t)];
    } else {
      // Green to bright yellow/white
      const t = (v - 0.8) / 0.2;
      return [Math.round(30 * (1 - t) + 245 * t), Math.round(225 * (1 - t) + 250 * t), Math.round(110 * (1 - t) + 60 * t)];
    }
  };

  // Canvas drawing loop
  useEffect(() => {
    if (activeTab !== 'interactiveCanvas') return;

    let active = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const render = () => {
      if (!active) return;
      const t = timeStepRef.current * 0.05;
      const currentVortices = vorticesRef.current;

      if (canvasView === 'density2D') {
        const imgData = ctx.createImageData(width, height);
        const data = imgData.data;
        const step = 2;

        for (let py = 0; py < height; py += step) {
          const ny = (py / height) * 2 - 1;
          for (let px = 0; px < width; px += step) {
            const nx = (px / width) * 2 - 1;

            const thermalNoise = Math.sqrt(Math.max(0.01, temperatureRatio)) * dampingGamma * 3.0;
            const noise = (Math.sin(nx * 15 + t * 2.2) * Math.cos(ny * 15 - t * 1.9) +
                           Math.sin(nx * 30 - t * 3.1) * 0.4) * thermalNoise;

            const { totalDensity } = calculateSpatialDensity(nx, ny, {
              temperatureRatio,
              condensateFraction,
              thomasFermiRadius: tfRadius,
              aspectRatio: 1.0,
              noisePerturbation: noise,
            });

            // Suppress density at active vortex cores
            let finalDensity = totalDensity;
            for (let i = 0; i < currentVortices.length; i++) {
              const d = Math.hypot(nx - currentVortices[i].x, ny - currentVortices[i].y);
              const coreRadius = 0.06;
              if (d < coreRadius) {
                finalDensity *= Math.pow(d / coreRadius, 1.8);
              }
            }

            const [r, g, b] = getSimulationColor(finalDensity);

            for (let dy = 0; dy < step && py + dy < height; dy++) {
              for (let dx = 0; dx < step && px + dx < width; dx++) {
                const idx = ((py + dy) * width + (px + dx)) * 4;
                data[idx] = r;
                data[idx + 1] = g;
                data[idx + 2] = b;
                data[idx + 3] = 255;
              }
            }
          }
        }
        ctx.putImageData(imgData, 0, 0);

        // Draw vortex markers on canvas (cyan circles for N+, red circles for N-)
        currentVortices.forEach((v) => {
          const screenX = ((v.x + 1) / 2) * width;
          const screenY = ((v.y + 1) / 2) * height;

          ctx.lineWidth = 1.8;
          ctx.strokeStyle = v.charge === 1 ? '#06b6d4' : '#ef4444';
          ctx.beginPath();
          ctx.arc(screenX, screenY, 6, 0, 2 * Math.PI);
          ctx.stroke();

          // Center dot
          ctx.fillStyle = v.charge === 1 ? '#06b6d4' : '#ef4444';
          ctx.beginPath();
          ctx.arc(screenX, screenY, 1.5, 0, 2 * Math.PI);
          ctx.fill();
        });

        // Grid lines overlay
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1;
        ctx.strokeRect(30, 30, width - 60, height - 60);

      } else if (canvasView === 'crossSection') {
        // 1D Bimodal Cross Section
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, width, height);

        const baseline = height - 45;
        const maxAmplitude = height - 90;

        // Axes
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(40, baseline);
        ctx.lineTo(width - 20, baseline);
        ctx.moveTo(40, 25);
        ctx.lineTo(40, baseline);
        ctx.stroke();

        // Ticks
        ctx.fillStyle = '#64748b';
        ctx.font = '10px var(--font-mono)';
        ctx.textAlign = 'center';
        ctx.fillText('-30', 40, baseline + 18);
        ctx.fillText('0 (Center)', 40 + (width - 60) * 0.5, baseline + 18);
        ctx.fillText('+30', width - 20, baseline + 18);

        // Density curves
        if (condensateFraction > 0.005) {
          // Thermal cloud
          ctx.beginPath();
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([3, 3]);
          for (let px = 40; px < width - 20; px++) {
            const nx = ((px - 40) / (width - 60)) * 2 - 1;
            const { thermalDensity } = calculateSpatialDensity(nx, 0, {
              temperatureRatio,
              condensateFraction,
              thomasFermiRadius: tfRadius,
              aspectRatio: 1.0,
            });
            const py = baseline - thermalDensity * maxAmplitude;
            if (px === 40) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
          ctx.setLineDash([]);

          // Condensate
          ctx.beginPath();
          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 2]);
          for (let px = 40; px < width - 20; px++) {
            const nx = ((px - 40) / (width - 60)) * 2 - 1;
            const { condensateDensity } = calculateSpatialDensity(nx, 0, {
              temperatureRatio,
              condensateFraction,
              thomasFermiRadius: tfRadius,
              aspectRatio: 1.0,
            });
            const py = baseline - condensateDensity * maxAmplitude;
            if (px === 40) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
          ctx.setLineDash([]);

          // Total bimodal density
          ctx.beginPath();
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 2.5;
          for (let px = 40; px < width - 20; px++) {
            const nx = ((px - 40) / (width - 60)) * 2 - 1;
            const noise = Math.sin(nx * 22 + t * 2) * dampingGamma * 0.15;
            const { totalDensity } = calculateSpatialDensity(nx, 0, {
              temperatureRatio,
              condensateFraction,
              thomasFermiRadius: tfRadius,
              aspectRatio: 1.0,
              noisePerturbation: noise,
            });
            const py = baseline - Math.min(1.0, totalDensity) * maxAmplitude;
            if (px === 40) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();

          // Legend at top right
          ctx.textAlign = 'left';
          ctx.fillStyle = '#f59e0b';
          ctx.font = 'bold 11px var(--font-sans)';
          ctx.fillText('— Total Bimodal Density |ψ|²', width - 235, 25);
          ctx.fillStyle = '#06b6d4';
          ctx.fillText('- - Condensate Peak n_c(x)', width - 235, 42);
          ctx.fillStyle = '#94a3b8';
          ctx.fillText('··· Thermal Cloud Wings n_th(x)', width - 235, 59);

        } else {
          // Pure Thermal
          ctx.beginPath();
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2.5;
          for (let px = 40; px < width - 20; px++) {
            const nx = ((px - 40) / (width - 60)) * 2 - 1;
            const noise = Math.sin(nx * 20 + t * 2) * dampingGamma * 0.25;
            const { totalDensity } = calculateSpatialDensity(nx, 0, {
              temperatureRatio,
              condensateFraction: 0,
              thomasFermiRadius: 0,
              aspectRatio: 1.0,
              noisePerturbation: noise,
            });
            const py = baseline - Math.min(1.0, totalDensity) * maxAmplitude;
            if (px === 40) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();

          ctx.textAlign = 'left';
          ctx.fillStyle = '#38bdf8';
          ctx.font = 'bold 12px var(--font-sans)';
          ctx.fillText('Pure Thermal Gas Profile: T ≥ T_c', width - 235, 25);
          ctx.fillStyle = '#94a3b8';
          ctx.font = '10px var(--font-sans)';
          ctx.fillText('Condensate fraction N₀ = 0 (n_c = 0)', width - 235, 43);
        }

      } else if (canvasView === 'phaseField') {
        // Phase field arg(psi) in [-pi, pi]
        const imgData = ctx.createImageData(width, height);
        const data = imgData.data;

        for (let py = 0; py < height; py += 2) {
          const ny = (py / height) * 2 - 1;
          for (let px = 0; px < width; px += 2) {
            const nx = (px / width) * 2 - 1;

            let phaseAngle = 0;
            // Sum phase winding of all vortices: sum_i charge_i * atan2(y - y_i, x - x_i)
            for (let i = 0; i < currentVortices.length; i++) {
              const dx = nx - currentVortices[i].x;
              const dy = ny - currentVortices[i].y;
              phaseAngle += currentVortices[i].charge * Math.atan2(dy, dx);
            }

            // Map phaseAngle in [-pi, pi] to color
            const normPhase = ((phaseAngle % (2 * Math.PI)) + Math.PI) / (2 * Math.PI);
            // Color map: yellow to purple/dark
            const r = Math.round(255 * (0.5 + 0.5 * Math.sin(normPhase * Math.PI * 2)));
            const g = Math.round(255 * (0.5 + 0.5 * Math.sin(normPhase * Math.PI * 2 + Math.PI / 3)));
            const b = Math.round(255 * (0.5 + 0.5 * Math.cos(normPhase * Math.PI * 2)));

            for (let dy = 0; dy < 2 && py + dy < height; dy++) {
              for (let dx = 0; dx < 2 && px + dx < width; dx++) {
                const idx = ((py + dy) * width + (px + dx)) * 4;
                data[idx] = r;
                data[idx + 1] = g;
                data[idx + 2] = b;
                data[idx + 3] = 255;
              }
            }
          }
        }
        ctx.putImageData(imgData, 0, 0);

        // Draw vortex core indicators
        currentVortices.forEach((v) => {
          const screenX = ((v.x + 1) / 2) * width;
          const screenY = ((v.y + 1) / 2) * height;
          ctx.strokeStyle = v.charge === 1 ? '#06b6d4' : '#ef4444';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(screenX, screenY, 6, 0, 2 * Math.PI);
          ctx.stroke();
        });
      }

      if (isSimPlaying) {
        timeStepRef.current += 1;
        // Slowly drift vortices towards opposite charge pairs (annihilation dynamics)
        if (timeStepRef.current % 4 === 0) {
          for (let i = 0; i < currentVortices.length; i++) {
            const v = currentVortices[i];
            v.x += v.vx;
            v.y += v.vy;
            // Bounce at boundaries
            if (Math.abs(v.x) > 0.85) v.vx *= -1;
            if (Math.abs(v.y) > 0.85) v.vy *= -1;
          }
        }
        animationFrameRef.current = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      active = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [activeTab, canvasView, temperatureRatio, atomCount, dampingGamma, tfRadius, condensateFraction, isSimPlaying]);

  const positiveVorticesCount = vortexCounts.positive;
  const negativeVorticesCount = vortexCounts.negative;

  return (
    <section id="bec-lab" className="py-16 md:py-24 bg-slate-900 text-white border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
              <span>PhD Research Laboratory</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Stochastic Projected GPE (SPGPE)</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>IIT Kharagpur</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-serif-heading">
              SPGPE Quantum Dynamics & Vortex Laboratory
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Direct computational findings from my doctoral work: non-equilibrium condensate growth kinetics across a finite-rate thermal quench (τ_Q = 90.0), showing topological defect nucleation and vortex-antivortex (N₊, N₋) pair annihilation.
            </p>
          </div>

          {/* Primary View Switcher */}
          <div className="flex items-center p-1 bg-slate-800 rounded-xl border border-slate-700">
            <button
              type="button"
              onClick={() => setActiveTab('simulationVideo')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'simulationVideo'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Numerical Simulation Video</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('interactiveCanvas')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'interactiveCanvas'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Interactive Model</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('growthKinetics')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'growthKinetics'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Kinetics & Figures</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Real Numerical Simulation Video & Walkthrough */}
        {activeTab === 'simulationVideo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Video Player Display (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-950 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl relative">
                
                {/* Embedded Real Simulation Video */}
                <video
                  ref={videoRef}
                  src={RESEARCH_ASSETS.videoSimulation}
                  className="w-full h-auto aspect-video object-contain bg-black"
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  onTimeUpdate={handleVideoTimeUpdate}
                />

                {/* Video Info Overlay */}
                <div className="bg-slate-900/90 backdrop-blur-md p-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <div className="font-semibold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>SPGPE Quench Simulation Run: Spatial Density & Phase Winding</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Left: Density |ψ|² on [−30, 30]² · Right: Phase arg ψ ∈ [−π, π] with vortex cores (N+, N−)
                    </p>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-[11px] text-amber-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                    <span>Quench: τ_Q = 90.0</span>
                    <span className="text-slate-600">|</span>
                    <span>t_eq ≈ 60.05</span>
                  </div>
                </div>
              </div>

              {/* Simulation Physics Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-1">
                  <div className="text-[11px] text-slate-400 font-mono">Stage 1: Quench Initiation</div>
                  <div className="text-sm font-bold text-white">t &lt; 50 (Thermal Gas)</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Zero macroscopic condensate (N+ = 0, N− = 0). Phase is completely scrambled.
                  </p>
                </div>

                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-1">
                  <div className="text-[11px] text-amber-400 font-mono">Stage 2: Kibble–Zurek Nucleation</div>
                  <div className="text-sm font-bold text-amber-300">t ≈ 54–60 (Peak Defect Count)</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Rapid condensation spawns ~96 vortex-antivortex pairs due to independent domain phases.
                  </p>
                </div>

                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-1">
                  <div className="text-[11px] text-emerald-400 font-mono">Stage 3: Pair Annihilation</div>
                  <div className="text-sm font-bold text-emerald-300">t &gt; 100 (Coherent State)</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Vortex pairs collide and annihilate, decaying defect count down to &lt; 6 as phase coarsens.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Research Findings & Direct Data Visualizer (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-slate-800/70 p-6 rounded-2xl border border-slate-700/80 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                  <h3 className="text-base font-bold text-white font-serif-heading">
                    PhD Simulation Methodology
                  </h3>
                  <span className="text-[11px] font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">
                    Department of Physics, IIT KGP
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We simulate the <strong>Stochastic Projected Gross–Pitaevskii Equation (SPGPE)</strong> governing an ultracold 2D Bose gas during a continuous linear chemical potential quench:
                </p>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto">
                  μ(t) = μ_initial + (t / τ_Q) · g
                </div>

                <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                  <li>
                    <strong className="text-white">Topological Phase Winding:</strong> Phase circulation around vortex cores satisfies <span className="font-mono text-cyan-300">∮ ∇θ · dr = 2π q</span> with topological charge <span className="font-mono text-amber-300">q = ±1</span>.
                  </li>
                  <li>
                    <strong className="text-white">Inflection & Transition:</strong> Maximum growth acceleration occurs at <span className="font-mono text-amber-300">t₁ = 53.8</span>, reaching full equilibration at <span className="font-mono text-amber-300">t̃_eq = 60.05</span>.
                  </li>
                  <li>
                    <strong className="text-white">Defect Scaling:</strong> Annihilation kinetics follow universal power-law decay of defect density: <span className="font-mono text-amber-300">n_v(t) ∝ t^(−ν)</span>.
                  </li>
                </ul>

                {/* Figure Preview Card */}
                <div className="pt-2 border-t border-slate-700 space-y-2">
                  <div className="text-xs font-semibold text-slate-300">
                    Publication Figures from this Run:
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => { setActiveTab('growthKinetics'); setActiveFigure('dynamics'); }}
                      className="p-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-400 text-left transition-colors cursor-pointer group"
                    >
                      <img
                        src={RESEARCH_ASSETS.spgpeGrowthDynamics}
                        alt="SPGPE Growth dynamics"
                        className="w-full h-16 object-cover rounded-md mb-1.5"
                      />
                      <span className="text-[11px] text-slate-300 group-hover:text-amber-300 font-medium line-clamp-1">
                        Growth Curve N(t)
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setActiveTab('growthKinetics'); setActiveFigure('vortices'); }}
                      className="p-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-400 text-left transition-colors cursor-pointer group"
                    >
                      <img
                        src={RESEARCH_ASSETS.vortexPhaseSnapshot}
                        alt="Vortex pair annihilation"
                        className="w-full h-16 object-cover rounded-md mb-1.5"
                      />
                      <span className="text-[11px] text-slate-300 group-hover:text-amber-300 font-medium line-clamp-1">
                        Vortices N+, N− Map
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: Interactive Real-Time Canvas Model */}
        {activeTab === 'interactiveCanvas' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Canvas Surface (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="bg-slate-800/80 rounded-t-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 border border-slate-700">
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setCanvasView('density2D')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      canvasView === 'density2D' ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    2D Density |ψ|²
                  </button>
                  <button
                    type="button"
                    onClick={() => setCanvasView('crossSection')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      canvasView === 'crossSection' ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    1D Bimodal Slice
                  </button>
                  <button
                    type="button"
                    onClick={() => setCanvasView('phaseField')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      canvasView === 'phaseField' ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Phase arg(ψ)
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSimPlaying(!isSimPlaying)}
                    className="p-1.5 rounded-md bg-slate-700 hover:bg-slate-600 text-white transition-colors cursor-pointer"
                  >
                    {isSimPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      timeStepRef.current = 0;
                    }}
                    className="p-1.5 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Reset simulation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Canvas Container */}
              <div className="relative aspect-square max-h-[460px] w-full bg-slate-950 rounded-b-xl border-x border-b border-slate-700 overflow-hidden flex items-center justify-center shadow-inner">
                <canvas
                  ref={canvasRef}
                  width={460}
                  height={460}
                  className="w-full h-full object-contain cursor-crosshair"
                />

                {/* HUD readout */}
                <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-sm border border-slate-700/80 rounded-lg p-2.5 text-[11px] font-mono text-slate-300 space-y-1 pointer-events-none">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-400">T / T_c:</span>
                    <span className="text-amber-400 font-bold">{temperatureRatio.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-400">Vortices (N+):</span>
                    <span className="text-cyan-400 font-bold">{positiveVorticesCount}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-400">Antivortices (N−):</span>
                    <span className="text-rose-400 font-bold">{negativeVorticesCount}</span>
                  </div>
                </div>

                <div className="absolute bottom-3 right-3 bg-slate-900/85 backdrop-blur-sm border border-slate-700/80 rounded-lg px-3 py-1.5 text-[11px] text-slate-300 pointer-events-none">
                  {canvasView === 'density2D' && <span>Cyan ring: N+ vortex | Red ring: N− antivortex</span>}
                  {canvasView === 'crossSection' && <span>Thomas–Fermi parabolic core + Gaussian thermal wings</span>}
                  {canvasView === 'phaseField' && <span>Phase arg(ψ) winding ±2π around topological defect cores</span>}
                </div>
              </div>

              {/* Live Physical Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-800/40 p-4 rounded-xl border border-slate-800">
                <div className="space-y-1">
                  <div className="text-[11px] text-slate-400">Condensate Atoms (N₀)</div>
                  <div className="text-base font-bold text-amber-400 font-mono tabular-nums">
                    {metrics.condensateAtomCount.toLocaleString()}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[11px] text-slate-400">Thermal Atoms (N_th)</div>
                  <div className="text-base font-bold text-slate-300 font-mono tabular-nums">
                    {metrics.thermalAtomCount.toLocaleString()}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[11px] text-slate-400">Defect Ratio (N+/N−)</div>
                  <div className="text-base font-bold text-cyan-400 font-mono tabular-nums">
                    {positiveVorticesCount} / {negativeVorticesCount}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[11px] text-slate-400">Healing Length (ξ_h)</div>
                  <div className="text-base font-bold text-emerald-400 font-mono tabular-nums">
                    {metrics.healingLengthMicrons} µm
                  </div>
                </div>
              </div>
            </div>

            {/* Controls (5 cols) */}
            <div className="lg:col-span-5 space-y-6 bg-slate-800/60 p-6 rounded-2xl border border-slate-700/80">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  <span>Physical & Quench Controls</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTheory(!showTheory)}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showTheory ? "Hide Math" : "SPGPE Math"}</span>
                </button>
              </div>

              {/* Slider 1: Reduced Temperature */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="temp-slider" className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>Reduced Temperature (T / T_c)</span>
                  </label>
                  <span className="font-mono text-amber-400 font-bold tabular-nums">
                    {temperatureRatio.toFixed(2)}
                  </span>
                </div>
                <input
                  id="temp-slider"
                  type="range"
                  min="0.05"
                  max="2.0"
                  step="0.01"
                  value={temperatureRatio}
                  onChange={(e) => setTemperatureRatio(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              {/* Slider 2: Quench Timescale tau_Q */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="tau-slider" className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Quench Timescale (τ_Q)</span>
                  </label>
                  <span className="font-mono text-cyan-400 font-bold tabular-nums">
                    {quenchTauQ.toFixed(1)} ms
                  </span>
                </div>
                <input
                  id="tau-slider"
                  type="range"
                  min="20.0"
                  max="180.0"
                  step="5.0"
                  value={quenchTauQ}
                  onChange={(e) => setQuenchTauQ(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Fast Quench (More Vortices)</span>
                  <span className="text-amber-400">τ_Q = 90.0 (Research standard)</span>
                  <span>Slow Quench (Adiabatic)</span>
                </div>
              </div>

              {/* Slider 3: Dissipation Parameter gamma */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="gamma-slider" className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Langevin Dissipation Parameter (γ)</span>
                  </label>
                  <span className="font-mono text-emerald-400 font-bold tabular-nums">
                    {dampingGamma.toFixed(3)}
                  </span>
                </div>
                <input
                  id="gamma-slider"
                  type="range"
                  min="0.005"
                  max="0.08"
                  step="0.005"
                  value={dampingGamma}
                  onChange={(e) => setDampingGamma(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              {/* Action buttons */}
              <div className="pt-2 border-t border-slate-700 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    // Inject fresh vortex-antivortex pairs
                    const count = 16;
                    const newBatch: VortexCore[] = [];
                    for (let i = 0; i < count; i++) {
                      const angle = Math.random() * Math.PI * 2;
                      const r = 0.2 + Math.random() * 0.5;
                      newBatch.push({
                        x: Math.cos(angle) * r,
                        y: Math.sin(angle) * r,
                        charge: i % 2 === 0 ? 1 : -1,
                        vx: (Math.random() - 0.5) * 0.003,
                        vy: (Math.random() - 0.5) * 0.003,
                      });
                    }
                    vorticesRef.current = newBatch;
                    setVortexCounts({ positive: count / 2, negative: count / 2 });
                  }}
                  className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors cursor-pointer"
                >
                  Generate New Vortex Swarm
                </button>

                <button
                  type="button"
                  onClick={() => {
                    // Annihilate all vortices
                    vorticesRef.current = [];
                    setVortexCounts({ positive: 0, negative: 0 });
                  }}
                  className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  Clear Defect Cores
                </button>
              </div>

              {showTheory && (
                <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 text-xs text-slate-300 space-y-2">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    <span>SPGPE Quench Kinetics</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    During a thermal quench across the condensation transition, disparate spatial domains choose phase independently. When these domains coalesce, topological defect loops (quantized vortices) are trapped.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 3: Growth Kinetics & Publication Figures */}
        {activeTab === 'growthKinetics' && (
          <div className="space-y-6">
            
            {/* Figure Selection Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
              <button
                type="button"
                onClick={() => setActiveFigure('dynamics')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeFigure === 'dynamics'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Figure 1: SPGPE Growth Dynamics (τ_Q = 90.0)
              </button>
              <button
                type="button"
                onClick={() => setActiveFigure('vortices')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeFigure === 'vortices'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Figure 2: Vortex & Antivortex Winding Map (N+, N−)
              </button>
              <button
                type="button"
                onClick={() => setActiveFigure('derivatives')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeFigure === 'derivatives'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Figure 3: Condensate Norm N(t) & Inflection d²N/dt²
              </button>
            </div>

            {/* Display Active Figure with In-Depth Physical Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Image Preview Box (7 cols) */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
                {activeFigure === 'dynamics' && (
                  <img
                    src={RESEARCH_ASSETS.spgpeGrowthDynamics}
                    alt="SPGPE Growth dynamics: for tau_Q = 90.0"
                    className="w-full h-auto object-contain rounded-xl max-h-[520px] mx-auto bg-white"
                  />
                )}
                {activeFigure === 'vortices' && (
                  <img
                    src={RESEARCH_ASSETS.vortexPhaseSnapshot}
                    alt="Vortex and antivortex pair distribution"
                    className="w-full h-auto object-contain rounded-xl max-h-[520px] mx-auto bg-white"
                  />
                )}
                {activeFigure === 'derivatives' && (
                  <img
                    src={RESEARCH_ASSETS.growthDerivatives}
                    alt="Condensate growth derivatives and equilibration time"
                    className="w-full h-auto object-contain rounded-xl max-h-[520px] mx-auto bg-white"
                  />
                )}
              </div>

              {/* Physical Interpretation (5 cols) */}
              <div className="lg:col-span-5 bg-slate-800/70 p-6 rounded-2xl border border-slate-700 space-y-5">
                
                {activeFigure === 'dynamics' && (
                  <div className="space-y-4">
                    <div>
                      <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">
                        Doctoral Research Figure 1
                      </span>
                      <h3 className="text-xl font-bold text-white font-serif-heading mt-1">
                        SPGPE Growth Dynamics: Numerical vs. Analytical
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      This figure compares full 2D Stochastic Projected Gross–Pitaevskii numerical simulation trajectories (blue curve) against analytical early-growth predictions (red dashed line) during a linear chemical potential ramp μ(t)/g (dotted line) with quench parameter τ_Q = 90.0.
                    </p>

                    <div className="space-y-2 bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span>Equilibration Transition Time:</span>
                        <strong className="text-amber-400 font-mono">Δ t̃_eq = 60.05</strong>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Quench Timescale:</span>
                        <strong className="text-cyan-400 font-mono">τ_Q = 90.0</strong>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Growth Regime:</span>
                        <strong className="text-emerald-400">Sigmoid to Saturated Steady State</strong>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      At early times (t &lt; 45), stochastic noise triggers macroscopic mode occupation. Once the chemical potential exceeds the critical threshold, exponential amplification sets in until non-linear atom-atom interactions saturate growth at t ≈ 90.
                    </p>
                  </div>
                )}

                {activeFigure === 'vortices' && (
                  <div className="space-y-4">
                    <div>
                      <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">
                        Doctoral Research Figure 2
                      </span>
                      <h3 className="text-xl font-bold text-white font-serif-heading mt-1">
                        Vortex (N₊) and Antivortex (N₋) Annihilation Map
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Spatial distribution of topological defects during the post-quench coarsening stage.
                    </p>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                        <div className="text-slate-400 font-mono">Snapshot (a) t = 54</div>
                        <div className="text-cyan-400 font-bold">N₊ = 96, N₋ = 95</div>
                        <p className="text-[11px] text-slate-400">Dense vortex swarm at transition peak.</p>
                      </div>

                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                        <div className="text-slate-400 font-mono">Snapshot (b) t = 60</div>
                        <div className="text-emerald-400 font-bold">N₊ = 60, N₋ = 61</div>
                        <p className="text-[11px] text-slate-400">37% defects annihilated in 6 time units.</p>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs text-slate-300">
                      <div className="font-semibold text-white">Visual Indicators:</div>
                      <p>
                        • <strong className="text-cyan-400">Cyan circles:</strong> Quantized vortices with winding +2π (N₊).<br />
                        • <strong className="text-rose-400">Red circles:</strong> Quantized antivortices with winding −2π (N₋).<br />
                        • Bottom panels: Phase arg(ψ) ∈ [−π, π] showing phase dislocation lines connecting vortex-antivortex pairs.
                      </p>
                    </div>
                  </div>
                )}

                {activeFigure === 'derivatives' && (
                  <div className="space-y-4">
                    <div>
                      <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">
                        Doctoral Research Figure 3
                      </span>
                      <h3 className="text-xl font-bold text-white font-serif-heading mt-1">
                        Condensate Norm N(t) and Acceleration d²N/dt²
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Analysis of condensation kinetics and growth inflection:
                    </p>

                    <div className="space-y-2 bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span>Inflection Point (t₁):</span>
                        <strong className="text-amber-400 font-mono">t₁ = 53.8</strong>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Equilibration Point (t₂):</span>
                        <strong className="text-cyan-400 font-mono">t₂ = 60.05</strong>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Transition Window (s):</span>
                        <strong className="text-emerald-400 font-mono">s = 5.0 (shaded region)</strong>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      Subplot (b) plots the second derivative d²N(t)/dt². The zero-crossing marks the exact moment of maximum growth velocity, while the minimum marks the rapid onset of non-linear saturation.
                    </p>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
