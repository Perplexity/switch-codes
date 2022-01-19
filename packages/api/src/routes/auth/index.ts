import { User } from '@switch-codes/common/entities'
import { LoginRequest } from '@switch-codes/common/types'
import { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { getConnectionManager } from 'typeorm'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import axios from 'axios'

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  const body: LoginRequest = req.body
  if (!body.username || !body.password || !body.recaptchaToken) {
    return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Invalid request' })
  }
  try {
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_SECRET_KEY}&response=${body.recaptchaToken}`, {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    if (!response.data.success) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'ReCAPTCHA validation unsuccessful' })
    }
  } catch {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'ReCAPTCHA validation failed' })
  }
  const { username, password } = req.body
  console.log('hashed', await bcrypt.hash(password, 10))
  const connection = getConnectionManager().get('default')
  const userRepo = connection.getRepository(User)

  const user = await userRepo.findOne({ username })
  if (user) {
    const validPassword = await bcrypt.compare(password, user.password)
    if (validPassword) {
      const userTokenObject = {
        id: user.id,
        username: user.username,
        email: user.email
      }
      return res.status(StatusCodes.OK).json({ token: jwt.sign(userTokenObject, <string>process.env.JWT_PRIVATE_KEY) })
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid password' })
    }
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'User does not exist' })
  }
})

export default router
