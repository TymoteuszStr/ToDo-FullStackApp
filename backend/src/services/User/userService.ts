import User, { IUserDocument } from '../../db/models/User/userModel';
import { IUser } from '../../db/models/User/userModel';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken'

class UserService {

  async login(login: string, password: string): Promise<IUserDocument | {}> {
    const user: IUserDocument | null = await User.findOne({ login })
    if (user && user.checkPassword(password)) return user
    else return {}
  }

  async generateToken(user: IUserDocument): Promise<string> {
    const payload = {
      _id: user._id.toString(),
      userName: user.userName,
    }
    try {
      const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '6h' })
      await User.where({ _id: new ObjectId(user._id) }).updateOne({ token })
      return token
    } catch (err) {
      console.log(err)
      return ''
    }
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

