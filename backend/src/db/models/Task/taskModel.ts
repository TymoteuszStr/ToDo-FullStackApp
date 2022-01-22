import { Schema, model, Document } from 'mongoose';

export interface ITask {
  title: string,
  userId: string | {},
  description: string,
  isCompleted?: boolean,
  dueDate?: Date,
  isImportant?: boolean
}
export interface ITaskDocument extends ITask, Document {
  userId: string,

}

const TaskSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: false
  },
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: [true, 'Pole title jest wymagane'],
    minLength: [1, 'Minimalna liczba znaków to 1'],
    maxLength: 60,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    maxLength: 300,
    trim: true,
  },
  isCompleted: {
    type: Boolean,
    required: false,
    default: false
  },
  dueDate: {
    type: Date,
    required: false,
  },
  isImportant: {
    type: Boolean,
    required: false,
    default: false,
  }
}, { versionKey: false });


const Task = model<ITaskDocument>('Task', TaskSchema);
export default Task; 
