import { Response, Router } from 'express';
import { ITask } from '../db/models/Task/taskModel';
import taskService from '../services/Tasks/taskService';

class TaskController {

  async add(req: any, res: Response): Promise<void> {
    try {
      const { task }: { task: ITask } = req.body;
      if (task.userId !== req.USER_ID) throw 'wrong user id'
      const newTask = await taskService.saveTask(task)
      if (newTask) res.status(201).send(newTask)
      else res.sendStatus(400)

    } catch (err: any) {
      for (const key in err.errors) {
        console.log(err.errors[key].message)
      }
      res.sendStatus(400)
    }

  }

  async delete(req: any, res: Response): Promise<void> {
    const { id, userId } = req.params;
    try {
      if (userId !== req.USER_ID) throw 'wrong user id'

      const isDone = await taskService.archiveTask(id)
      if (isDone) res.status(200).send(`Task with id = ${id} has been deleted`)
      else res.status(400).send(`Task with id = ${id} can't be deleted`)
    } catch (err: any) {

      for (const key in err.errors) {
        console.log(err.errors[key].message)
      }
      res.sendStatus(400)
    }
  }

  async getAll(req: any, res: Response): Promise<void> {
    const { userId } = req.params;
    if (userId !== req.USER_ID) throw 'wrong user id'

    const userTasks = await taskService.getAllUserTasks(req.USER_ID)
    res
      .status(200)
      .json(userTasks)
  }

  async update(req: any, res: Response): Promise<void> {
    try {
      const taskToUpdate: ITask = req.body
      if (taskToUpdate.userId !== req.USER_ID) throw 'wrong user id'
      const { id } = req.params
      const updatedTask = await taskService.update(id, taskToUpdate)
      if (updatedTask) res.status(200).send(updatedTask)
      else res.sendStatus(400)
    } catch (err: any) {
      for (const key in err.errors) {
        console.log(err.errors[key].message)
      }
      res.sendStatus(400)
    }
  }

  async updateProperty(req: any, res: Response): Promise<void> {
    try {
      const { userId }: { userId: string } = req.body;
      if (userId !== req.USER_ID) throw 'wrong user id'

      const { id } = req.params
      const updatedTask = await taskService.updateProperty(id, req.body.property, userId)
      if (updatedTask) res.status(200).send(updatedTask)
      else res.sendStatus(400)
    } catch (err: any) {
      for (const key in err.errors) {
        console.log(err.errors[key].message)
      }
      res.sendStatus(400)
    }
  }
}

export default new TaskController()
