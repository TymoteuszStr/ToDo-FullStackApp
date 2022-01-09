import { Schema, model, Document } from 'mongoose';

export interface ITask {
  title: string,
  description: string,
  isCompleted?: boolean,
  dueDate?: Date,
  isImportant?: boolean
}
export interface ITaskDocument extends ITask, Document {
}

const TaskSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: false
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
