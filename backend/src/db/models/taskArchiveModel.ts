import { Schema, model, Document} from 'mongoose';

export interface TaskArchive extends Document{
  _id: {},
  taskId:{},
  description: string,
  isCompleted: boolean
}

const taskArchiveSchema = new Schema({
  taskId:{
    type: Schema.Types.ObjectId,
    required: true
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


export const TaskArchiveModel = model<TaskArchive>('taskArchive', taskArchiveSchema);
