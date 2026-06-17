#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { reviewCommand } from './commands/review';
import { improveCommand } from './commands/improve';
import { rerunCommand } from './commands/rerun';
import { scoreCommand } from './commands/score';
import { evalCommand } from './commands/eval';
import { feedbackCommand, correctCommand, feedbackSummaryCommand } from './commands/feedback';

const program = new Command();

// CLI version and description
program
  .name('shokunin')
  .description('Terminal-first review readiness tool for product documents')
  .version('0.1.0');

// Global options
program
  .option('--verbose', 'enable verbose output')
  .option('--local-only', 'run without external API calls')
  .option('--no-trace', 'disable execution tracing');

// Review command
program
  .command('review <file>')
  .description('Review a document for readiness')
  .option('-m, --mode <mode>', 'output mode (default|full|json|markdown|quiet)', 'default')
  .option('-o, --output <file>', 'write output to file')
  .option('-f, --focus <validator>', 'focus on specific validator')
  .action(reviewCommand);

// Improve command
program
  .command('improve <file>')
  .description('Suggest improvements for a document')
  .option('-f, --focus <area>', 'focus on specific area (evidence|metrics|scope|all)', 'all')
  .option('-o, --output <file>', 'write improved version to file')
  .action(improveCommand);

// Rerun command
program
  .command('rerun <file>')
  .description('Re-review a document and compare with original')
  .option('-c, --compare <original>', 'compare with original file')
  .option('-m, --mode <mode>', 'output mode (default|full|json|markdown)', 'default')
  .option('-o, --output <file>', 'write output to file')
  .action(rerunCommand);

// Score command
program
  .command('score <file>')
  .description('Show detailed score breakdown for a document')
  .option('-v, --verbose', 'show detailed dimension breakdown')
  .option('-j, --json', 'output score as JSON')
  .action(scoreCommand);

// Eval command
program
  .command('eval')
  .description('Run evaluation harness')
  .option('--filter <pattern>', 'filter evals by pattern')
  .option('--verbose', 'show detailed eval output')
  .option('--golden', 'update golden outputs')
  .action(evalCommand);

// Feedback command
program
  .command('feedback <file>')
  .description('Report incorrect or unhelpful review results')
  .option('-f, --finding <id>', 'report issue with specific finding')
  .option('-s, --score', 'report issue with score')
  .option('-t, --type <type>', 'feedback type (false_positive|missed_issue|score_too_high|score_too_low|not_useful)')
  .action(feedbackCommand);

// Correct command
program
  .command('correct <file>')
  .description('Enter interactive correction mode')
  .action(correctCommand);

// Feedback summary command
program
  .command('feedback-summary')
  .description('Show feedback statistics and recommendations')
  .action(feedbackSummaryCommand);

// Parse and execute
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}