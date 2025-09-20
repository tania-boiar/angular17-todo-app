import { Component, input, output, computed } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { TodoItemComponent } from "../todo-item/todo-item.component";
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-tab',
  standalone: true,
  imports: [MatListModule, MatButtonModule, MatIconModule, TodoItemComponent],
  templateUrl: './todo-tab.component.html',
  styleUrls: ['./todo-tab.component.scss']
})
export class TodoTabComponent {
  todos = input<Todo[]>([]);
  filter = input<'all' | 'active' | 'completed'>('all');

  editTodo = output<Todo>();
  removeTodo = output<Todo>();
  toggleTodoCompleted = output<{ id: string; completed: boolean }>();
  deleteCompletedTodos = output<void>();

  filteredTodos = computed(() => {
    const todos = this.todos();
    const filter = this.filter();
  
    if (filter === 'active') {
      return todos.filter(todo => !todo.completed);
    }
  
    if (filter === 'completed') {
      return todos.filter(todo => todo.completed);
    }
  
    return todos;
  });
}
