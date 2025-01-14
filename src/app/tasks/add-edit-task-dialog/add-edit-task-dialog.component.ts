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
import { AddEditTaskDialogData } from './add-edit-task-dialog-data.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-edit-task-dialog',
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
  templateUrl: './add-edit-task-dialog.component.html',
  styleUrl: './add-edit-task-dialog.component.css',
})
export class AddEditTaskDialogComponent {
  private readonly data = inject<AddEditTaskDialogData>(MAT_DIALOG_DATA);
  private readonly maxTitleLength = 100;
  private readonly maxDescriptionLength = 1000;
  private readonly dialogRef = inject(MatDialogRef<AddEditTaskDialogComponent>);
  private readonly initialTask: Task = this.data.task ?? {
    id: uuidv4(),
    title: '',
    description: '',
    completed: false,
  };

  form = new FormGroup({
    title: new FormControl(this.initialTask.title, {
      validators: [Validators.maxLength(this.maxTitleLength)],
    }),
    description: new FormControl(this.initialTask.description, {
      validators: [Validators.maxLength(this.maxDescriptionLength)],
    }),
  });

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

  headerText(): string {
    return this.data.editMode ? 'Edit Task' : 'Add Task';
  }

  completeButtonText(): string {
    return this.data.editMode ? 'Edit' : 'Add';
  }

  onCompleteClick(): void {
    if (this.form.invalid) {
      return;
    }

    const task: Task = {
      id: this.initialTask.id,
      title: this.form.value.title ?? '',
      description: this.form.value.description ?? '',
      completed: this.initialTask.completed,
    };

    this.dialogRef.close(task);
  }
}
