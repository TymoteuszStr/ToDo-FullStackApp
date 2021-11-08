import { TaskModel, Task } from '../db/models/taskModel';
import { ObjectId } from 'mongodb';
import taskArchiveService from './taskArchiveService'

class TaskService {
  async saveTask(description: string, isCompleted:boolean): Promise<string> {
    try {
      const _id = new ObjectId()
      const newTask = new TaskModel({ _id, description, isCompleted });
      await newTask.save();
      return `${_id}`;
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
      const taskToArchive: any = await TaskModel.findOne({ _id: id })
      const isTaskArchived = await taskArchiveService.saveTask(taskToArchive)
      if (isTaskArchived) await TaskModel.deleteOne({ _id: id })
      else throw new Error('Task cannot be archived')
      return true

    } catch (err: any) {
      for (const key in err.errors) {
        console.log(err.errors[key].message)
      }
      return false
    }
  }

}

export default new TaskService()

