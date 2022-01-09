import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  name: string,
  password: string,
}
export interface IUserDocument extends IUser, Document {
  checkPassword: (password: string) => boolean;

}

const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: false
  },
  name: {
    type: String,
    required: [true, 'Pole title jest wymagane'],
    minLength: [1, 'Minimalna liczba znaków to 1'],
    maxLength: 60,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLenght: [5, 'Hasło powiino posiadać min. 5 znaki']
  }
}, { versionKey: false });


userSchema.pre('save', function (next) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt)
  this.password = hash;
  next();
})

userSchema.methods = {
  checkPassword(password: string) {
    return bcrypt.compareSync(password, this.password)
  }
}

const User = model<IUserDocument>('User', userSchema);
export default User
