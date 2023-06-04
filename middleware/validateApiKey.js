import ApiKey from '../models/ApiKeys.js'

export const validateApiKey = async (req, res, next) => {
  const key = req.get('x-api-key')
  if (!key) {
    return res.status(401)
      .json({ message: 'No API Key in headers' })
  }

  const apiKey = await ApiKey.findOne({ key })

  if (!apiKey) {
    return res.status(403)
      .json({ message: 'Invalid API Key' })
  }

  // assign the role to the request object
  req.role = apiKey.role

  next()
}
