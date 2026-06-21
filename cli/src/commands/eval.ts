import chalk from 'chalk';
import ora from 'ora';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as yaml from 'yaml';
import { EvalConfig, EvalResult } from '../types';
import { FileProcessor } from '../utils/fileProcessor';
import { ReviewEngine } from '../utils/reviewEngine';
import { EvalRunner } from '../utils/evalRunner';

export async function evalCommand(options: any) {
  const spinner = ora('Loading eval configurations...').start();

  try {
    const evalRunner = new EvalRunner();
    const results = await evalRunner.runEvals({
      filter: options.filter,
      verbose: options.verbose,
      updateGolden: options.golden,
      strict: options.strict,
      report: options.report,
      trace: options.trace !== false,
      repeat: parseInt(options.repeat) || 1
    });

    spinner.stop();

    // Display results
    displayResults(results, options.verbose);

    // Exit with appropriate code
    const allPassed = results.every(r => r.passed);
    process.exit(allPassed ? 0 : 1);

  } catch (error) {
    spinner.stop();
    console.error(chalk.red('Error during eval:'), error);
    process.exit(1);
  }
}

function displayResults(results: EvalResult[], verbose: boolean = false) {
  const passed = results.filter(r => r.passed).length;
  const total = results.length;

  console.log(chalk.bold(`\nEval Results: ${passed}/${total} passed`));

  if (passed === total) {
    console.log(chalk.green('All evals passed! ✅'));
  } else {
    console.log(chalk.red(`${total - passed} evals failed ❌`));
  }

  // Show failed evals
  const failed = results.filter(r => !r.passed);
  if (failed.length > 0) {
    console.log(chalk.bold('\nFailed Evals:'));
    failed.forEach(result => {
      console.log(chalk.red(`  ${result.eval_id}`));
      console.log(chalk.gray(`    Expected: ${result.expected_band}`));
      console.log(chalk.gray(`    Actual: ${result.actual_score} (${result.actual_band})`));

      if (verbose && result.fail_reasons) {
        console.log(chalk.gray(`    Reasons: ${result.fail_reasons.join(', ')}`));
      }

      if (verbose && result.metrics) {
        console.log(chalk.gray(`    Critical Recall: ${((result.metrics.critical_recall || 0) * 100).toFixed(0)}%`));
        console.log(chalk.gray(`    Finding Recall: ${((result.metrics.finding_recall || 0) * 100).toFixed(0)}%`));
        console.log(chalk.gray(`    Hallucination Rate: ${((result.metrics.hallucination_rate || 0) * 100).toFixed(0)}%`));
        console.log(chalk.gray(`    Score Calibration: ${result.score_calibration_label || 'unknown'}`));
      }
    });
  }

  // Show metrics summary
  if (verbose && results.length > 0) {
    const avgCriticalRecall = results.reduce((sum, r) => sum + (r.metrics?.critical_recall || 0), 0) / results.length;
    const avgFindingRecall = results.reduce((sum, r) => sum + (r.metrics?.finding_recall || 0), 0) / results.length;
    const avgHallucinationRate = results.reduce((sum, r) => sum + (r.metrics?.hallucination_rate || 0), 0) / results.length;
    const avgScoreCalibrationError = results.reduce((sum, r) => sum + (r.metrics?.score_calibration_error || 0), 0) / results.length;

    console.log(chalk.bold('\nMetrics Summary:'));
    console.log(chalk.gray(`  Avg Critical Recall: ${(avgCriticalRecall * 100).toFixed(1)}%`));
    console.log(chalk.gray(`  Avg Finding Recall: ${(avgFindingRecall * 100).toFixed(1)}%`));
    console.log(chalk.gray(`  Avg Hallucination Rate: ${(avgHallucinationRate * 100).toFixed(1)}%`));
    console.log(chalk.gray(`  Avg Score Calibration Error: ${avgScoreCalibrationError.toFixed(1)}`));
  }

  // Show timing
  const totalTime = results.reduce((sum, r) => sum + r.duration_ms, 0);
  console.log(chalk.gray(`\nTotal time: ${totalTime}ms`));
}