import mongoose from 'mongoose'

const ApiKeySchema = new mongoose.Schema({
  key: String,
  owner: String,
  role: {
    type: String,
    ref: 'Role'
  }
})

const apiKeyDb = mongoose.connection.useDb('keys')

export default apiKeyDb.model('Api', ApiKeySchema, 'api')
