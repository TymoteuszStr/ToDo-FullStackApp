import User, { IUserDocument } from '../../db/models/User/userModel';
import { IUser } from '../../db/models/User/userModel';
import { ObjectId } from 'mongodb';

class UserService {

  async login(login: string, password: string) {
    const user: IUserDocument | null = await User.findOne({ login })
    if (!user) return false

    return user.checkPassword(password)
  }

  async addUser(user: IUser): Promise<boolean> {
    try {
      const _id = new ObjectId()
      await new User({ _id, ...user }).save()

    } catch (error) {
      console.log("Cannot add new user: ", error)
      return false;
    }
    return true
  }


}

export default new UserService();

