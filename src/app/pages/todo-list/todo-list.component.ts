import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card'; 
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { TodoFormComponent } from '../../components/todo-form/todo-form.component';
import { TodoItemComponent } from "../../components/todo-item/todo-item.component";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    MatTabsModule,
    MatCardModule,
    MatListModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    TodoItemComponent
],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  todos = signal<Todo[]>([]);

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private todoService: TodoService
  ) {}
  
  ngOnInit() {
    this.loadTodos();
  }
  
  loadTodos() {
    this.todoService.getTodos().subscribe({
      next: (data) => this.todos.set(data),
      error: () => this.snackBar.open('Failed to load todos', 'Close', { duration: 2000 })
    });
  }
  
  openForm(todo?: Todo) {
    const dialogRef = this.dialog.open(TodoFormComponent, {
      width: '400px',
      data: todo || null
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (todo) {
          // ✅ UPDATE on server
          this.todoService.updateTodo(todo.id!, {
            ...todo,
            description: result.description,
            dueDate: result.dueDate
          }).subscribe({
            next: (updated) => {
              this.todos.update(list =>
                list.map(t => t.id === updated.id ? updated : t)
              );
              this.snackBar.open('Todo updated', 'Close', { duration: 2000 });
            },
            error: () => this.snackBar.open('Failed to update todo', 'Close', { duration: 2000 })
          });
        } else {
          // ✅ CREATE on server
          const newTodo: Todo = {
            description: result.description,
            dueDate: result.dueDate,
            creationDate: new Date().toISOString(),
            completed: false
          };
  
          this.todoService.createTodo(newTodo).subscribe({
            next: (created) => {
              this.todos.update(list => [...list, created]);
              this.snackBar.open('New todo created', 'Close', { duration: 2000 });
            },
            error: () => this.snackBar.open('Failed to create todo', 'Close', { duration: 2000 })
          });
        }
      }
    });
  }
  
  delete(todo: Todo) {
    this.todoService.deleteTodo(todo.id!).subscribe({
      next: () => {
        this.todos.update(list => list.filter(t => t.id !== todo.id));
        this.snackBar.open('Todo deleted', 'Close', { duration: 2000 });
      },
      error: () => this.snackBar.open('Failed to delete todo', 'Close', { duration: 2000 })
    });
  }
  
  deleteAllCompleted() {
    this.todoService.deleteAllCompleted(this.todos()).subscribe({
      next: () => {
        this.todos.update(list => list.filter(t => !t.completed));
        this.snackBar.open('All completed todos deleted', 'Close', { duration: 2000 });
      },
      error: () => this.snackBar.open('Failed to delete completed todos', 'Close', { duration: 2000 })
    });
  }

  onToggle(e: { id: string; completed: boolean }) {
    const current = this.todos().find(t => t.id === e.id);
    if (!current) return;
  
    const updated: Partial<Todo> = {
      ...current,
      completed: e.completed,
      completionDate: e.completed ? (current.completionDate ?? new Date().toISOString()) : null
    };
  
    this.todoService.updateTodo(e.id, updated).subscribe({
      next: (saved) => {
        this.todos.update(list =>
          list.map(t => t.id === saved.id ? saved : t)
        );
      },
      error: () => this.snackBar.open('Failed to update todo', 'Close', { duration: 2000 })
    });
  }
}
