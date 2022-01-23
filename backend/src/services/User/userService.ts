import User, { IUserDocument } from '../../db/models/User/userModel';
import { IUser } from '../../db/models/User/userModel';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken'

class UserService {

  async checkUserAndGenerateToken(login: string, password: string): Promise<{ token: string, userId: string, name: string }> {
    const user: IUserDocument | null = await User.findOne({ name: login })

    if (user && user.checkPassword(password))
      return { token: jwt.sign({ _id: user._id.toString() }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '6h' }), userId: user._id.toString(), name: user.name.toString() }
    else return { token: '', userId: '', name: '' }
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

