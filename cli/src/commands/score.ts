import chalk from 'chalk';
import ora from 'ora';
import * as fs from 'fs-extra';
import * as path from 'path';
import { FileProcessor } from '../utils/fileProcessor';
import { ReviewEngine } from '../utils/reviewEngine';

export async function scoreCommand(file: string, options: any) {
  const filePath = path.resolve(file);

  if (!await fs.pathExists(filePath)) {
    console.error(chalk.red(`Error: File not found: ${file}`));
    process.exit(1);
  }

  const spinner = ora('Analyzing document...').start();

  try {
    const fileProcessor = new FileProcessor();
    const artifact = await fileProcessor.processFile(filePath, spinner);

    const reviewEngine = new ReviewEngine();
    const review = await reviewEngine.review(artifact, { mode: 'full' as any });

    spinner.stop();

    if (options.json) {
      console.log(JSON.stringify(review.score, null, 2));
    } else {
      console.log(chalk.bold(`Score: ${review.score.total}/100`));
      console.log(chalk.gray(`Confidence: ${review.score.confidence}`));

      if (options.verbose && review.score.dimension_breakdown) {
        console.log(chalk.bold('\\nDimension Breakdown:'));
        for (const [dimension, score] of Object.entries(review.score.dimension_breakdown)) {
          console.log(`  ${dimension}: ${score}/100`);
        }
      }

      if (review.score.score_caps_applied && review.score.score_caps_applied.length > 0) {
        console.log(chalk.bold('\\nScore Caps Applied:'));
        review.score.score_caps_applied.forEach(cap => {
          console.log(`  ${cap.cap}: max ${cap.max_score}`);
        });
      }
    }

    process.exit(0);
  } catch (error) {
    spinner.stop();
    console.error(chalk.red('Error during score analysis:'), error);
    process.exit(1);
  }
}