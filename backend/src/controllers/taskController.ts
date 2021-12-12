import { Request, Response, Router } from 'express';
import { Task } from '../db/models/taskModel';
import taskService from '../services/taskService';

class TaskController {
  async add(req: Request, res: Response): Promise<void> {
    try {
      const task: Task = req.body;
      const id = await taskService.saveTask(task)
      if (id) res.status(201).send(id)
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
      if (isDone) res.status(200).send(`Task with id = ${id} has been deleted`)
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
    try {
      const { id } = req.params
      const taskToUpdate: Task = req.body
      const updatedTask = await taskService.update(id, taskToUpdate)
      if (updatedTask) res.status(200).send(updatedTask)
      else res.sendStatus(400)
    } catch (err: any) {
      for (const key in err.errors) {
        console.log(err.errors[key].message)
      }
      res.sendStatus(500)
    }
  }

  async updateProperty(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const property = req.body
      const updatedTask = await taskService.updateProperty(id, property)
      if (updatedTask) res.status(200).send(updatedTask)
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
