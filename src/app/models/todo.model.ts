export interface Todo {
  id?: string;
  description: string;
  creationDate: string;
  dueDate: string | null;
  completed: boolean;
  completionDate?: string | null;
}