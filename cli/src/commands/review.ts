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
    // Process file
    const fileProcessor = new FileProcessor();
    const artifact = await fileProcessor.processFile(filePath, spinner);

    // Update spinner
    spinner.text = `Analyzing ${artifact.type}...`;

    // Run review
    const reviewEngine = new ReviewEngine();
    const reviewOutput: ReviewOutput = await reviewEngine.review(artifact, reviewOptions);

    // Format and output
    spinner.stop();
    const formatter = new OutputFormatter();

    if (reviewOptions.output_file) {
      await formatter.writeToFile(reviewOutput, reviewOptions.mode, reviewOptions.output_file);
      console.log(chalk.green(`Review written to: ${reviewOptions.output_file}`));
    } else {
      const output = formatter.format(reviewOutput, reviewOptions.mode);
      console.log(output);
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