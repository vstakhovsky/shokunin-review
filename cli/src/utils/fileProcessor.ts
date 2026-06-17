import * as fs from 'fs-extra';
import * as path from 'path';
import { Artifact, ArtifactType } from '../types';

export class FileProcessor {
  /**
   * Process a file and extract artifact information
   */
  async processFile(filePath: string, spinner?: any): Promise<Artifact> {
    const stats = await fs.stat(filePath);
    const content = await fs.readFile(filePath, 'utf-8');
    const lines = content.split('\n').length;

    const artifact: Artifact = {
      type: this.detectArtifactType(content, filePath),
      content,
      filePath,
      fileName: path.basename(filePath),
      size: stats.size,
      lines
    };

    if (spinner) {
      spinner.text = `Processing ${artifact.type}...`;
    }

    return artifact;
  }

  /**
   * Detect artifact type from content and filename
   */
  private detectArtifactType(content: string, filePath: string): ArtifactType {
    const fileName = path.basename(filePath).toLowerCase();
    const contentLower = content.toLowerCase();

    // Check by filename first
    if (fileName.includes('prd') || fileName.includes('product-requirements')) {
      return ArtifactType.PRD;
    }
    if (fileName.includes('rfc') || fileName.includes('technical-design')) {
      return ArtifactType.RFC;
    }
    if (fileName.includes('experiment') || fileName.includes('ab-test')) {
      return ArtifactType.EXPERIMENT_PLAN;
    }
    if (fileName.includes('strategy') || fileName.includes('strategic')) {
      return ArtifactType.PRODUCT_STRATEGY;
    }

    // Check by content patterns
    const prdIndicators = ['problem statement', 'proposed solution', 'success metrics', 'mvp scope'];
    const rfcIndicators = ['technical proposal', 'context', 'alternatives', 'trade-offs', 'architecture'];
    const experimentIndicators = ['hypothesis', 'experimental design', 'decision rule', 'sample size'];
    const strategyIndicators = ['strategic thesis', 'target customer', 'opportunity sizing', 'trade-offs'];

    const scores = {
      [ArtifactType.PRD]: this.countMatches(contentLower, prdIndicators),
      [ArtifactType.RFC]: this.countMatches(contentLower, rfcIndicators),
      [ArtifactType.EXPERIMENT_PLAN]: this.countMatches(contentLower, experimentIndicators),
      [ArtifactType.PRODUCT_STRATEGY]: this.countMatches(contentLower, strategyIndicators)
    };

    const maxScore = Math.max(...Object.values(scores));
    if (maxScore === 0) {
      return ArtifactType.UNKNOWN;
    }

    return Object.entries(scores).find(([_, score]) => score === maxScore)![0] as ArtifactType;
  }

  /**
   * Count how many indicator phrases appear in content
   */
  private countMatches(content: string, indicators: string[]): number {
    return indicators.filter(indicator => content.includes(indicator)).length;
  }

  /**
   * Check if file is supported format
   */
  async isSupportedFile(filePath: string): Promise<boolean> {
    const ext = path.extname(filePath).toLowerCase();
    const supportedExts = ['.md', '.txt', '.markdown'];
    return supportedExts.includes(ext);
  }

  /**
   * Check for sensitive content
   */
  async checkSensitiveContent(content: string): Promise<string[]> {
    const sensitivePatterns = [
      /api[_-]?key\s*[:=]\s*['"]?[\w-]+['"]?/gi,
      /password\s*[:=]\s*['"]?\w+['"]?/gi,
      /secret\s*[:=]\s*['"]?\w+['"]?/gi,
      /token\s*[:=]\s*['"]?[\w-]+['"]?/gi
    ];

    const findings: string[] = [];
    for (const pattern of sensitivePatterns) {
      const matches = content.match(pattern);
      if (matches) {
        findings.push(...matches);
      }
    }

    return findings;
  }
}