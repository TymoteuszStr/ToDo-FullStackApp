import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken'

module.exports = function (req: Request, res: Response, next: NextFunction) {
  const { authorizarion } = req.headers;
  const token = authorizarion && (authorizarion as string).split(' ')[1]

  if (!token) res.sendStatus(401)

  jwt.verify(token as string, process.env.ACCESS_TOKEN_SECRET as string, (err: VerifyErrors | null, userId): void => {
    console.log(err, userId)
    if (err) res.sendStatus(403)

    next()
  })
  res.sendStatus(403)

}