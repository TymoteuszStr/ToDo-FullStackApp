import { TaskArchiveModel, TaskArchive } from '../db/models/taskArchiveModel';
import { Task } from '../db/models/taskModel';

class TaskArchiveService {
  async saveTask(taskToArchive: any): Promise<boolean> {
    const { _id, description, isCompleted } = taskToArchive
    try {
      const newArchiveTask: TaskArchive = new TaskArchiveModel({taskId: _id, description, isCompleted });
      await newArchiveTask.save()
      return true
    }
    catch (err) {
      console.log(err)
      return false
    }
  }
}

export default new TaskArchiveService();