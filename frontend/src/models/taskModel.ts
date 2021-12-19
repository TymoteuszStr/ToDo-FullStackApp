export default interface Task {
  _id: string;
  title: string;
  description?: string;
  isCompleted?: boolean;
  dueDate?: Date;
  isImportant?: boolean;
}
