export interface Todo {
  id?: string;
  description: string;
  creationDate: string;
  dueDate: string;
  completed: boolean;
  completionDate?: string;
}