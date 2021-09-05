import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: './logs/error.log', level: 'error', format: winston.format.timestamp() }),
    new winston.transports.File({ filename: './logs/info.log', level: 'info', format: winston.format.timestamp() }),
    new winston.transports.File({ filename: './logs/combined.log', format: winston.format.timestamp() })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}

export default logger