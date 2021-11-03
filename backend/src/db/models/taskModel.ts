import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  description: {
    type: String,
    required: [true, 'Pole slug jest wymagane'],
    minLength: [1, 'Minimalna liczba znaków to 1'],
    trim: true,
  },
  isCompleted:{
    type: Boolean,
    required: false,
    default: false
  }
});


const Task = mongoose.model('task', taskSchema);

export default Task;