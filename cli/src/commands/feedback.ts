import { ReviewOutput } from '../types';
import { FeedbackManager } from '../utils/feedbackManager';
import { FeedbackType, FeedbackTarget, ReviewFeedback, FeedbackMenuOptions } from '../types/feedback';
import * as fs from 'fs-extra';
import * as path from 'path';
import readline from 'readline';

/**
 * Feedback menu options for different scenarios
 */
const MENU_OPTIONS: FeedbackMenuOptions = {
  false_positive: [
    'The document already contains this information',
    'The finding misunderstood the context',
    'The finding is not relevant to this document type',
    'The severity is too high',
    'The recommendation is not useful',
    'Other'
  ],
  false_negative: [
    'Missing metric',
    'Missing evidence',
    'Missing decision',
    'Missing risk',
    'Missing technical constraint',
    'Missing privacy/security issue',
    'Missing simpler alternative',
    'Other'
  ],
  missed_issue: [
    'Missing metric',
    'Missing evidence',
    'Missing decision',
    'Missing risk',
    'Missing technical constraint',
    'Missing privacy/security issue',
    'Missing simpler alternative',
    'Other'
  ],
  score_wrong: [
    'Score ignores important blockers',
    'Score over-penalizes minor issues',
    'Score cap is too strict',
    'Score cap is too soft',
    'Strong document was scored too low',
    'Weak document was scored too high',
    'Other'
  ],
  not_useful: [
    'Too generic',
    'Too long',
    'Too many findings',
    'Not actionable',
    'Wrong framework recommended',
    'Too much overengineering',
    'Other'
  ],
  severity_wrong: [
    'Should be blocker instead of major',
    'Should be major instead of blocker',
    'Should be minor instead of major',
    'Should be nit instead of minor',
    'Other'
  ]
};

/**
 * Feedback CLI command handler
 */
export class FeedbackCommand {
  private feedbackManager: FeedbackManager;
  private rl: readline.Interface;

  constructor() {
    this.feedbackManager = new FeedbackManager();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  /**
   * Handle feedback command
   */
  async handle(args: {
    file: string;
    finding?: string;
    score?: boolean;
    type?: string;
  }): Promise<void> {
    const { file, finding, score, type } = args;

    if (score) {
      await this.collectScoreFeedback(file, type as FeedbackType);
    } else if (finding) {
      await this.collectFindingFeedback(file, finding, type as FeedbackType);
    } else if (type) {
      await this.collectGeneralFeedback(file, type as FeedbackType);
    } else {
      await this.startInteractiveMode(file);
    }

    this.rl.close();
  }

  /**
   * Collect feedback for a specific finding
   */
  private async collectFindingFeedback(
    filePath: string,
    findingId: string,
    feedbackType?: FeedbackType
  ): Promise<void> {
    console.log(`\n📝 Feedback for finding: ${findingId}\n`);

    const type = feedbackType || await this.promptForFeedbackType([
      'false_positive',
      'severity_too_high',
      'severity_too_low',
      'not_actionable',
      'other'
    ]);

    const reason = await this.promptForReason(type);

    const correction = await this.promptForCorrection();

    const feedback: ReviewFeedback = {
      id: this.feedbackManager.generateFeedbackId(),
      timestamp: new Date().toISOString(),
      documentPath: filePath,
      documentHash: await this.feedbackManager.calculateDocumentHash(filePath),
      targetType: 'finding',
      targetId: findingId,
      feedbackType: type,
      userReason: reason,
      userCorrection: correction,
      status: 'new'
    };

    await this.saveFeedbackAndCreateCandidate(feedback);
  }

  /**
   * Collect feedback for score
   */
  private async collectScoreFeedback(
    filePath: string,
    feedbackType?: FeedbackType
  ): Promise<void> {
    console.log('\n📊 Score Feedback\n');

    const type = feedbackType ||
      (await this.selectFromOptions('Is the score too high or too low?', [
        { key: '1', label: 'Too high', value: 'score_too_high' },
        { key: '2', label: 'Too low', value: 'score_too_low' }
      ])) as FeedbackType;

    const reason = await this.promptForReason(type);

    const correction = await this.promptForCorrection();

    // Try to load recent review to get current score
    let originalValue: number | undefined;
    try {
      const reviewPath = this.getLastReviewPath(filePath);
      if (reviewPath && await fs.pathExists(reviewPath)) {
        const review = await fs.readJSON(reviewPath) as ReviewOutput;
        originalValue = review.score.total;
      }
    } catch (e) {
      // Ignore if can't load review
    }

    const feedback: ReviewFeedback = {
      id: this.feedbackManager.generateFeedbackId(),
      timestamp: new Date().toISOString(),
      documentPath: filePath,
      documentHash: await this.feedbackManager.calculateDocumentHash(filePath),
      targetType: 'score',
      feedbackType: type,
      userReason: reason,
      userCorrection: correction,
      originalValue,
      status: 'new'
    };

    await this.saveFeedbackAndCreateCandidate(feedback);
  }

  /**
   * Collect general feedback
   */
  private async collectGeneralFeedback(
    filePath: string,
    feedbackType: FeedbackType
  ): Promise<void> {
    console.log(`\n📝 General Feedback: ${feedbackType}\n`);

    const reason = await this.promptForReason(feedbackType);
    const correction = await this.promptForCorrection();

    const feedback: ReviewFeedback = {
      id: this.feedbackManager.generateFeedbackId(),
      timestamp: new Date().toISOString(),
      documentPath: filePath,
      documentHash: await this.feedbackManager.calculateDocumentHash(filePath),
      targetType: 'overall_output',
      feedbackType,
      userReason: reason,
      userCorrection: correction,
      status: 'new'
    };

    await this.saveFeedbackAndCreateCandidate(feedback);
  }

  /**
   * Start interactive correction mode
   */
  private async startInteractiveMode(filePath: string): Promise<void> {
    console.log('\n🔵 Correction Mode\n');

    // Try to load last review
    let lastReview: ReviewOutput | null = null;
    try {
      const reviewPath = this.getLastReviewPath(filePath);
      if (reviewPath && await fs.pathExists(reviewPath)) {
        lastReview = await fs.readJSON(reviewPath) as ReviewOutput;
        if (lastReview) {
          this.displayReviewSummary(lastReview);
        }
      }
    } catch (e) {
      console.log('Could not load previous review.\n');
    }

    const action = await this.selectFromOptions('What do you want to correct?', [
      { key: '1', label: 'A specific finding', value: 'finding' },
      { key: '2', label: 'The final score', value: 'score' },
      { key: '3', label: 'The verdict', value: 'verdict' },
      { key: '4', label: 'A recommendation', value: 'recommendation' },
      { key: '5', label: 'A missed issue', value: 'missed_issue' },
      { key: '6', label: 'Overall usefulness', value: 'overall' },
      { key: '7', label: 'Exit', value: 'exit' }
    ]);

    if (action === 'exit') {
      console.log('\nExiting correction mode.');
      return;
    }

    if (action === 'finding') {
      if (!lastReview || lastReview.findings.length === 0) {
        console.log('\nNo findings found in last review.');
        return;
      }

      const findingId = await this.selectFinding(lastReview.findings);
      await this.collectFindingFeedback(filePath, findingId);
    } else if (action === 'score') {
      await this.collectScoreFeedback(filePath);
    } else if (action === 'missed_issue') {
      await this.collectGeneralFeedback(filePath, 'missed_issue' as FeedbackType);
    } else if (action === 'overall') {
      await this.collectGeneralFeedback(filePath, 'too_generic' as FeedbackType);
    } else {
      await this.collectGeneralFeedback(filePath, 'other' as FeedbackType);
    }
  }

  /**
   * Display review summary
   */
  private displayReviewSummary(review: ReviewOutput): void {
    console.log(`\nLatest Review:`);
    console.log(`File: ${review.metadata?.artifact_type || 'Unknown'}`);
    console.log(`Score: ${review.score.total}/100`);
    console.log(`Verdict: ${review.verdict.emoji} ${review.verdict.text}`);
    console.log(`Findings: ${review.findings.length}\n`);

    if (review.findings.length > 0) {
      console.log('Findings:');
      review.findings.slice(0, 5).forEach((finding, i) => {
        console.log(`  F-${String(i + 1).padStart(3, '0')} ${this.getSeverityEmoji(finding.severity)} ${finding.issue}`);
      });
      console.log('');
    }
  }

  /**
   * Select a finding from list
   */
  private async selectFinding(findings: any[]): Promise<string> {
    console.log('\nSelect a finding to correct:\n');

    findings.forEach((finding, i) => {
      console.log(`${i + 1}. [${finding.tag}] ${finding.issue}`);
    });

    const answer = await this.prompt('Enter finding number: ');
    const index = parseInt(answer) - 1;

    if (index >= 0 && index < findings.length) {
      return `F-${String(index + 1).padStart(3, '0')}`;
    }

    throw new Error('Invalid finding number');
  }

  /**
   * Prompt for feedback type
   */
  private async promptForFeedbackType(types: FeedbackType[]): Promise<FeedbackType> {
    const type = await this.selectFromOptions(
      'What type of feedback is this?',
      types.map((t, i) => ({ key: String(i + 1), label: t, value: t }))
    );
    return type as FeedbackType;
  }

  /**
   * Prompt for reason from menu
   */
  private async promptForReason(feedbackType: FeedbackType): Promise<string> {
    const options = MENU_OPTIONS[feedbackType as keyof typeof MENU_OPTIONS];

    if (!options) {
      return await this.prompt('Please describe the issue: ');
    }

    console.log('\nWhy is this incorrect?\n');
    options.forEach((option, i) => {
      console.log(`${i + 1}. ${option}`);
    });

    const answer = await this.prompt('Select a reason (enter number): ');
    const index = parseInt(answer) - 1;

    if (index >= 0 && index < options.length) {
      return options[index];
    }

    return 'Other';
  }

  /**
   * Prompt for correction note
   */
  private async promptForCorrection(): Promise<string> {
    console.log('\nAdd a short correction note (optional, press Enter to skip):');
    return await this.prompt('> ');
  }

  /**
   * Select from options
   */
  private async selectFromOptions(
    question: string,
    options: Array<{ key: string; label: string; value: string }>
  ): Promise<string> {
    console.log(`\n${question}\n`);

    for (const option of options) {
      console.log(`${option.key}. ${option.label}`);
    }

    const answer = await this.prompt('Enter selection: ');

    const selected = options.find(opt => opt.key === answer || opt.value === answer);
    return selected?.value || answer;
  }

  /**
   * Prompt for input
   */
  private async prompt(question: string): Promise<string> {
    return new Promise(resolve => {
      this.rl.question(question, answer => {
        resolve(answer.trim());
      });
    });
  }

  /**
   * Save feedback and create eval candidate
   */
  private async saveFeedbackAndCreateCandidate(feedback: ReviewFeedback): Promise<void> {
    await this.feedbackManager.saveFeedback(feedback);

    console.log('\n✅ Feedback saved.');
    console.log(`   Finding/Issue: ${feedback.targetId || feedback.targetType}`);
    console.log(`   Type: ${feedback.feedbackType}`);
    console.log(`   Reason: ${feedback.userReason || 'Not specified'}`);

    if (feedback.userCorrection) {
      console.log(`   Correction: ${feedback.userCorrection}`);
    }

    // Create eval candidate
    const candidate = await this.feedbackManager.createEvalCandidate(feedback);
    console.log(`\n📋 Eval candidate created: ${candidate.id}`);

    console.log('\nNext actions:');
    console.log('   - Feedback added to log');
    console.log('   - Eval candidate created');
    console.log('   - Review with: shokunin feedback-summary');
    console.log('   - Re-review with: shokunin review <file>');
  }

  /**
   * Get path to last review for file
   */
  private getLastReviewPath(filePath: string): string | null {
    const tracesDir = this.feedbackManager.getConfig().tracesDir;
    const fileName = path.basename(filePath, path.extname(filePath));
    return path.join(tracesDir, `${fileName}.json`);
  }

  /**
   * Get severity emoji
   */
  private getSeverityEmoji(severity: string): string {
    switch (severity) {
      case 'blocker': return '🔴';
      case 'high': return '🟠';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  }
}

/**
 * Feedback command handler
 */
export async function feedbackCommand(args: {
  file: string;
  finding?: string;
  score?: boolean;
  type?: string;
}): Promise<void> {
  const command = new FeedbackCommand();
  await command.handle(args);
}

/**
 * Correct command handler
 */
export async function correctCommand(args: { file: string }): Promise<void> {
  const command = new FeedbackCommand();
  await command.handle({ file: args.file });
}

/**
 * Feedback summary command handler
 */
export async function feedbackSummaryCommand(): Promise<void> {
  await displayFeedbackSummary();
}

/**
 * Display feedback summary
 */
export async function displayFeedbackSummary(): Promise<void> {
  const feedbackManager = new FeedbackManager();
  const summary = await feedbackManager.getSummary();

  console.log('\n📊 Feedback Summary\n');
  console.log(`Total feedback events: ${summary.total}\n`);

  if (summary.total > 0) {
    console.log('By type:');
    Object.entries(summary.byType)
      .sort(([, a], [, b]) => b - a)
      .forEach(([type, count]) => {
        console.log(`  - ${type}: ${count}`);
      });

    console.log('\nBy target:');
    Object.entries(summary.byTarget)
      .sort(([, a], [, b]) => b - a)
      .forEach(([target, count]) => {
        console.log(`  - ${target}: ${count}`);
      });

    if (Object.keys(summary.byValidator).length > 0) {
      console.log('\nTop affected validators:');
      Object.entries(summary.byValidator)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .forEach(([validator, count]) => {
          console.log(`  - ${validator}: ${count}`);
        });
    }

    if (summary.recommendedImprovements.length > 0) {
      console.log('\nRecommended improvements:');
      summary.recommendedImprovements.forEach((improvement, i) => {
        console.log(`  ${i + 1}. ${improvement}`);
      });
    }

    console.log('\nRecent feedback:');
    summary.recentFeedback.slice(0, 5).forEach(feedback => {
      console.log(`  - ${feedback.timestamp.substring(0, 10)}: ${feedback.feedbackType} on ${feedback.targetType}${feedback.targetId ? ` (${feedback.targetId})` : ''}`);
    });
  } else {
    console.log('No feedback recorded yet.\n');
    console.log('To add feedback:');
    console.log('  shokunin feedback <file> --finding <id> --type false_positive');
    console.log('  shokunin feedback <file> --score --type too_high');
    console.log('  shokunin feedback <file> --type missed_issue');
    console.log('  shokunin correct <file>');
  }

  console.log('');
}
