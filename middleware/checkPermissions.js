import Role from '../models/Role.js'

const operationMap = {
  get: 'read',
  post: 'create',
  put: 'update',
  delete: 'delete'
}

export const checkPermissions = async (req, res, next) => {
  const dbName = 'keys' // change it as per your request
  const collection = 'api' // change it as per your request
  const operation = operationMap[req.method.toLowerCase()]

  if (!req.role) {
    return res.status(403)
      .json({ message: 'Forbidden' })
  }

  const role = await Role.findOne({ name: req.role })
  const dbPermissions = role.permissions.get(dbName)
  if (!dbPermissions) {
    return res.status(403)
      .json({ message: 'Forbidden' }) // No permissions for this db
  }

  const collectionPermissions = dbPermissions.get(collection)
  console.log(collectionPermissions)
  if (!collectionPermissions) {
    return res.status(403)
      .json({ message: 'Forbidden' }) // No permissions for this collection
  }

  const operationAllowed = collectionPermissions[operation]
  console.log(operationAllowed)
  if (!operationAllowed) {
    return res.status(403)
      .json({ message: 'Forbidden' }) // Operation not allowed
  }

  next()
}
