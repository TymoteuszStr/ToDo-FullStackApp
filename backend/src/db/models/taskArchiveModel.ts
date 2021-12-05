import { Schema, model, Document } from 'mongoose';

export interface TaskArchive extends Document {
  taskId: {},
  title: string,
  description: string,
  isCompleted?: boolean,
  dueDate?: Date,
  isImportant?: boolean
}

const taskArchiveSchema = new Schema({
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


export const TaskArchiveModel = model<TaskArchive>('taskArchive', taskArchiveSchema);
