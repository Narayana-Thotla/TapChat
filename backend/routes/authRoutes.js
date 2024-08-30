import express from 'express'
import { signin,login,logout } from '../controllers/authControllers.js'
const router = express.Router()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from 'body-parser';


const app = express();
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000/api/auth/about', // Replace with your client URL
  credentials: true // Allow credentials to be sent
}));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(bodyParser.json())

router.post('/signin',signin)

router.post('/login',login)

router.post('/logout', logout)

router.get('/about', (req, res) => {
  console.log('hello',req.headers)
  res.send(`auth About birds,${req.cookies}`)
})

router.get('/hi',(req,res)=>{
  console.log('cookies sent',req.cookies)
  res.send(`${req.cookies}`)
})

export default router