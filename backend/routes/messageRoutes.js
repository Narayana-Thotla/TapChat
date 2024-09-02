import express from 'express'
import { getMessage ,sendMessage } from '../controllers/messageController.js'
import  protectRoute  from '../middleware/protectRoute.js'
import cookieParser from 'cookie-parser'
const router = express.Router()

const app = express();
app.use(cookieParser())

router.get('/:id',protectRoute,getMessage)
router.post('/send/:id',protectRoute,sendMessage)


router.get('/about', (req, res) => {
  console.log('hello',req.cookies)
  res.status(200).send(`About birds ${req.cookies}`)
})

export default router