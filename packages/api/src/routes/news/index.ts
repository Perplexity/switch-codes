import { News } from '@switch-codes/common/entities'
import { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { getConnectionManager } from 'typeorm'
import { validateAuth } from '../../middleware/auth'

const router = Router()

router.get('/', validateAuth, async (req: Request, res: Response) => {
  const connection = getConnectionManager().get('default')
  const newsRepo = connection.getRepository(News)

  const news = await newsRepo.find()
  return res.status(StatusCodes.OK).json(news)
})

export default router
