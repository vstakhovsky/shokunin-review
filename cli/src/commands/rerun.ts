import chalk from 'chalk';

export async function rerunCommand(file: string, options: any) {
  console.log(chalk.yellow('Rerun command - MVP 1 placeholder'));
  console.log(chalk.gray('This feature will be available in MVP 2'));
  console.log(chalk.gray(`File: ${file}, Compare: ${options.compare}`));
  process.exit(0);
}