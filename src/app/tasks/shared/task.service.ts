import { Observable } from 'rxjs';
import { Task } from './task.model';

export abstract class TaskService {
  abstract getTasks(): Observable<Task[]>;
  abstract getTask(id: string): Observable<Task | undefined>;
  abstract createTask(task: Task): Observable<Task>;
  abstract updateTask(task: Task): Observable<Task>;
  abstract deleteTask(id: string): Observable<void>;
}
