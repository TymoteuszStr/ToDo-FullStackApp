import { Request, Response, NextFunction } from 'express';


module.exports = function (req: Request, res: Response, next: NextFunction) {
  // dodać sprawdzanie JWT w tym miejscu
  res.sendStatus(403)

}