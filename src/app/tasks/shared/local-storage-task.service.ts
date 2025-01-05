import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageTaskService implements TaskService {
  private readonly storageKey = 'tasks';

  constructor() { }

  getTasks(): Observable<Task[]> {
    return of(this.getTasksFromStorage());
  }

  getTask(id: string): Observable<Task | undefined> {
    const task = this.getTasksFromStorage().find(t => t.id === id);
    if (task) {
      return of(task);
    } else {
      return throwError(() => new Error(`Task with id ${id} not found`));
    }
  }

  createTask(task: Task): Observable<Task> {
    const tasks = this.getTasksFromStorage();
    if (tasks.find(t => t.id === task.id)) {
      return throwError(() => new Error(`Task with id ${task.id} already exists`));
    }
    tasks.push(task);
    this.saveTasksToStorage(tasks);
    return of(task);
  }

  updateTask(task: Task): Observable<Task> {
    const tasks = this.getTasksFromStorage();
    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
      this.saveTasksToStorage(tasks);
      return of(task);
    } else {
      return throwError(() => new Error(`Task with id ${task.id} not found`));
    }
  }

  deleteTask(id: string): Observable<void> {
    const tasks = this.getTasksFromStorage();
    const updatedTasks = tasks.filter(t => t.id !== id);
    if (tasks.length !== updatedTasks.length) {
      this.saveTasksToStorage(updatedTasks);
      return of(undefined);
    } else {
      return throwError(() => new Error(`Task with id ${id} not found`));
    }
  }

  private getTasksFromStorage(): Task[] {
    const tasksJson = localStorage.getItem(this.storageKey);
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  private saveTasksToStorage(tasks: Task[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }
}