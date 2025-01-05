import { Component } from '@angular/core';
import { TaskCardComponent } from "./task-card/task-card.component";

@Component({
  selector: 'app-tasks',
  imports: [TaskCardComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

}
