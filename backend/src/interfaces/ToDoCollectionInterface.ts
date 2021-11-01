import ToDoItem from './ToDoInterface'

export default interface ToDoCollecion {
  id: Number;
  userId: Number;
  toDoItems: ToDoItem[];
}