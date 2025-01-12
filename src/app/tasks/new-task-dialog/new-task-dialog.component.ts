import { Component, computed, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { toSignal } from '@angular/core/rxjs-interop';
import { Task } from '../shared/task.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-new-task-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
  ],
  templateUrl: './new-task-dialog.component.html',
  styleUrl: './new-task-dialog.component.css',
})
export class NewTaskDialogComponent {
  private readonly maxTitleLength = 10;
  private readonly maxDescriptionLength = 100;
  private readonly dialogRef = inject(MatDialogRef<NewTaskDialogComponent>);

  form = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.maxLength(this.maxTitleLength)],
    }),
    description: new FormControl('', {
      validators: [Validators.maxLength(this.maxDescriptionLength)],
    }),
  });

  onAddClick(): void {
    if (this.form.invalid) {
      return;
    }

    const task: Task = {
      id: uuidv4(),
      title: this.form.value.title ?? '',
      description: this.form.value.description ?? '',
      completed: false,
    };

    this.dialogRef.close(task);
  }

  valueChanges = toSignal(this.form.valueChanges);

  invalidTitle = computed(() => {
    this.valueChanges();
    return this.form.controls.title.invalid;
  });
  
  invalidDescription = computed(() => {
    this.valueChanges();
    return this.form.controls.description.invalid;
  });

  titleErrorMessage = computed(() => {
    this.valueChanges();
    console.log(this.form.controls.title.errors);
    if (this.form.controls.title.hasError('maxlength')) {
      return `Title must be less than ${this.maxTitleLength} characters`;
    }

    return '';
  });

  descriptionErrorMessage = computed(() => {
    this.valueChanges();
    if (this.form.controls.description.hasError('maxlength')) {
      return `Description must be less than ${this.maxDescriptionLength} characters`;
    }

    return '';
  });
}
