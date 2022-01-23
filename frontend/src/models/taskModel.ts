export default interface Task {
  _id: string;
  userId: string,
  title: string;
  description?: string;
  isCompleted?: boolean;
  dueDate?: Date;
  isImportant?: boolean;
}
