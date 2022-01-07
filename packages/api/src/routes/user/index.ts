import { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateAuth } from 'src/middleware/auth'

const router = Router()

router.get('/me', validateAuth, async (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).json(req.body.user)
})

export default router
