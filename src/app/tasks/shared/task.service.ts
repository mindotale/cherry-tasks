import { Observable } from 'rxjs';
import { Task } from './task.model';
import { Signal } from '@angular/core';

export abstract class TaskService {
  abstract tasks: Signal<Task[]>;
  abstract loadTasks(): Observable<Task[]>;
  abstract createTask(task: Task): Observable<Task>;
  abstract updateTask(task: Task): Observable<Task>;
  abstract deleteTask(id: string): Observable<void>;
}
