import User, { IUserDocument } from '../../db/models/User/userModel';
import { IUser } from '../../db/models/User/userModel';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken'

class UserService {

  async checkUserAndGenerateToken(login: string, password: string): Promise<string> {
    const user: IUserDocument | null = await User.findOne({ login })
    if (user && user.checkPassword(password))
      return jwt.sign({ _id: user._id.toString() }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '6h' })
    else return ''
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

