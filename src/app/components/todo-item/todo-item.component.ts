import { Component, input, output } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatListModule
  ],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  todo = input.required<Todo>();

  edit = output<Todo>();
  remove = output<Todo>();
  toggleCompleted = output<{ id: string; completed: boolean }>();

  onEdit() {
    this.edit.emit(this.todo());
  }

  onDelete() {
    this.remove.emit(this.todo());
  }

  onToggle(completed: boolean) {
    this.toggleCompleted.emit({
      id: this.todo().id!,
      completed
    });
  }
}
