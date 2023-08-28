import {Todo} from "./Todo";

export interface App {
  createForm(): string;
  addTodoEvent(): void;
  displayingTaskList(): void;
  addEventToTask(): void;
  deleteTask(id: number): any;
  completeTask(id: number): any;
  formatDate(date: Date | undefined): string;
}
