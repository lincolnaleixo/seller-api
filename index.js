import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import fs from 'node:fs'
import https from 'node:https'
import { checkPermissions } from './middleware/checkPermissions.js'
import { errorHandler } from './middleware/errorHandler.js'
import logger from './middleware/logger.js'
import { validateApiKey } from './middleware/validateApiKey.js'
import keysRoutes from './routes/keys.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use(logger) // Use the logger middleware
app.use(errorHandler) // Use the error handler middleware

app.use(validateApiKey)
app.use(checkPermissions)
app.use('/keys', keysRoutes)

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected…'))
  .catch(err => console.log(err))

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/omegabase.bealsa.com/privkey.pem', 'utf8'),
  cert: fs.readFileSync('/etc/letsencrypt/live/omegabase.bealsa.com/fullchain.pem', 'utf8')
}

https.createServer(options, app)
  .listen(443, () => {
    console.log('HTTPS Server running on port 443')
  })

// TODO local testing validation with env variable
// const port = process.env.PORT || 5000
// app.listen(port, () => console.log(`Server is running on port ${port}`))
