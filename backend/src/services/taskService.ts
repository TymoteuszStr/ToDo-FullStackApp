import { TaskModel, Task, TaskCollection } from '../db/models/taskModel';
import { ObjectId } from 'mongodb';
import taskArchiveService from './taskArchiveService'

class TaskService {
  async saveTask(task: Task): Promise<{}> {
    try {
      const _id = new ObjectId()
      const newTask: TaskCollection = new TaskModel({ _id, ...task });
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

  async getAllTasks(): Promise<{}> {
    const allTasks = await TaskModel.find({})
    return allTasks
  }

  async archiveTask(id: string): Promise<boolean> {
    try {
      const taskToArchive: TaskCollection | null = await TaskModel.findOne({ _id: new ObjectId(id) })
      if (taskToArchive === null) return false;
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

  async update(id: string, task: Task): Promise<TaskCollection | null> {
    try {
      const validateTask: TaskCollection = new TaskModel({ ...task });
      if (!validateTask.validateSync()) {
        await TaskModel.where({ _id: new ObjectId(id) }).updateOne({ ...task })
        const updatedTask = await TaskModel.findOne({ _id: new ObjectId(id) })
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
  async updateProperty(id: string, property: object): Promise<TaskCollection | null> {
    try {
      await TaskModel.where({ _id: new ObjectId(id) }).updateOne(property)
      const updatedTask = await TaskModel.findOne({ _id: new ObjectId(id) })
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

