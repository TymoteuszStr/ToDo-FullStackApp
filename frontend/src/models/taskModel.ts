export default interface Task {
  _id: string;
  description: string;
  isCompleted?: boolean;
  dueDate?: Date;
  isImportant?: boolean;
}
