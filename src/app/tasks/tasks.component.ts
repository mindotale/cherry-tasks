import { Component } from '@angular/core';
import { TaskCardComponent } from "./task-card/task-card.component";
import { Task } from './shared/task.model';

@Component({
  selector: 'app-tasks',
  imports: [TaskCardComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  task: Task = {
    id: '1',
    title: 'Task 1',
    description: 'Description 1',
    completed: false
  }; 
}
