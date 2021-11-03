import { Request, Response, Router } from 'express';
import Task from '../db/models/taskModel'

export default class TaskController {
  async add(req: Request, res: Response): Promise<void>{

  }
  
  async getAll(req: Request, res: Response): Promise<any[]>{
    const allTasks = await Task.find({})
    return allTasks;
   }
}

