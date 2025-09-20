import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinner } from "@angular/material/progress-spinner";

import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [FormsModule, DatePipe, MatIconModule, MatButtonModule, MatListModule, MatProgressSpinner, MatCheckbox],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  todo = input.required<Todo>();

  editTodo = output<Todo>();
  removeTodo = output<Todo>();
  toggleTodoCompleted = output<{ id: string; completed: boolean }>();

  onEdit() {
    this.editTodo.emit(this.todo());
  }

  onDelete() {
    this.removeTodo.emit(this.todo());
  }

  onToggle(id: string, completed: boolean) {
    this.toggleTodoCompleted.emit({ id, completed });
  }
}
