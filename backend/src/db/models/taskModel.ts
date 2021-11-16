import { Schema, model, Document } from 'mongoose';

export interface Task {
  description: string,
  isCompleted: boolean,
  dueDate: Date,
  isImportant: boolean
}
export interface TaskCollection extends Document,Task {
}

const taskSchema = new Schema({
  _id: {
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
  },
  dueDate:{
    type: Date,
    required: false,
  },
  isImportant: {
    type: Boolean,
    required: false,
    default: false,
  }
}, { versionKey: false });


export const TaskModel = model<TaskCollection>('task', taskSchema);
