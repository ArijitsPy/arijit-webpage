import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCondensateFraction,
  calculateThomasFermiRadius,
  calculateHealingLength,
  calculateSpatialDensity,
  calculatePhaseCoherence,
  getBECSummaryMetrics,
} from './becPhysics';

test('calculateCondensateFraction returns 1.0 at absolute zero', () => {
  assert.equal(calculateCondensateFraction(0), 1.0);
});

test('calculateCondensateFraction returns 0.0 at or above critical temperature Tc', () => {
  assert.equal(calculateCondensateFraction(1.0), 0.0);
  assert.equal(calculateCondensateFraction(1.5), 0.0);
});

test('calculateCondensateFraction follows 1 - (T/Tc)^3 cubic law below Tc', () => {
  // At T = 0.5 Tc, fraction should be 1 - 0.125 = 0.875
  const fractionAtHalfTc = calculateCondensateFraction(0.5);
  assert.equal(fractionAtHalfTc, 0.875);
});

test('calculateThomasFermiRadius scales appropriately with atom count', () => {
  const r1 = calculateThomasFermiRadius(10000);
  const r2 = calculateThomasFermiRadius(100000);
  assert.ok(r2 > r1, 'Higher atom count gives larger Thomas-Fermi radius');
  assert.ok(r1 >= 0.15 && r2 <= 0.85, 'Radius stays within boundary coordinates');
});

test('calculateHealingLength decreases as condensate density grows', () => {
  const xiDilute = calculateHealingLength(0.1, 50000);
  const xiDense = calculateHealingLength(0.9, 100000);
  assert.ok(xiDense < xiDilute, 'Dense condensate has shorter healing length');
});

test('calculateSpatialDensity computes bimodal density profile accurately', () => {
  // Deep in condensate regime
  const centerDensity = calculateSpatialDensity(0, 0, {
    temperatureRatio: 0.2,
    condensateFraction: 0.992,
    thomasFermiRadius: 0.6,
    aspectRatio: 1.0,
  });

  const edgeDensity = calculateSpatialDensity(0.9, 0, {
    temperatureRatio: 0.2,
    condensateFraction: 0.992,
    thomasFermiRadius: 0.6,
    aspectRatio: 1.0,
  });

  assert.ok(centerDensity.condensateDensity > 0.9, 'Center should have high condensate density');
  assert.equal(edgeDensity.condensateDensity, 0, 'Outside TF radius, condensate density vanishes');
  assert.ok(centerDensity.totalDensity > edgeDensity.totalDensity, 'Density peaks at trap center');
});

test('calculatePhaseCoherence maintains long range order for BEC', () => {
  const longDistance = 0.8;
  const becCoherence = calculatePhaseCoherence(longDistance, 0.2, 0.95);
  const thermalCoherence = calculatePhaseCoherence(longDistance, 1.5, 0.0);

  assert.ok(becCoherence > 0.9, 'BEC preserves high off-diagonal phase coherence');
  assert.ok(thermalCoherence < 0.2, 'Thermal gas loses spatial phase coherence rapidly');
});

test('getBECSummaryMetrics returns coherent state summary', () => {
  const metrics = getBECSummaryMetrics({
    temperatureRatio: 0.4,
    atomCount: 150000,
    trapFrequencyHz: 120,
    aspectRatio: 1.0,
    dampingGamma: 0.03,
    interactionStrength: 1.0,
  });

  assert.equal(metrics.isCondensed, true);
  assert.equal(metrics.condensateAtomCount + metrics.thermalAtomCount, 150000);
  assert.ok(metrics.condensateFraction > 0.9);
  assert.ok(metrics.healingLengthMicrons > 0);
});
