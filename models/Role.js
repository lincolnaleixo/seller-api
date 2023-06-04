import mongoose from 'mongoose'

const RoleSchema = new mongoose.Schema({
  name: String,
  permissions: {
    type: Map,
    of: {
      type: Map,
      of: {
        create: Boolean,
        read: Boolean,
        update: Boolean,
        delete: Boolean
      }
    }
  }
})

export const roleDb = mongoose.connection.useDb('keys')

export default roleDb.model('Role', RoleSchema, 'role')
