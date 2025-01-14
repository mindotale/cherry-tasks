import { Component, inject } from '@angular/core';
import { TaskService } from './shared/task.service';
import { TaskListComponent } from './task-list/task-list.component';
import { AddEditTaskDialogComponent } from './add-edit-task-dialog/add-edit-task-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddEditTaskDialogData } from './add-edit-task-dialog/add-edit-task-dialog-data.model';
import { Task } from './shared/task.model';

@Component({
  selector: 'app-tasks',
  imports: [MatButtonModule, TaskListComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  taskService = inject(TaskService);
  tasks = this.taskService.tasks;

  private readonly dialog = inject(MatDialog);

  addTaskClick(): void {
    const dialogRef = this.dialog.open<
      AddEditTaskDialogComponent,
      AddEditTaskDialogData,
      Task
    >(AddEditTaskDialogComponent, {
      data: {
        editMode: false,
      },
    });
    const subscription = dialogRef.afterClosed().subscribe({
      next: (task) => {
        if (task) {
          this.taskService.createTask(task).subscribe();
        }

        subscription.unsubscribe();
      },
    });
  }
}
