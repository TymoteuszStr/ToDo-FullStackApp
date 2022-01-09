import User, { IUserDocument } from '../../db/models/User/userModel';

class UserService {

  async login(login: string, password: string) {
    const user: IUserDocument | null = await User.findOne({ login })
    if (!user) return false

    return user.checkPassword(password)
  }


}

export default new UserService();