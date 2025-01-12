import { Injectable, signal, Signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root',
})
export class DummyTaskService implements TaskService {
  private _tasks = signal<Task[]>([
    {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      completed: false,
    },
    { id: '2', title: 'Task 2', description: 'Description 2', completed: false },
    { id: '3', title: 'Task 3', description: 'Description 3', completed: false },
  ]);

  tasks = this._tasks.asReadonly();

  loadTasks(): Observable<Task[]> {
    return of(this._tasks());
  }

  createTask(task: Task): Observable<Task> {
    const exists = this._tasks().some((t) => t.id === task.id);
    if (exists) {
      return throwError(() => new Error('Task already exists'));
    }
    this._tasks.update((tasks) => [...tasks, task]);
    return of(task);
  }

  updateTask(task: Task): Observable<Task> {
    const exists = this._tasks().some((t) => t.id === task.id);
    if (!exists) {
      return throwError(() => new Error('Task does not exist'));
    }

    this._tasks.update((tasks) =>
      tasks.map((t) => (t.id === task.id ? task : t))
    );
    return of(task);
  }

  deleteTask(id: string): Observable<void> {
    const exists = this._tasks().some((t) => t.id === id);
    if (!exists) {
      return throwError(() => new Error('Task does not exist'));
    }
    this._tasks.update((tasks) => tasks.filter((task) => task.id !== id));
    return of(undefined);
  }
}
