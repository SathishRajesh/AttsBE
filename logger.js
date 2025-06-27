const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(
      (info) => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`
    )
  ),
  transports: [
    new transports.Console(),
  ],
});

if (process.env.NODE_ENV !== "production") {
  const fs = require("fs");
  const logDir = "logs";
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir); // only in local
  }

  logger.add(new transports.File({ filename: "logs/error.log", level: "error" }));
  logger.add(new transports.File({ filename: "logs/combined.log" }));
}

module.exports = logger;
