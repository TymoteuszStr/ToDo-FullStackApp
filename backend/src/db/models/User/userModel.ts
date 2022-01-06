import { Schema, model, Document } from 'mongoose';
const bcrypt = require('bcrypt');

export interface Task {
  name: string,
  password: string,
}
export interface UserCollection extends Document, Task {
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


export const UserModel = model<UserCollection>('user', userSchema);
