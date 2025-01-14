import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditTaskDialogComponent } from '../add-edit-task-dialog/add-edit-task-dialog.component';
import { AddEditTaskDialogData } from '../add-edit-task-dialog/add-edit-task-dialog-data.model';

@Component({
  selector: 'app-task-card',
  imports: [MatCardModule, MatCheckboxModule, MatIconModule, MatButtonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  task = input.required<Task>();
  taskService = inject(TaskService);

  private readonly dialog = inject(MatDialog);

  onToggleClick(checked: boolean) {
    const completed = checked;
    this.taskService.updateTask({ ...this.task(), completed: completed }).subscribe();
  }

  onEditClick() {
    const dialogRef = this.dialog.open<AddEditTaskDialogComponent, AddEditTaskDialogData, Task>(AddEditTaskDialogComponent, {
      data: {
        editMode: true,
        task: this.task(),
      },
    });

    const subscription = dialogRef.afterClosed().subscribe({
      next: (task) => {
        if (task) {
          this.taskService.updateTask(task).subscribe();
        }

        subscription.unsubscribe();
      },
    });
  }

  onDeleteClick() {
    this.taskService.deleteTask(this.task().id).subscribe();
  }
}
