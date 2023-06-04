import express from 'express'
import Key from '../models/ApiKeys.js'

const router = express.Router()

// router.post('/', async (req, res, next) => {
//   try {
//     const key = new Key({
//       key: uuidv4(),
//       owner: req.body.owner,
//       role: req.body.role
//     })
//     await key.save()
//     res.json(key)
//   } catch (error) {
//     next(error)
//   }
// })

router.get('/validate/:key', async (req, res, next) => {
  try {
    const key = await Key.findOne({ key: req.params.key })
    if (key) {
      res.json({ valid: true })
    } else {
      res.json({ valid: false })
    }
  } catch (error) {
    next(error)
  }
})

export default router
