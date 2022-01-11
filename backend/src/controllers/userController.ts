import { Request, Response, Router } from 'express';
import UserService from '../services/User/userService'
import { IUserDocument } from '../db/models/User/userModel'

class UserController {

  async login(req: Request, res: Response): Promise<void> {
    const { login, password } = req.body;
    const validUser = await UserService.login(login, password)
    if (!validUser) res.sendStatus(401)
    else {
      const token = await UserService.generateToken(validUser as IUserDocument)
      if (!token) res.sendStatus(500)
      else res.send(token).status(200)
    }

  }

  async register(req: Request, res: Response): Promise<void> {
    const { login, password } = req.body;
    const isUserAdded = await UserService.addUser({ userName: login, password })
    if (isUserAdded) res.sendStatus(201)
    else res.sendStatus(400)
  }

}

export default new UserController()