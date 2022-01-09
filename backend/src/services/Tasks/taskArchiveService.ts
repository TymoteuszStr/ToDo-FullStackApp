import TaskArchive, { ITaskArchiveDocument, } from '../../db/models/Task/taskArchiveModel';
import { ITaskDocument } from '../../db/models/Task/taskModel';

class TaskArchiveService {
  async saveTask(taskToArchive: ITaskDocument): Promise<boolean> {
    const { _id, title, description, isCompleted, dueDate, isImportant } = taskToArchive
    try {
      const newArchiveTask: ITaskArchiveDocument = new TaskArchive({ taskId: _id, title, description, isCompleted, dueDate, isImportant });
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