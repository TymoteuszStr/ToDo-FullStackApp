import { Schema, model, Document } from 'mongoose';

export interface ITaskArchive extends Document {
  taskId: {},
  title: string,
  description: string,
  isCompleted?: boolean,
  dueDate?: Date,
  isImportant?: boolean
}
export interface ITaskArchiveDocument extends ITaskArchive, Document {

}

const TaskArchiveSchema = new Schema({
  taskId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    minLength: [1, 'Min lenght of title is 1'],
    maxLength: [60, 'Max lenght of title 60'],
    trim: true,
  },
  description: {
    type: String,
    required: false,
    maxLength: [300, 'Max lenght of description is 300'],
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


const TaskArchive = model<ITaskArchiveDocument>('taskArchive', TaskArchiveSchema);
export default TaskArchive; 
