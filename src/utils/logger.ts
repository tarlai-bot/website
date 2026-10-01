/**
 * Development Logger Utility
 * Only logs in development mode, silent in production
 */

const isDev = import.meta.env.DEV;

export const logger = {
  log: (...args: any[]) => {
    if (isDev) {
      console.log(...args);
    }
  },

  info: (...args: any[]) => {
    if (isDev) {
      console.info(...args);
    }
  },

  warn: (...args: any[]) => {
    if (isDev) {
      console.warn(...args);
    }
  },

  error: (...args: any[]) => {
    if (isDev) {
      console.error(...args);
    }
    // In production, you could send to error monitoring service here
    // Example: Sentry.captureException(args[0]);
  },

  debug: (...args: any[]) => {
    if (isDev) {
      console.debug(...args);
    }
  },
};

export default logger;
