import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
