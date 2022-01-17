import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken'

module.exports = function (req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token = authorization && (authorization as string).split(' ')[1]
  if (!token) return res.sendStatus(401)

  jwt.verify(token as string, process.env.ACCESS_TOKEN_SECRET as string, (err: VerifyErrors | null, userId) => {
    console.log(err, userId)
    if (err) return res.sendStatus(403)
    next()
  })
}

