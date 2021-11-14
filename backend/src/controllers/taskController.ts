import { Request, Response, Router } from 'express';
import taskService from '../services/taskService';
import { ObjectId } from 'mongodb';

class TaskController {
  async add(req: Request, res: Response): Promise<void> {
    try {
      const { description, isCompleted } = req.body;
      const id = await taskService.saveTask(description, isCompleted)
      if(id) res.status(201).send(id)
      else res.sendStatus(400)
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

  async update(req: Request, res: Response): Promise<void> {
    try{
      const { description, isCompleted}:{description: string, isCompleted: boolean} = req.body
      const { id } = req.params
      const taskToUpdate = {_id: new ObjectId(id), description, isCompleted}
      const isDone = await taskService.updateTask(taskToUpdate)
      if(isDone) res.status(200).send(isDone)
      else res.sendStatus(400)
    } catch (err: any) {
      for (const key in err.errors) {
        console.log(err.errors[key].message)
      }
      res.sendStatus(500)
    }
    
  }


}

export default new TaskController()
