import { Component, inject } from '@angular/core';
import { TaskService } from './shared/task.service';
import { TaskListComponent } from './task-list/task-list.component';
import { NewTaskDialogComponent } from './new-task-dialog/new-task-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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
    const dialogRef = this.dialog.open(NewTaskDialogComponent);
    const subscription = dialogRef.afterClosed().subscribe((task) => {
      if (task) {
        this.taskService.createTask(task).subscribe();
      }

      subscription.unsubscribe();
    });
  }
}
