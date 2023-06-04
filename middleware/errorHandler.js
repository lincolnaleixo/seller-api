import logger from './logger.js'

export const errorHandler = (err, req, res, next) => {
  logger.error(err.stack)
  res.status(500)
    .json({ message: err.message })
}
