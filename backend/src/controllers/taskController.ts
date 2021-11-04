import { Request, Response, Router } from 'express';
import Task from '../db/models/taskModel'

export default class TaskController {
  async add(req: Request, res: Response): Promise<void> {
    const { description, isCompleted } = req.body;

    const newTask = new Task({ description, isCompleted });
    try {
      await newTask.save();
      res.sendStatus(200)
    } catch (err: any) {
      for (const key in err.errors) {
        console.log(err.errors[key].message)
      }
      res.sendStatus(400)
    }
  }
  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await Task.deleteOne({_id: id});
      res.sendStatus(200)
    } catch (err: any) {
      for (const key in err.errors) {
        console.log(err.errors[key].message)
      }
      res.sendStatus(400)
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const allTasks = await Task.find({})
    res.status(200).send(allTasks)
  }
}

