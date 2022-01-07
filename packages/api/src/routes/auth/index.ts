import { User } from '@switch-codes/common/entities'
import { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { createConnection } from 'typeorm'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password) {
    return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Invalid request' })
  }
  const { username, password } = req.body
  createConnection().then(async connection => {
    const userRepo = connection.getRepository(User)

    const user = await userRepo.findOne({ username })
    await connection.close()
    if (user) {
      console.log('hashed', await bcrypt.hash(password, 10))
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
  }).catch((error) => {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  })
})

router.get('/logout', async (req: Request, res: Response) => {
  res.clearCookie('auth_token')
  return res.status(StatusCodes.OK).send()
})

export default router
