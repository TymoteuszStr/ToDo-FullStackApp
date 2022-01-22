import Task, { ITask, ITaskDocument } from '../../db/models/Task/taskModel';
import { ObjectId } from 'mongodb';
import taskArchiveService from './taskArchiveService'

class TaskService {

  async saveTask(task: ITask): Promise<{}> {
    try {
      const _id = new ObjectId()
      const newTask: ITaskDocument = new Task({ _id, ...task });
      const savedTask = await newTask.save();
      if (!!savedTask) return savedTask;
      else throw new Error
    } catch (err: any) {
      for (const key in err.errors) {
        console.log(err.errors[key].message)
      }
      return ''
    }
  }

  async getAllUserTasks(userId: string): Promise<{}> {
    return await Task.find({ userId })
  }

  async archiveTask(id: string): Promise<boolean> {
    try {
      const taskToArchive: ITaskDocument | null = await Task.findOne({ _id: new ObjectId(id) })
      if (taskToArchive === null) return false;
      const isTaskArchived: boolean = await taskArchiveService.saveTask(taskToArchive)
      if (isTaskArchived) await Task.deleteOne({ _id: new ObjectId(id) })
      else throw new Error('Task cannot be archived')
      return true

    } catch (err: any) {
      for (const key in err.errors) {
        console.log(err.errors[key].message)
      }
      return false
    }
  }

  async update(id: string, task: ITask): Promise<ITaskDocument | null> {
    try {
      const validateTask: ITaskDocument = new Task({ ...task });
      if (!validateTask.validateSync()) {
        await Task.where({ _id: new ObjectId(id) }).updateOne({ ...task })
        const updatedTask = await Task.findOne({ _id: new ObjectId(id) })
        return updatedTask
      }
      else throw new Error();
    } catch (err: any) {
      for (const key in err.errors) {
        console.log(err.errors[key].message)
      }
      return null
    }
  }
  async updateProperty(id: string, property: object, userId: string): Promise<ITaskDocument | null> {
    try {
      await Task.where({ _id: new ObjectId(id), userId }).updateOne(property)
      const updatedTask = await Task.findOne({ _id: new ObjectId(id) })
      return updatedTask

    } catch (err: any) {
      for (const key in err.errors) {
        console.log(err.errors[key].message)
      }
      return null
    }
  }

}

export default new TaskService()

