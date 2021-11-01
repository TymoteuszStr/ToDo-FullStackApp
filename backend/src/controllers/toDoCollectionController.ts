import { Request, Response, Router } from 'express';
import ToDoCollection from '../interfaces/ToDoCollectionInterface'
export default class ToDoCollectionController {
  async getAllTodosFromCollection(req: Request, res: Response): Promise<void>{
    const userId = Number(req.params.userId);
    console.log(req,res);

  }
}

