import { Request, Response, Router } from 'express';
import UserService from '../services/User/userService'

class UserController {

  async login(req: Request, res: Response): Promise<void> {
    const { login, password } = req.body;
    const { token, userId, name } = await UserService.checkUserAndGenerateToken(login, password)
    if (!token) res.sendStatus(401)
    else res.send({ token, userId, name }).status(200)
  }

  async register(req: Request, res: Response): Promise<void> {
    const { login, password } = req.body;
    const isUserAdded = await UserService.addUser({ name: login, password })
    if (isUserAdded) res.sendStatus(201)
    else res.sendStatus(400)
  }

}

export default new UserController()