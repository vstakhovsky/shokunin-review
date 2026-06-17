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
      updateGolden: options.golden
    });

    spinner.stop();

    // Display results
    displayResults(results);

    // Exit with appropriate code
    const allPassed = results.every(r => r.passed);
    process.exit(allPassed ? 0 : 1);

  } catch (error) {
    spinner.stop();
    console.error(chalk.red('Error during eval:'), error);
    process.exit(1);
  }
}

function displayResults(results: EvalResult[]) {
  const passed = results.filter(r => r.passed).length;
  const total = results.length;

  console.log(chalk.bold(`\\nEval Results: ${passed}/${total} passed`));

  if (passed === total) {
    console.log(chalk.green('All evals passed! ✅'));
  } else {
    console.log(chalk.red(`${total - passed} evals failed ❌`));
  }

  // Show failed evals
  const failed = results.filter(r => !r.passed);
  if (failed.length > 0) {
    console.log(chalk.bold('\\nFailed Evals:'));
    failed.forEach(result => {
      console.log(chalk.red(`  ${result.eval_id}`));
      console.log(chalk.gray(`    Expected: ${result.expected_band} (${result.expected_band})`));
      console.log(chalk.gray(`    Actual: ${result.actual_band} (${result.actual_band})`));
    });
  }

  // Show timing
  const totalTime = results.reduce((sum, r) => sum + r.duration_ms, 0);
  console.log(chalk.gray(`\\nTotal time: ${totalTime}ms`));
}