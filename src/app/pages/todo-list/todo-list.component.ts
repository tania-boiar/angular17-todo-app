import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card'; 
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Todo } from '../../models/todo.model';
import { TodoFormComponent } from '../../components/todo-form/todo-form.component';

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
    DatePipe
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  todos = signal<Todo[]>([
    {
      id: '1',
      description: 'Complete the Angular 17 Todo App',
      creationDate: '2025-09-20',
      dueDate: '2025-09-22',
      completed: false
    },
    {
      id: '2',
      description: 'Prepare the first part of theory',
      creationDate: '2025-09-20',
      dueDate: '2025-09-22',
      completed: true,
      completionDate: '2025-09-21'
    },
    {
      id: '3',
      description: 'Prepare the second part of theory',
      creationDate: '2025-09-20',
      dueDate: '2025-10-06',
      completed: false
    }
  ]);

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  openForm(todo?: Todo) {
    const dialogRef = this.dialog.open(TodoFormComponent, {
      width: '400px',
      data: todo || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (todo) {
          this.todos.update(list =>
            list.map(t =>
              t.id === todo.id
                ? {
                    ...t,
                    description: result.description,
                    dueDate: result.dueDate,
                    completed: t.completed,
                    completionDate: t.completed
                      ? t.completionDate ?? new Date().toISOString().split('T')[0]
                      : undefined
                  }
                : t
            )
          );
        } else {
          const newTodo: Todo = {
            id: crypto.randomUUID(),
            description: result.description,
            dueDate: result.dueDate,
            creationDate: new Date().toISOString().split('T')[0],
            completed: false
          };

          this.todos.update(list => [...list, newTodo]);
        }
      }
    });
  }

  delete(todo: Todo) {
    this.todos.update(list => list.filter(t => t.id !== todo.id));
  }

  deleteAllCompleted() {
    this.todos.update(list => list.filter(todo => !todo.completed));
  }

  showMessage(message: string, isError = false) {
    this.snackBar.open(message, 'Close', {
      duration: 2500,
      panelClass: isError ? ['snackbar-error'] : ['snackbar-success']
    });
  }
}
