/**
 * Pure physics calculations for Bose-Einstein Condensation (BEC)
 * and Stochastic Gross-Pitaevskii dynamics.
 */

export interface BECParameters {
  temperatureRatio: number; // T / T_c (0.0 to 3.0)
  atomCount: number; // e.g. 100,000 atoms
  trapFrequencyHz: number; // omega_radial / 2pi
  aspectRatio: number; // omega_z / omega_radial (1 for isotropic, >1 for cigar)
  dampingGamma: number; // dimensionless dissipation coupling (0.01 - 0.1)
  interactionStrength: number; // g parameter
}

export interface BECMetrics {
  condensateFraction: number; // N_0 / N in [0, 1]
  condensateAtomCount: number;
  thermalAtomCount: number;
  criticalTemperatureEstimateNK: number; // in nanoKelvin
  healingLengthMicrons: number;
  chemicalPotentialKHz: number;
  isCondensed: boolean;
}

/**
 * Calculates the theoretical non-interacting 3D harmonic trap condensate fraction:
 * N_0 / N = 1 - (T / T_c)^3 for T < T_c, and 0 for T >= T_c.
 */
export function calculateCondensateFraction(temperatureRatio: number): number {
  if (temperatureRatio <= 0) return 1.0;
  if (temperatureRatio >= 1.0) return 0.0;
  const fraction = 1.0 - Math.pow(temperatureRatio, 3);
  return Math.max(0.0, Math.min(1.0, fraction));
}

/**
 * Calculates the Thomas-Fermi radius in the radial direction (arbitrary simulation units).
 * R_TF proportional to (N * a_s)^(1/5).
 */
export function calculateThomasFermiRadius(atomCount: number, trapRatio: number = 1.0): number {
  if (atomCount <= 0) return 0;
  // Scaled for canvas grid coordinates (-1 to +1)
  const baseRadius = 0.55 * Math.pow(atomCount / 100000, 0.2);
  return Math.max(0.15, Math.min(0.85, baseRadius / Math.sqrt(trapRatio)));
}

/**
 * Calculates the healing length xi = hbar / sqrt(2 * m * g * n_0).
 * In normalized simulation units, healing length scales inversely with the square root of peak density.
 */
export function calculateHealingLength(condensateFraction: number, atomCount: number): number {
  if (condensateFraction <= 0.001 || atomCount <= 0) return 0.5; // diffuse limit
  const peakDensity = condensateFraction * (atomCount / 100000);
  const xi = 0.06 / Math.sqrt(Math.max(0.01, peakDensity));
  return Math.max(0.02, Math.min(0.5, xi));
}

/**
 * Calculates chemical potential mu / h in kHz estimate.
 */
export function calculateChemicalPotential(atomCount: number, condensateFraction: number): number {
  if (condensateFraction <= 0) return 0.1;
  const n0 = atomCount * condensateFraction;
  return +(0.5 * Math.pow(n0 / 10000, 0.4)).toFixed(2);
}

/**
 * Computes the 2D spatial density at coordinate (x, y) where x, y in [-1, 1].
 * Combines:
 * 1. Coherent Thomas-Fermi parabolic core: n_c(r) = max(0, n_0 * (1 - (x/Rx)^2 - (y/Ry)^2))
 * 2. Incoherent Gaussian thermal cloud: n_th(r) = n_th0 * exp(- (x^2 + (y*aspectRatio)^2) / (2 * sigma_th^2))
 * 3. Thermal fluctuation noise
 */
export function calculateSpatialDensity(
  x: number,
  y: number,
  params: {
    temperatureRatio: number;
    condensateFraction: number;
    thomasFermiRadius: number;
    aspectRatio: number;
    noisePerturbation?: number;
  }
): { totalDensity: number; condensateDensity: number; thermalDensity: number } {
  const { temperatureRatio, condensateFraction, thomasFermiRadius, aspectRatio, noisePerturbation = 0 } = params;

  // Condensate profile (Thomas-Fermi approximation)
  let condensateDensity = 0;
  if (condensateFraction > 0.001 && thomasFermiRadius > 0) {
    const rx = thomasFermiRadius;
    const ry = thomasFermiRadius / aspectRatio;
    const ellipticRadiusSq = Math.pow(x / rx, 2) + Math.pow(y / ry, 2);
    if (ellipticRadiusSq < 1.0) {
      condensateDensity = condensateFraction * (1.0 - ellipticRadiusSq);
    }
  }

  // Thermal cloud profile (Broad thermal Gaussian wings)
  const thermalFraction = 1.0 - condensateFraction;
  // Thermal cloud expands with temperature: sigma ~ sqrt(T)
  const thermalWidth = Math.max(0.4, 0.6 * Math.sqrt(Math.max(0.2, temperatureRatio)));
  const thermalRadiusSq = Math.pow(x, 2) + Math.pow(y * aspectRatio, 2);
  const thermalGaussian = Math.exp(-thermalRadiusSq / (2 * Math.pow(thermalWidth, 2)));
  const thermalDensity = thermalFraction * thermalGaussian * 0.45;

  const totalDensity = Math.max(0, condensateDensity + thermalDensity + noisePerturbation * 0.03);

  return {
    totalDensity,
    condensateDensity,
    thermalDensity,
  };
}

/**
 * Computes quantum phase coherence between two points r1 and r2.
 * In a true condensate, off-diagonal long-range order (ODLRO) means coherence stays high across the condensate.
 * In a thermal gas, coherence decays exponentially with thermal de Broglie wavelength.
 */
export function calculatePhaseCoherence(
  distance: number,
  temperatureRatio: number,
  condensateFraction: number
): number {
  if (distance <= 0) return 1.0;
  const thermalDecayLength = Math.max(0.05, 0.4 / Math.sqrt(Math.max(0.1, temperatureRatio)));
  const thermalCoherence = Math.exp(-distance / thermalDecayLength);
  // Total coherence is weighted by condensate fraction
  return Math.min(1.0, condensateFraction + (1.0 - condensateFraction) * thermalCoherence);
}

/**
 * Full summary metrics of the BEC state for UI displays
 */
export function getBECSummaryMetrics(params: BECParameters): BECMetrics {
  const fraction = calculateCondensateFraction(params.temperatureRatio);
  const n0 = Math.round(params.atomCount * fraction);
  const nth = params.atomCount - n0;
  const healingLength = calculateHealingLength(fraction, params.atomCount);
  const mu = calculateChemicalPotential(params.atomCount, fraction);

  // Critical temperature Tc ~ 200 nK for typical 87Rb trap
  const tcNanoKelvin = 220;

  return {
    condensateFraction: fraction,
    condensateAtomCount: n0,
    thermalAtomCount: nth,
    criticalTemperatureEstimateNK: tcNanoKelvin,
    healingLengthMicrons: +(healingLength * 3.5).toFixed(2),
    chemicalPotentialKHz: mu,
    isCondensed: fraction > 0.05,
  };
}
