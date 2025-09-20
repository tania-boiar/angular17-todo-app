import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  imports: [FormsModule, DatePipe, MatCheckboxModule, MatIconModule, MatButtonModule, MatListModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() todo!: Todo;

  @Output() edit = new EventEmitter<Todo>();
  @Output() remove = new EventEmitter<Todo>();

  onEdit() {
    this.edit.emit(this.todo);
  }

  onDelete() {
    this.remove.emit(this.todo);
  }
}
