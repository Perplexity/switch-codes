import { User } from '@switch-codes/common/entities'
import { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { createConnection } from 'typeorm'

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  createConnection().then(async connection => {
    const userRepo = connection.getRepository(User)

    const user = await userRepo.findOne({ username: req.body.username, password: req.body.password })
    await connection.close()
    if (user) {
      return res.status(StatusCodes.OK).json({
        id: user.id,
        username: user.username,
        email: user.email
      })
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid login credentials.' })
    }
  }).catch((error) => {
    console.log(error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  })
})

export default router
