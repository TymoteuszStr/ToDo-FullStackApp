import { TaskArchiveModel, TaskArchive } from '../db/models/taskArchiveModel';
import { TaskCollection } from '../db/models/taskModel';

class TaskArchiveService {
  async saveTask(taskToArchive: TaskCollection): Promise<boolean> {
    const { _id, description, isCompleted, dueDate, isImportant } = taskToArchive
    try {
      const newArchiveTask: TaskArchive = new TaskArchiveModel({ taskId: _id, description, isCompleted, dueDate, isImportant });
      await newArchiveTask.save()
      return true
    }
    catch (err: any) {
      console.log(err)
      return false
    }
  }
}

export default new TaskArchiveService();