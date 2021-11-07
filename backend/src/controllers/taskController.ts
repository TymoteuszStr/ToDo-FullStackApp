import { Request, Response, Router } from 'express';
import { TaskModel, Task } from '../db/models/taskModel';
import { ObjectId } from 'mongodb';
import TaskArchiveController from './taskArchiveController';
import { Model } from 'mongoose';

const taskArchive = new TaskArchiveController()

export default class TaskController {
  async add(req: Request, res: Response): Promise<void> {

    const { description, isCompleted } = req.body;
    const _id = new ObjectId()
    const newTask = new TaskModel({ _id, description, isCompleted });

    try {
      await newTask.save();
      res.status(201).send(_id)
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
      const taskToArchive:any=  await TaskModel.findOne({ _id: id })
      await taskArchive.add(taskToArchive)
      await TaskModel.deleteOne({ _id: id })
      res.status(200).send(`Task with id = ${id} has been deleted`)
    } catch (err: any) {
      for (const key in err.errors) {
        console.log(err.errors[key].message)
      }
      res.sendStatus(500)
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const allTasks = await TaskModel.find({})
    res.status(200).send(allTasks)
  }

}

