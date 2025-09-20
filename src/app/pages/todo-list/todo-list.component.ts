import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/todo.model';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    MatTabsModule,
    MatListModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule
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
}
