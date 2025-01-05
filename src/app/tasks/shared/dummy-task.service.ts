import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
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
      isCompleted: false,
    },
  ];

  getTasks(): Observable<Task[]> {
    return of([...this.tasks]);
  }

  getTask(id: string): Observable<Task | undefined> {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      return of({ ...task });
    } else {
      return throwError(() => new Error(`Task with id ${id} not found`));
    }
  }

  createTask(task: Task): Observable<Task> {
    if (this.tasks.find((t) => t.id === task.id)) {
      return throwError(() => new Error(`Task with id ${task.id} already exists`));
    }
    this.tasks.push({ ...task });
    return of(task);
  }

  updateTask(task: Task): Observable<Task> {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = { ...task };
      return of(task);
    } else {
      return throwError(() => new Error(`Task with id ${task.id} not found`));
    }
  }

  deleteTask(id: string): Observable<void> {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return of(undefined);
    } else {
      return throwError(() => new Error(`Task with id ${id} not found`));
    }
  }
}
