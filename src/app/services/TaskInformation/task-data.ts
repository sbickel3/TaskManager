import { effect, Injectable, signal, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Task } from '../../model/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskDataService {
  private STORAGE_KEY = 'my_tasks_app';

  tasks = signal<Map<number, Task>>(new Map());

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      const storedData = localStorage.getItem(this.STORAGE_KEY);
      if (storedData) {
        try {
          const parsedObject = JSON.parse(storedData);
          
          // Convert the plain localStorage object entries back into a native Map
          const restoredMap = new Map<number, Task>(
            Object.entries(parsedObject).map(([key, value]) => [Number(key), value as Task])
          );
          
          this.tasks.set(restoredMap);
        } catch (e) {
          console.error('Failed to parse localStorage data', e);
          this.tasks.set(new Map());
        }
      }
    }

    // Use an Effect to serialize the Map to a plain object string for LocalStorage
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        const currentMap = this.tasks();
        const objectToSave = Object.fromEntries(currentMap.entries());
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(objectToSave));
      }
    });
  }

  addTask(newTask: Task): boolean {
    if (this.tasks().has(newTask.id)) {
      return false;
    }

    this.tasks.update(currentMap => new Map(currentMap).set(newTask.id, newTask));
    return true;
  }

  deleteTask(id: number): void {
    const isDeleted = this.tasks().delete(id);

    if (isDeleted) {
      this.tasks.update(() => new Map(this.tasks()));
    } else {
      console.log("error removing task");
    }
  }

  updateTask(updatedTask: Task): void {
    this.tasks.update(currentMap => new Map(currentMap).set(updatedTask.id, updatedTask));
  }
}