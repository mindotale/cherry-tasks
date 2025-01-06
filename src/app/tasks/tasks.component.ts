import { Component, inject, OnInit, signal } from '@angular/core';
import { Task } from './shared/task.model';
import { TaskService } from './shared/task.service';
import { TaskListComponent } from "./task-list/task-list.component";

@Component({
  selector: 'app-tasks',
  imports: [TaskListComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  tasks = signal<Task[]>([]);
  taskService = inject(TaskService);

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks.set(tasks);
    });
  }
}
