import { Request, Response, Router } from 'express';
import taskService from '../services/taskService';

class TaskController {
  async add(req: Request, res: Response): Promise<void> {
    try {
      const { description, isCompleted } = req.body;
      const id = await taskService.saveTask(description, isCompleted)
      res.status(201).send(id)
    } catch (err: any) {
      for (const key in err.errors) {
        console.log(err.errors[key].message)
      }
      res.sendStatus(500)
    }

  }
  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const isDone = await taskService.archiveTask(id)
      if(isDone) res.status(200).send(`Task with id = ${id} has been deleted`)
      else res.status(400).send(`Task with id = ${id} can't be deleted`)
    } catch (err: any) {
      for (const key in err.errors) {
        console.log(err.errors[key].message)
      }
      res.sendStatus(500)
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const allTasks = await taskService.getAllTasks()
    res.status(200).send(allTasks)
  }

}

export default new TaskController()
