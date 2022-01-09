import { TaskArchiveModel, TaskArchive } from '../../db/models/Task/taskArchiveModel';
import { TaskCollection } from '../../db/models/Task/taskModel';

class TaskArchiveService {
  async saveTask(taskToArchive: TaskCollection): Promise<boolean> {
    const { _id, title, description, isCompleted, dueDate, isImportant } = taskToArchive
    try {
      const newArchiveTask: TaskArchive = new TaskArchiveModel({ taskId: _id, title, description, isCompleted, dueDate, isImportant });
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