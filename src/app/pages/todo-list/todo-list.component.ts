import { Component, computed, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card'; 
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { TodoFormComponent } from '../../components/todo-form/todo-form.component';
import { TodoTabComponent } from "../../components/todo-tab/todo-tab.component";
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
    TodoTabComponent,
    TodoItemComponent,
    MatProgressSpinnerModule
],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  todos = signal<Todo[]>([]);
  completedTodos = computed(() => this.todos().filter(todo => todo.completed));
  activeTodos = computed(() => this.todos().filter(todo => !todo.completed));
  loading = signal(false);

  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private todoService = inject(TodoService);

  private replaceTodo(updated: Todo) {
    this.todos.update(list =>
      list.map(todo => todo.id === updated.id ? updated : todo)
    );
  }

  ngOnInit() {
    this.loadTodos();
  }
  
  openForm(todo?: Todo) {
    const dialogRef = this.dialog.open(TodoFormComponent, {
      width: '400px',
      data: todo || null
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (todo) {
          this.todoService.updateTodo(todo.id!, {
            ...todo,
            description: result.description,
            dueDate: result.dueDate
          }).subscribe({
            next: (updated) => {
              this.replaceTodo(updated);
              this.snackBar.open('Todo updated', 'Close', { duration: 2000 });
            },
            error: () => this.snackBar.open('Failed to update todo', 'Close', { duration: 2000 })
          });
        } else {
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
  
  delete(todoToDelete: Todo) {
    const prev = [...this.todos()];
  
    this.todos.update(list =>
      list.filter(existingTodo => existingTodo.id !== todoToDelete.id)
    );
  
    this.todoService.deleteTodo(todoToDelete.id!).subscribe({
      next: () => {
        this.snackBar.open('Todo deleted', 'Close', { duration: 2000 });
      },
      error: () => {
        this.todos.set(prev);
  
        this.snackBar.open('Failed to delete todo', 'Retry', { duration: 3000 })
          .onAction()
          .subscribe(() => this.delete(todoToDelete));
      }
    });
  }
  

  deleteAllCompleted() {
    const prev = [...this.todos()];
    this.todoService.deleteAllCompleted(this.completedTodos()).subscribe({
      next: () => this.todos.update(list => list.filter(t => !t.completed)),
      error: () => {
        this.todos.set(prev);
        this.snackBar.open('Failed to delete completed todos', 'Close', { duration: 2000 });
      }
    });
  }

  onToggle(e: { id: string; completed: boolean }) {
    const current = this.todos().find(todo => todo.id === e.id);
    if (!current) return;
  
    const updated: Todo = {
      ...current,
      completed: e.completed,
      completionDate: e.completed ? new Date().toISOString() : null
    };
  
    this.replaceTodo(updated);

    this.todoService.updateTodo(e.id, updated).subscribe({
      next: (saved) => this.replaceTodo(saved),
      error: () => {
        this.replaceTodo(current);
        this.snackBar.open('Failed to update todo', 'Close', { duration: 2000 });
      }
    });
  }
  
  loadTodos() {
    this.loading.set(true);
    this.todoService.getTodos().subscribe({
      next: (data) => {
        this.todos.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.snackBar.open('Failed to load todos', 'Close', { duration: 2000 });
        this.loading.set(false);
      }
    });
  }
}
