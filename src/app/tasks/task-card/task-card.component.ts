import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-task-card',
  imports: [MatCardModule, MatCheckboxModule, MatIconModule, MatButtonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  task = input.required<Task>();
  taskService = inject(TaskService);

  onToggleClick(checked: boolean) {
    const completed = checked;
    this.taskService.updateTask({ ...this.task(), completed: completed }).subscribe();
  }

  onEditClick() {
    console.log('Edit task');
  }

  onDeleteClick() {
    this.taskService.deleteTask(this.task().id).subscribe();
  }
}
