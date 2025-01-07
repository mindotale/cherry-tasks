import { Component, inject } from '@angular/core';
import { TaskService } from './shared/task.service';
import { TaskListComponent } from "./task-list/task-list.component";

@Component({
  selector: 'app-tasks',
  imports: [TaskListComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  taskService = inject(TaskService);
  tasks = this.taskService.tasks;
}
