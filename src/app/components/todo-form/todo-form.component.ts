import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  private formBuilder = inject(FormBuilder);
  private dialogRef = inject<MatDialogRef<TodoFormComponent, Todo>>(MatDialogRef);
  data: Todo | null = inject(MAT_DIALOG_DATA);

  form = this.formBuilder.group({
    description: ['', [Validators.required, Validators.minLength(3)]],
    dueDate: [null as Date | null, Validators.required]
  });
   
  ngOnInit() {
    if (this.data) {
      this.form.patchValue({
        ...this.data,
        dueDate: this.data.dueDate ? new Date(this.data.dueDate) : null
      });
    }
  }

  save() {
    if (this.form.valid) {
      const raw = this.form.value;
  
      const todo: Todo = {
        id: this.data?.id,
        description: raw.description ?? '',
        dueDate: raw.dueDate ? new Date(raw.dueDate).toISOString() : null,
        creationDate: this.data?.creationDate ?? new Date().toISOString(),
        completed: this.data?.completed ?? false,
        completionDate: this.data?.completionDate ?? null
      };
  
      this.dialogRef.close(todo);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
