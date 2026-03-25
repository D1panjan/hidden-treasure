/**
 * Structured JSON logger for the application.
 * Outputs JSON logs to stdout — Vercel captures these automatically.
 * Every log includes timestamp, level, action, and optional context.
 */

/** Log levels ordered by severity */
type LogLevel = "info" | "warn" | "error";

/** Context data attached to each log entry */
type LogContext = Record<string, string | number | boolean | undefined>;

/** A single structured log entry */
type LogEntry = {
  timestamp: string;
  level: LogLevel;
  action: string;
  context?: LogContext;
};

/**
 * Formats and writes a structured log entry to the console.
 * Uses JSON format so Vercel and log aggregators can parse it.
 */
function writeLog(level: LogLevel, action: string, context?: LogContext): void {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    action,
  };

  // Only include context if it has values
  if (context && Object.keys(context).length > 0) {
    entry.context = context;
  }

  const output = JSON.stringify(entry);

  switch (level) {
    case "error":
      console.error(output);
      break;
    case "warn":
      console.warn(output);
      break;
    default:
      console.log(output);
  }
}

/**
 * The main logger object used throughout the application.
 * 
 * Usage:
 *   logger.info("weather_fetch_success", { durationMs: 120, temp: 15 });
 *   logger.warn("rate_limit_approached", { ip: "1.2.3.4", count: 8 });
 *   logger.error("contact_form_failed", { error: err.message });
 */
export const logger = {
  /** Log informational events (successful API calls, page loads, etc.) */
  info: (action: string, context?: LogContext) => writeLog("info", action, context),

  /** Log warning events (retries, approaching limits, degraded service) */
  warn: (action: string, context?: LogContext) => writeLog("warn", action, context),

  /** Log error events (failed API calls, unhandled errors, critical failures) */
  error: (action: string, context?: LogContext) => writeLog("error", action, context),
};
