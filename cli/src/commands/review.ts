import { Command } from 'commander';
import chalk from 'chalk';
import ora, { Ora } from 'ora';
import * as fs from 'fs-extra';
import * as path from 'path';
import {
  ReviewOptions,
  ReviewOutput,
  ReviewMode,
  ArtifactType,
  VerdictEmoji,
  ScoreBand
} from '../types';
import { FileProcessor } from '../utils/fileProcessor';
import { ReviewEngine } from '../utils/reviewEngine';
import { OutputFormatter } from '../utils/outputFormatter';
import { FeedbackManager } from '../utils/feedbackManager';

export async function reviewCommand(file: string, options: any) {
  const filePath = path.resolve(file);

  // Check if file exists
  if (!await fs.pathExists(filePath)) {
    console.error(chalk.red(`Error: File not found: ${file}`));
    process.exit(1);
  }

  const reviewOptions: ReviewOptions = {
    mode: options.mode as ReviewMode || ReviewMode.DEFAULT,
    verbose: options.parent?.verbose || false,
    local_only: options.parent?.localOnly || false,
    no_trace: options.parent?.noTrace || false,
    focus_validator: options.focus,
    output_file: options.output
  };

  // Initialize spinner
  const spinner = ora('Reading file...').start();

  try {
    // Initialize feedback manager
    const feedbackManager = new FeedbackManager();
    await feedbackManager.initialize();

    // Generate review run ID
    const reviewRunId = feedbackManager.generateReviewRunId();

    // Process file
    const fileProcessor = new FileProcessor();
    const artifact = await fileProcessor.processFile(filePath, spinner);

    // Update spinner
    spinner.text = `Analyzing ${artifact.type}...`;

    // Run review
    const reviewEngine = new ReviewEngine();
    const reviewOutput: ReviewOutput = await reviewEngine.review(artifact, reviewOptions);

    // Add review run ID to metadata
    reviewOutput.metadata = {
      artifact_type: reviewOutput.metadata?.artifact_type || ArtifactType.UNKNOWN,
      classification_confidence: reviewOutput.metadata?.classification_confidence || 'high',
      review_mode: reviewOutput.metadata?.review_mode || ReviewMode.DEFAULT,
      duration_seconds: reviewOutput.metadata?.duration_seconds || 0,
      timestamp: reviewOutput.metadata?.timestamp || new Date().toISOString(),
      review_run_id: reviewRunId
    };

    // Save review trace
    const tracesDir = feedbackManager.getConfig().tracesDir;
    const tracePath = path.join(tracesDir, `${path.basename(filePath, path.extname(filePath))}.json`);
    await fs.writeJSON(tracePath, reviewOutput, { spaces: 2 });

    // Format and output
    spinner.stop();
    const formatter = new OutputFormatter();

    if (reviewOptions.output_file) {
      await formatter.writeToFile(reviewOutput, reviewOptions.mode, reviewOptions.output_file);
      console.log(chalk.green(`Review written to: ${reviewOptions.output_file}`));
    } else {
      const output = formatter.format(reviewOutput, reviewOptions.mode);
      console.log(output);

      // Show feedback hint for default mode
      if (reviewOptions.mode === ReviewMode.DEFAULT && reviewOutput.findings.length > 0) {
        console.log('');
        console.log(chalk.gray('Was this review incorrect or unhelpful?'));
        console.log(chalk.dim('Report feedback:'));
        console.log(chalk.dim(`  shokunin feedback ${file} --finding <id> --type false_positive`));
        console.log(chalk.dim(`  shokunin feedback ${file} --score --type too_high`));
        console.log(chalk.dim(`  shokunin feedback ${file} --type missed_issue`));
        console.log(chalk.dim(`  shokunin correct ${file}`));
      }
    }

    // Exit with appropriate code
    const exitCode = getExitCode(reviewOutput.verdict.band);
    process.exit(exitCode);

  } catch (error) {
    spinner.stop();
    console.error(chalk.red('Error during review:'), error);
    process.exit(1);
  }
}

function getExitCode(band: ScoreBand): number {
  switch (band) {
    case ScoreBand.REVIEW_READY:
      return 0;
    case ScoreBand.READY_WITH_MINOR_FIXES:
      return 0;
    case ScoreBand.NEEDS_MAJOR_FIXES:
      return 1;
    case ScoreBand.NEEDS_REVISION:
      return 2;
    case ScoreBand.NOT_REVIEW_READY:
      return 3;
    case ScoreBand.UNSUPPORTED:
      return 4;
    default:
      return 1;
  }
}