import toDoItem from '../interfaces/ToDoInterface'
 
export default class ToDoCollection{
  constructor(public id: number, public userId:number, public toDoItems: toDoItem[]) { }

}