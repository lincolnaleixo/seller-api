import morgan from 'morgan'
import fs from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, '..', 'server/access.log'), { flags: 'a' })

// Define custom morgan format
morgan.token('localdate', function getDate (req) {
  const date = new Date()
  return date.toISOString()
})

const loggerFormat = ':localdate :method :url :status :response-time ms - :res[content-length]'
const logger = morgan(loggerFormat, {
  stream: {
    write: (message) => {
      // write message to the console
      console.log(message.trim())

      // write message to the log file
      accessLogStream.write(message)
    }
  }
})

export default logger
