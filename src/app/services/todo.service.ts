import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = 'https://68cec39c6dc3f350777ff464.mockapi.io/api/v1/todos';

  constructor(private http: HttpClient) {}

  // Get all todos
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  // Get todo by id
  getTodo(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.baseUrl}/${id}`);
  }

  // Create new todo
  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.baseUrl, todo);
  }

  // Update existing todo
  updateTodo(id: string, todo: Partial<Todo>): Observable<Todo> {
    return this.http.put<Todo>(`${this.baseUrl}/${id}`, todo);
  }

  // Delete todo by id
  deleteTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Delete all completed todos
  deleteAllCompleted(todos: Todo[]) {
    const requests = todos
      .filter(t => t.completed)
      .map(t =>
        this.deleteTodo(t.id!).pipe(
          catchError(err => {
            console.error('Delete failed for todo', t.id, err);
            return of(null);
          })
        )
      );
  
    return forkJoin(requests);
  }
}
