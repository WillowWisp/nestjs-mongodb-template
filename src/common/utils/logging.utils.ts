import * as chalk from 'chalk';

type LogLevel = 'debug' | 'error' | 'info' | 'warn';

const loggerMap: Record<LogLevel, (...arg: any[]) => void> = {
  info: console.info,
  debug: console.debug,
  error: console.error,
  warn: console.warn,
};

export const logWarning = (type: string, message: string | object) => {
  logHelper('Warning', type, message, chalk.yellow, 'warn');
};
export const logInfo = (type: string, message: string | object) => {
  logHelper('Info', type, message, chalk.blue, 'info');
};
export const logError = (type: string, message: string | object) => {
  logHelper('Error', type, message, chalk.red, 'error');
};

export const logSuccess = (type: string, message: string | object) => {
  logHelper('Success', type, message, chalk.green, 'info');
};

export const logDebug = (type: string, message: string | object) => {
  logHelper('Debug', type, message, chalk.magenta, 'debug');
};

const logHelper = (
  level: string,
  from: string,
  message: string | object,
  chalkColor: chalk.Chalk,
  logLevel: LogLevel,
) => {
  const levelPrefix = `[${level}]`;
  const levelStr = chalkColor(levelPrefix);

  const timeStr = `- ${new Date().toISOString()}`;

  const messagePrefix = 'Message:';
  const messageStr = `- ${chalkColor(messagePrefix)} ${message}`;

  const fromPrefix = 'Type:';
  const fromStr = `- ${chalkColor(fromPrefix)} ${from}`;

  loggerMap[logLevel](
    `${levelStr.padEnd(10, ' ')} ${timeStr} ${fromStr} ${messageStr}`,
  );
};
