import { Request, Response, Router } from 'express';
import userService from '../services/User/userService'

class UserController {

  async login(req: Request, res: Response): Promise<void> {
    const { login, password } = req.body;

    const isUserValid = await userService.login(login, password)

  }

}

export default new UserController()
