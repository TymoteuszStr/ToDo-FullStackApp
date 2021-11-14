import { Schema, model, Document} from 'mongoose';

export interface Task {
  _id: {},
  description: string,
  isCompleted: boolean
}
export interface TaskCollection extends Document{
  _id: {},
  description: string,
  isCompleted: boolean
}

const taskSchema = new Schema({
  _id:{
    type: Schema.Types.ObjectId,
    required: false
  },
  description: {
    type: String,
    required: [true, 'Pole description jest wymagane'],
    minLength: [1, 'Minimalna liczba znaków to 1'],
    trim: true,
  },
  isCompleted: {
    type: Boolean,
    required: false,
    default: false
  }
}, {versionKey: false });


export const TaskModel = model<TaskCollection>('task', taskSchema);
