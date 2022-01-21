import { Request, Response, Router } from 'express';
import { ITask } from '../db/models/Task/taskModel';
import taskService from '../services/Tasks/taskService';

class TaskController {

  async add(req: Request, res: Response): Promise<void> {
    try {

      const task: ITask = req.body;
      const newTask = await taskService.saveTask(task)
      console.log(newTask)
      if (newTask) res.status(201).send(newTask)
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
    res
      .status(200)
      .json(allTasks)
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const taskToUpdate: ITask = req.body
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
      const updatedTask = await taskService.updateProperty(id, req.body)
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
