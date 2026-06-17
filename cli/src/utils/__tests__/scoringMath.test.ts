/**
 * Tests for scoring trace math
 */

import { ReviewEngine } from '../../utils/reviewEngine';
import { Artifact, ArtifactType, ScoreCap } from '../../types';

describe('Scoring Trace Math', () => {
  let reviewEngine: ReviewEngine;

  beforeEach(() => {
    reviewEngine = new ReviewEngine();
  });

  describe('Penalty Calculation', () => {
    it('should display penalties as negative values', async () => {
      const artifact: Artifact = {
        type: ArtifactType.PRD,
        content: '# Test PRD\n\nProblem: Users need food.\n\nSolution: Use AI.',
        filePath: '/test.md',
        fileName: 'test.md',
        size: 100,
        lines: 5
      };

      const result = await reviewEngine.review(artifact, { mode: 'default' as any });

      // Verify penalties are negative
      if (result.trace!.blocker_penalties !== 0) {
        expect(result.trace!.blocker_penalties).toBeLessThan(0);
      }
      if (result.trace!.major_penalties !== 0) {
        expect(result.trace!.major_penalties).toBeLessThan(0);
      }
      if (result.trace!.minor_penalties !== 0) {
        expect(result.trace!.minor_penalties).toBeLessThan(0);
      }
    });

    it('should calculate subtotal as base minus penalties', async () => {
      const artifact: Artifact = {
        type: ArtifactType.PRD,
        content: '# Test PRD\n\nProblem: Users need food.\n\nSolution: Use AI.',
        filePath: '/test.md',
        fileName: 'test.md',
        size: 100,
        lines: 5
      };

      const result = await reviewEngine.review(artifact, { mode: 'default' as any });

      // Verify: subtotal = base + penalties (where penalties are negative)
      const base = result.trace!.weighted_base_score;
      const penalties = (result.trace!.blocker_penalties || 0) +
                      (result.trace!.major_penalties || 0) +
                      (result.trace!.minor_penalties || 0);
      const subtotal = result.trace!.subtotal_before_caps;

      expect(subtotal).toBe(base + penalties);
      expect(subtotal).toBeLessThanOrEqual(base);
    });
  });

  describe('Base Scoring Quality', () => {
    it('should not give weak PRD a base score above 70', async () => {
      const weakPRD: Artifact = {
        type: ArtifactType.PRD,
        content: `# AI Food Agent

## Problem
Food delivery users struggle to find healthy options.

## Solution
We'll build an AI agent that recommends food.

## Success Metrics
- User engagement will increase
- User satisfaction will improve
- Order frequency will grow

## Requirements
- Accept queries
- Learn preferences
- Recommend restaurants

## MVP
Phase 1 will include basic recommendation.

## Decision
Please approve moving to development.`,
        filePath: '/weak.md',
        fileName: 'weak.md',
        size: 500,
        lines: 30
      };

      const result = await reviewEngine.review(weakPRD, { mode: 'default' as any });

      // Weak PRD should not have base score above 70
      // It lacks specificity, evidence, clear metrics, etc.
      expect(result.trace!.weighted_base_score).toBeLessThanOrEqual(70);
    });

    it('should evaluate content quality, not just section presence', async () => {
      const weakPRD: Artifact = {
        type: ArtifactType.PRD,
        content: `# AI Food Agent

## Problem
Users have issues with food.

## Success Metrics
Engagement will increase. Satisfaction will improve.

## Requirements
- AI features
- Machine learning
- Natural language processing
- User preferences
- Restaurant data
- Payment integration
- Order tracking

## MVP
We will launch with core features.

## Decision
Please approve this project.`,
        filePath: '/weak.md',
        fileName: 'weak.md',
        size: 800,
        lines: 60
      };

      const result = await reviewEngine.review(weakPRD, { mode: 'default' as any });

      // Despite having many sections, the base score should be low
      // because the content is vague and lacks specificity
      expect(result.trace!.weighted_base_score).toBeLessThanOrEqual(65);
    });
  });

  describe('Clamping', () => {
    it('should clamp subtotal to 0-100 range before applying caps', async () => {
      const artifact: Artifact = {
        type: ArtifactType.PRD,
        content: '# Test\n\nVery weak content.',
        filePath: '/test.md',
        fileName: 'test.md',
        size: 50,
        lines: 3
      };

      const result = await reviewEngine.review(artifact, { mode: 'default' as any });

      // Subtotal before caps should be in 0-100 range
      expect(result.trace!.subtotal_before_caps).toBeGreaterThanOrEqual(0);
      expect(result.trace!.subtotal_before_caps).toBeLessThanOrEqual(100);

      // Final score should also be in 0-100 range
      expect(result.score.total).toBeGreaterThanOrEqual(0);
      expect(result.score.total).toBeLessThanOrEqual(100);
    });
  });

  describe('Score Cap Application', () => {
    it('should apply score caps correctly', async () => {
      const artifact: Artifact = {
        type: ArtifactType.PRD,
        content: '# Test PRD\n\nMetrics: Will improve.',
        filePath: '/test.md',
        fileName: 'test.md',
        size: 100,
        lines: 5
      };

      const result = await reviewEngine.review(artifact, { mode: 'default' as any });

      // If score caps are applied, final score should not exceed the strictest cap
      if (result.trace!.score_caps && result.trace!.score_caps.length > 0) {
        const strictestCap = Math.min(...result.trace!.score_caps!.map((cap: ScoreCap) => cap.max_score));
        expect(result.score.total).toBeLessThanOrEqual(strictestCap);
      }
    });
  });

  describe('Trace Math Verification', () => {
    it('should show all trace components', async () => {
      const artifact: Artifact = {
        type: ArtifactType.PRD,
        content: '# Test\n\nContent here.',
        filePath: '/test.md',
        fileName: 'test.md',
        size: 100,
        lines: 5
      };

      const result = await reviewEngine.review(artifact, { mode: 'default' as any });

      // Verify all trace components exist
      expect(result.trace).toBeDefined();
      expect(result.trace!.weighted_base_score).toBeDefined();
      expect(result.trace!.blocker_penalties).toBeDefined();
      expect(result.trace!.major_penalties).toBeDefined();
      expect(result.trace!.minor_penalties).toBeDefined();
      expect(result.trace!.subtotal_before_caps).toBeDefined();
      expect(result.trace!.final_score).toBeDefined();
    });

    it('should have final score in valid range', async () => {
      const artifact: Artifact = {
        type: ArtifactType.PRD,
        content: '# Test PRD\n\nContent.',
        filePath: '/test.md',
        fileName: 'test.md',
        size: 100,
        lines: 5
      };

      const result = await reviewEngine.review(artifact, { mode: 'default' as any });

      expect(result.score.total).toBeGreaterThanOrEqual(0);
      expect(result.score.total).toBeLessThanOrEqual(100);
    });
  });
});