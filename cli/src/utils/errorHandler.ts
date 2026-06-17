import chalk from 'chalk';

export class ShokuninError extends Error {
  constructor(
    message: string,
    public code: string,
    public exitCode: number = 1
  ) {
    super(message);
    this.name = 'ShokuninError';
  }
}

export class ErrorHandler {
  /**
   * Handle error and display user-friendly message
   */
  static handle(error: Error | ShokuninError): void {
    if (error instanceof ShokuninError) {
      console.error(chalk.red(`Error [${error.code}]: ${error.message}`));
      process.exit(error.exitCode);
    } else {
      console.error(chalk.red('Unexpected error:'), error.message);
      if (process.env.DEBUG) {
        console.error(error.stack);
      }
      process.exit(1);
    }
  }

  /**
   * Create and handle common errors
   */
  static fileNotFound(filePath: string): never {
    throw new ShokuninError(
      `File not found: ${filePath}`,
      'FILE_NOT_FOUND',
      1
    );
  }

  static unsupportedFormat(fileExt: string): never {
    throw new ShokuninError(
      `Unsupported file format: ${fileExt}. Supported: .md, .txt, .markdown`,
      'UNSUPPORTED_FORMAT',
      4
    );
  }

  static invalidCommand(command: string): never {
    throw new ShokuninError(
      `Invalid command: ${command}`,
      'INVALID_COMMAND',
      1
    );
  }

  static validatorError(validatorName: string, error: Error): never {
    throw new ShokuninError(
      `Validator ${validatorName} failed: ${error.message}`,
      'VALIDATOR_ERROR',
      1
    );
  }

  static configError(configPath: string, error: Error): never {
    throw new ShokuninError(
      `Configuration error in ${configPath}: ${error.message}`,
      'CONFIG_ERROR',
      1
    );
  }

  static networkError(error: Error): never {
    throw new ShokuninError(
      `Network error: ${error.message}`,
      'NETWORK_ERROR',
      2
    );
  }

  static apiError(statusCode: number, message: string): never {
    throw new ShokuninError(
      `API error (${statusCode}): ${message}`,
      'API_ERROR',
      2
    );
  }

  static sensitiveContentWarning(): void {
    console.warn(chalk.yellow('⚠️  Warning: Document appears to contain sensitive content (API keys, passwords, etc.)'));
    console.warn(chalk.yellow('Please review and redact sensitive information before proceeding.'));
  }

  static unsupportedArtifactWarning(artifactType: string): void {
    console.warn(chalk.yellow(`⚠️  Warning: ${artifactType} is not fully supported in MVP 1`));
    console.warn(chalk.yellow('Basic review will be performed, but specialized validators may not be available.'));
  }
}

export class UserFeedback {
  /**
   * Display progress spinner with message
   */
  static spinner(message: string): any {
    // This would use ora in actual implementation
    console.log(chalk.gray(message));
    return { text: message };
  }

  /**
   * Display success message
   */
  static success(message: string): void {
    console.log(chalk.green(`✓ ${message}`));
  }

  /**
   * Display warning message
   */
  static warning(message: string): void {
    console.warn(chalk.yellow(`⚠ ${message}`));
  }

  /**
   * Display info message
   */
  static info(message: string): void {
    console.log(chalk.blue(`ℹ ${message}`));
  }

  /**
   * Display error message
   */
  static error(message: string): void {
    console.error(chalk.red(`✗ ${message}`));
  }

  /**
   * Display step in process
   */
  static step(step: number, total: number, message: string): void {
    console.log(chalk.gray(`[${step}/${total}] ${message}`));
  }

  /**
   * Display verbose output if enabled
   */
  static verbose(message: string, enabled: boolean): void {
    if (enabled) {
      console.log(chalk.gray(message));
    }
  }
}