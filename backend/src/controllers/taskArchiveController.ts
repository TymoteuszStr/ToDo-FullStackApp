import { Response } from 'express';
import taskArchiveService from '../services/Tasks/taskArchiveService';

class TaskController {

  async getAll(req: any, res: Response): Promise<void> {
    const { userId }: { userId: string } = req.body;
    if (userId !== req.USER_ID) throw 'wrong user id'

    const userTasksArchive = await taskArchiveService.getAllUserTasks(userId)
    res
      .status(200)
      .json(userTasksArchive)
  }
}

export default new TaskController()
