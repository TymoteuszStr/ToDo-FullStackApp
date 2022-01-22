import { Request, Response, Router } from 'express';
import UserService from '../services/User/userService'
import { IUserDocument } from '../db/models/User/userModel'

class UserController {

  async login(req: Request, res: Response): Promise<void> {
    const { login, password } = req.body;
    const { token, userId, userName } = await UserService.checkUserAndGenerateToken(login, password)
    if (!token) res.sendStatus(401)
    else res.send({ token, userId, userName }).status(200)
  }

  async register(req: Request, res: Response): Promise<void> {
    const { login, password } = req.body;
    const isUserAdded = await UserService.addUser({ userName: login, password })
    if (isUserAdded) res.sendStatus(201)
    else res.sendStatus(400)
  }

}

export default new UserController()