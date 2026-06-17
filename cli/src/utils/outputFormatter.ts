import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import { ReviewOutput, ReviewMode, ScoreBand } from '../types';

export class OutputFormatter {
  /**
   * Format review output based on mode
   */
  format(review: ReviewOutput, mode: ReviewMode): string {
    switch (mode) {
      case ReviewMode.DEFAULT:
        return this.formatDefault(review);
      case ReviewMode.FULL:
        return this.formatFull(review);
      case ReviewMode.JSON:
        return this.formatJSON(review);
      case ReviewMode.MARKDOWN:
        return this.formatMarkdown(review);
      case ReviewMode.QUIET:
        return this.formatQuiet(review);
      default:
        return this.formatDefault(review);
    }
  }

  /**
   * Write output to file
   */
  async writeToFile(review: ReviewOutput, mode: ReviewMode, filePath: string): Promise<void> {
    const content = this.format(review, mode);
    await fs.writeFile(filePath, content, 'utf-8');
  }

  /**
   * Format default output (short, terminal-friendly)
   */
  private formatDefault(review: ReviewOutput): string {
    const lines: string[] = [];

    // Verdict line
    lines.push(`${review.verdict.emoji} ${review.verdict.text} — ${review.score.total}/100`);

    // Top blockers only
    const blockers = review.findings.filter(f => f.severity === 'blocker').slice(0, 3);
    if (blockers.length > 0) {
      lines.push('');
      lines.push(chalk.bold('Top Blockers:'));
      blockers.forEach((finding, i) => {
        lines.push(`${i + 1}. [${finding.tag}] ${finding.issue}`);
        if (finding.recommended_fix) {
          lines.push(chalk.gray(`   Fix: ${finding.recommended_fix}`));
        }
      });
    }

    // Score caps
    if (review.score.score_caps_applied && review.score.score_caps_applied.length > 0) {
      lines.push('');
      lines.push(chalk.bold('Score Caps Applied:'));
      review.score.score_caps_applied.forEach(cap => {
        lines.push(chalk.gray(`- ${cap.cap}: max ${cap.max_score}`));
      });
    }

    // Recommended action
    if (review.recommended_action) {
      lines.push('');
      lines.push(chalk.bold(`Recommended: ${review.recommended_action}`));
    }

    // Suggested command
    if (review.suggested_command) {
      lines.push('');
      lines.push(chalk.cyan(`Try: ${review.suggested_command}`));
    }

    return lines.join('\n');
  }

  /**
   * Format full output (all findings, detailed)
   */
  private formatFull(review: ReviewOutput): string {
    const lines: string[] = [];

    // Header
    lines.push(`${review.verdict.emoji} ${review.verdict.text} — ${review.score.total}/100`);
    lines.push('');

    // Score breakdown
    if (review.score.dimension_breakdown) {
      lines.push(chalk.bold('Score Breakdown:'));
      for (const [dimension, score] of Object.entries(review.score.dimension_breakdown)) {
        const status = score >= 75 ? chalk.green : score >= 50 ? chalk.yellow : chalk.red;
        lines.push(`- ${dimension}: ${status(score + '/100')}`);
      }
      lines.push('');
    }

    // All findings by severity
    const findingsBySeverity = {
      blocker: review.findings.filter(f => f.severity === 'blocker'),
      high: review.findings.filter(f => f.severity === 'high'),
      medium: review.findings.filter(f => f.severity === 'medium'),
      low: review.findings.filter(f => f.severity === 'low')
    };

    for (const [severity, findings] of Object.entries(findingsBySeverity)) {
      if (findings.length > 0) {
        lines.push(chalk.bold(`${severity.toUpperCase()} Issues (${findings.length}):`));
        findings.forEach((finding, i) => {
          lines.push(`${i + 1}. [${finding.tag}] ${finding.issue}`);
          if (finding.why_it_matters) {
            lines.push(chalk.gray(`   Why: ${finding.why_it_matters}`));
          }
          if (finding.recommended_fix) {
            lines.push(chalk.cyan(`   Fix: ${finding.recommended_fix}`));
          }
        });
        lines.push('');
      }
    }

    // Score caps
    if (review.score.score_caps_applied && review.score.score_caps_applied.length > 0) {
      lines.push(chalk.bold('Score Caps Applied:'));
      review.score.score_caps_applied.forEach(cap => {
        lines.push(chalk.gray(`- ${cap.cap}: max ${cap.max_score}`));
      });
      lines.push('');
    }

    // Recommended action
    if (review.recommended_action) {
      lines.push(chalk.bold(`Recommended: ${review.recommended_action}`));
    }

    return lines.join('\n');
  }

  /**
   * Format JSON output
   */
  private formatJSON(review: ReviewOutput): string {
    return JSON.stringify(review, null, 2);
  }

  /**
   * Format Markdown output
   */
  private formatMarkdown(review: ReviewOutput): string {
    const lines: string[] = [];

    lines.push(`# Review: ${review.metadata?.artifact_type || 'Document'}`);
    lines.push('');
    lines.push(`## Verdict`);
    lines.push(`${review.verdict.emoji} ${review.verdict.text} — ${review.score.total}/100`);
    lines.push('');

    if (review.score.dimension_breakdown) {
      lines.push('## Score Breakdown');
      for (const [dimension, score] of Object.entries(review.score.dimension_breakdown)) {
        lines.push(`- ${dimension}: ${score}/100`);
      }
      lines.push('');
    }

    lines.push('## Findings');
    review.findings.forEach((finding, i) => {
      lines.push(`### ${i + 1}. [${finding.tag}] ${finding.issue}`);
      if (finding.why_it_matters) {
        lines.push(`**Why it matters:** ${finding.why_it_matters}`);
      }
      if (finding.recommended_fix) {
        lines.push(`**Recommended fix:** ${finding.recommended_fix}`);
      }
      lines.push('');
    });

    if (review.recommended_action) {
      lines.push('## Recommended Action');
      lines.push(review.recommended_action);
    }

    return lines.join('\n');
  }

  /**
   * Format quiet output (minimal)
   */
  private formatQuiet(review: ReviewOutput): string {
    return `${review.score.total} ${review.verdict.band}`;
  }
}