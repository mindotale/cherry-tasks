import { Component, input } from '@angular/core';
import { Task } from '../shared/task.model';
import { TaskCardComponent } from "../task-card/task-card.component";

@Component({
  selector: 'app-task-list',
  imports: [TaskCardComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks = input.required<Task[]>();
}
