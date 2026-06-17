/**
 * Tests for feedback system
 */

import { FeedbackManager } from '../../utils/feedbackManager';
import { ReviewFeedback, FeedbackType, FeedbackTarget } from '../../types/feedback';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';

describe('FeedbackManager', () => {
  let feedbackManager: FeedbackManager;
  let tempDir: string;

  beforeEach(() => {
    // Create temporary directory for tests
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'shokunin-test-'));
    feedbackManager = new FeedbackManager(tempDir);
  });

  afterEach(async () => {
    // Clean up temp directory
    await fs.remove(tempDir);
  });

  describe('initialize', () => {
    it('should create feedback directories', async () => {
      await feedbackManager.initialize();

      const feedbackDir = path.join(tempDir, '.shokunin', 'feedback');
      const evalDir = path.join(tempDir, '.shokunin', 'eval-candidates');
      const tracesDir = path.join(tempDir, '.shokunin', 'traces');

      expect(await fs.pathExists(feedbackDir)).toBe(true);
      expect(await fs.pathExists(evalDir)).toBe(true);
      expect(await fs.pathExists(tracesDir)).toBe(true);
    });
  });

  describe('saveFeedback', () => {
    it('should save feedback to JSONL file', async () => {
      const feedback: ReviewFeedback = {
        id: 'fb_test_001',
        timestamp: '2026-06-17T00:00:00.000Z',
        documentPath: '/path/to/doc.md',
        targetType: 'finding',
        targetId: 'F-001',
        feedbackType: 'false_positive',
        userReason: 'Information already exists',
        status: 'new'
      };

      await feedbackManager.saveFeedback(feedback);

      const logPath = path.join(tempDir, '.shokunin', 'feedback', 'feedback-log.jsonl');
      const content = await fs.readFile(logPath, 'utf-8');
      const lines = content.trim().split('\n');

      expect(lines.length).toBe(1);
      const saved = JSON.parse(lines[0]);
      expect(saved.id).toBe('fb_test_001');
      expect(saved.feedbackType).toBe('false_positive');
    });

    it('should append multiple feedback entries', async () => {
      const feedback1: ReviewFeedback = {
        id: 'fb_test_001',
        timestamp: '2026-06-17T00:00:00.000Z',
        documentPath: '/path/to/doc1.md',
        targetType: 'finding',
        targetId: 'F-001',
        feedbackType: 'false_positive',
        status: 'new'
      };

      const feedback2: ReviewFeedback = {
        id: 'fb_test_002',
        timestamp: '2026-06-17T00:01:00.000Z',
        documentPath: '/path/to/doc2.md',
        targetType: 'score',
        feedbackType: 'score_too_high',
        status: 'new'
      };

      await feedbackManager.saveFeedback(feedback1);
      await feedbackManager.saveFeedback(feedback2);

      const logPath = path.join(tempDir, '.shokunin', 'feedback', 'feedback-log.jsonl');
      const content = await fs.readFile(logPath, 'utf-8');
      const lines = content.trim().split('\n');

      expect(lines.length).toBe(2);
    });
  });

  describe('loadFeedback', () => {
    it('should load feedback from JSONL file', async () => {
      const feedback: ReviewFeedback = {
        id: 'fb_test_001',
        timestamp: '2026-06-17T00:00:00.000Z',
        documentPath: '/path/to/doc.md',
        targetType: 'finding',
        targetId: 'F-001',
        feedbackType: 'false_positive',
        status: 'new'
      };

      await feedbackManager.saveFeedback(feedback);
      const loaded = await feedbackManager.loadFeedback();

      expect(loaded.length).toBe(1);
      expect(loaded[0].id).toBe('fb_test_001');
    });

    it('should return empty array if no feedback exists', async () => {
      const loaded = await feedbackManager.loadFeedback();
      expect(loaded).toEqual([]);
    });
  });

  describe('createEvalCandidate', () => {
    it('should create eval candidate from feedback', async () => {
      const feedback: ReviewFeedback = {
        id: 'fb_test_001',
        timestamp: '2026-06-17T00:00:00.000Z',
        documentPath: '/path/to/doc.md',
        targetType: 'finding',
        targetId: 'F-002',
        feedbackType: 'false_positive',
        userReason: 'Guardrails already present',
        userCorrection: 'See section 7.3',
        status: 'new'
      };

      const candidate = await feedbackManager.createEvalCandidate(feedback);

      expect(candidate.sourceFeedbackId).toBe('fb_test_001');
      expect(candidate.type).toBe('finding_false_positive');
      expect(candidate.documentPath).toBe('/path/to/doc.md');
      expect(candidate.candidateEvalStatus).toBe('new');
      expect(candidate.expectedBehavior).toContain('Guardrails already present');
    });
  });

  describe('getSummary', () => {
    it('should generate feedback summary', async () => {
      const feedback1: ReviewFeedback = {
        id: 'fb_test_001',
        timestamp: '2026-06-17T00:00:00.000Z',
        documentPath: '/path/to/doc.md',
        targetType: 'finding',
        targetId: 'F-001',
        feedbackType: 'false_positive',
        status: 'new'
      };

      const feedback2: ReviewFeedback = {
        id: 'fb_test_002',
        timestamp: '2026-06-17T00:01:00.000Z',
        documentPath: '/path/to/doc.md',
        targetType: 'score',
        feedbackType: 'score_too_high',
        status: 'new'
      };

      await feedbackManager.saveFeedback(feedback1);
      await feedbackManager.saveFeedback(feedback2);

      const summary = await feedbackManager.getSummary();

      expect(summary.total).toBe(2);
      expect(summary.byType['false_positive']).toBe(1);
      expect(summary.byType['score_too_high']).toBe(1);
      expect(summary.byTarget['finding']).toBe(1);
      expect(summary.byTarget['score']).toBe(1);
    });

    it('should generate recommendations for repeated feedback', async () => {
      // Create 3 false positive feedback events
      for (let i = 0; i < 3; i++) {
        const feedback: ReviewFeedback = {
          id: `fb_test_${i}`,
          timestamp: '2026-06-17T00:00:00.000Z',
          documentPath: '/path/to/doc.md',
          targetType: 'finding',
          feedbackType: 'false_positive',
          status: 'new'
        };
        await feedbackManager.saveFeedback(feedback);
      }

      const summary = await feedbackManager.getSummary();

      expect(summary.recommendedImprovements).toContain(
        'Review validator precision - multiple false positives reported'
      );
    });
  });

  describe('generateFeedbackId', () => {
    it('should generate unique feedback IDs', () => {
      const id1 = feedbackManager.generateFeedbackId();
      const id2 = feedbackManager.generateFeedbackId();

      expect(id1).not.toBe(id2);
      expect(id1).toMatch(/^fb_/);
    });
  });

  describe('generateReviewRunId', () => {
    it('should generate unique review run IDs', () => {
      const id1 = feedbackManager.generateReviewRunId();
      const id2 = feedbackManager.generateReviewRunId();

      expect(id1).not.toBe(id2);
      expect(id1).toMatch(/^rev_/);
    });
  });
});

describe('Feedback Types', () => {
  it('should support all required feedback types', () => {
    const types: FeedbackType[] = [
      'false_positive',
      'false_negative',
      'missed_issue',
      'severity_too_high',
      'severity_too_low',
      'score_too_high',
      'score_too_low',
      'not_actionable',
      'too_generic',
      'too_long',
      'overengineered',
      'wrong_document_type',
      'wrong_audience',
      'wrong_validator',
      'hallucination',
      'unsupported_claim',
      'other'
    ];

    expect(types.length).toBe(17);
  });

  it('should support all required target types', () => {
    const targets: FeedbackTarget[] = [
      'finding',
      'score',
      'verdict',
      'recommendation',
      'validator_selection',
      'document_detection',
      'missed_issue',
      'overall_output'
    ];

    expect(targets.length).toBe(8);
  });
});
