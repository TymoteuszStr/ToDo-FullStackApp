import { TaskModel, Task, TaskCollection } from '../db/models/taskModel';
import { ObjectId } from 'mongodb';
import taskArchiveService from './taskArchiveService'

class TaskService {
  async saveTask(description: string, isCompleted: boolean, dueDate: Date, isImportant: boolean): Promise<string> {
    try {
      const _id = new ObjectId()
      const newTask: TaskCollection = new TaskModel({ _id, description, isCompleted,dueDate,isImportant });
      const res = await newTask.save();
      if (!!res) return `${_id}`;
      else throw new Error
    } catch (err: any) {
      for (const key in err.errors) {
        console.log(err.errors[key].message)
      }
      return ''
    }
  }

  async getAllTasks(): Promise<{}> {
    const allTasks = await TaskModel.find({})
    return allTasks
  }

  async archiveTask(id: string): Promise<boolean> {
    try {
      const taskToArchive: TaskCollection | null = await TaskModel.findOne({ _id: new ObjectId(id) })
      const isTaskArchived: boolean = await taskArchiveService.saveTask(taskToArchive)
      if (isTaskArchived) await TaskModel.deleteOne({ _id: new ObjectId(id) })
      else throw new Error('Task cannot be archived')
      return true

    } catch (err: any) {
      for (const key in err.errors) {
        console.log(err.errors[key].message)
      }
      return false
    }
  }

  async updateTask(id: string, task: Task): Promise<boolean> {
    const {description, isCompleted, dueDate, isImportant} = task
    try {
      const validateTask: TaskCollection = new TaskModel({...task});
      if (!validateTask.validateSync()) {
        await TaskModel.where({ _id: new ObjectId(id)}).updateOne({ description, isCompleted, dueDate, isImportant })
        return true
      }
      else throw new Error();
    } catch (err: any) {
      for (const key in err.errors) {
        console.log(err.errors[key].message)
      }
      return false
    }
  }

}

export default new TaskService()

