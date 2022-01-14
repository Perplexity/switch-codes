import { Router } from 'express'
import AuthRouter from './auth'
import UserRouter from './user'
import NewsRouter from './news'

const router = Router()

router.use('/auth', AuthRouter)
router.use('/user', UserRouter)
router.use('/news', NewsRouter)

export default router
