import { User } from '@switch-codes/common/entities'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as jwt from 'jsonwebtoken'

export const validateAuth = async (req: Request, res: Response, next: NextFunction) => {
  const auth_header = req.headers.authorization
  if (!auth_header) {
    return res.status(StatusCodes.UNAUTHORIZED).send()
  }
  const token = getJwtFromHeader(auth_header)
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).send()
  }
  try {
    const user = jwt.verify(token, <string>process.env.JWT_PRIVATE_KEY) as User
    req.body.user = user
  } catch {
    res.clearCookie('auth_token')
    return res.status(StatusCodes.UNAUTHORIZED).send()
  }
  next()
}
const getJwtFromHeader = (header: string): string | false => {
  const reg = /Bearer (.*)/
  if (header.match(reg)) {
    const matches = reg.exec(header)
    const token = matches ? matches[1] : null
    if (token) {
      return token
    }
    return false
  }
  return false
}
