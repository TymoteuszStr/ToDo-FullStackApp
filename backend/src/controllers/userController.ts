import { Request, Response, Router } from 'express';
import UserService from '../services/User/userService'

class UserController {

  async login(req: Request, res: Response): Promise<void> {
    const { login, password } = req.body;
    const token = await UserService.login(login, password)
    //dodać JWT i wyslac token zamiast samego satusu
    if (token) res.status(200).send(true)
  }

  async register(req: Request, res: Response): Promise<void> {
    const { login, password } = req.body;
    const isUserAdded = await UserService.addUser({ userName: login, password })
    if (isUserAdded) res.sendStatus(201)
    else res.sendStatus(400)
  }

}

export default new UserController()
