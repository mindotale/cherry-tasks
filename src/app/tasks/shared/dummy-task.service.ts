import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root',
})
export class DummyTaskService implements TaskService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Dummy Task 1',
      description: 'This is a dummy task.',
      isCompleted: false,
    },
    {
      id: '2',
      title: 'Dummy Task 2',
      description: 'Another dummy task.',
      isCompleted: false
    },
  ];

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  getTask(id: string): Observable<Task | undefined> {
    const task = this.tasks.find((t) => t.id === id);
    return of(task);
  }

  createTask(task: Task): Observable<Task> {
    this.tasks.push(task);
    return of(task);
  }

  updateTask(id: string, task: Task): Observable<Task> {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...task, id };
    }
    return of(this.tasks[index]);
  }

  deleteTask(id: string): Observable<void> {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    return of();
  }
}
