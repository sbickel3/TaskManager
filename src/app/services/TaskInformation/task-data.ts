import { effect, Injectable, signal, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Task } from '../../model/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskDataService {
private STORAGE_KEY = 'my_tasks_app';

  tasks = signal<Task[]>([]);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      const storedData = localStorage.getItem(this.STORAGE_KEY);
      if (storedData) {
        this.tasks.set(JSON.parse(storedData));
      }
    }

   // Use an Effect to save to LocalStorage whenever the Signal changes
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks()));
      }
    });
  }

  addTask(newTask: Task): void {
    this.tasks.update(currentTasks => [...currentTasks, newTask]);
  }

  deleteTask(id: number): void {
    this.tasks.update(currentTasks => currentTasks.filter(t => t.id !== id));
  }

  updateTask(updatedTask: Task): void {
    this.tasks.update(currentTasks =>  currentTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  }
}
