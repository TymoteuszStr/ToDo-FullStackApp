import { Request, Response, Router } from 'express';
import { TaskArchiveModel, TaskArchive } from '../db/models/taskArchiveModel';
import { Task } from '../db/models/taskModel';

export default class TaskArchiveController {
  async add(task: any): Promise<boolean> {
    const { _id, description, isCompleted } = task
    try {
      const newArchiveTask: TaskArchive = new TaskArchiveModel({taskId: _id, description, isCompleted });
      await newArchiveTask.save()
      return true
    }
    catch (err) {
      console.log(err)
      return false
    }
  }
}

