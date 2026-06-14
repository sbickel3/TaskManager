import { Component, inject, computed } from '@angular/core';
import { TaskDataService } from '../../services/TaskInformation/task-data';

@Component({
  selector: 'app-view-task',
  imports: [],
  templateUrl: './view-task.html',
  styleUrl: './view-task.css',
})
export class ViewTask {
  private taskData = inject(TaskDataService);

  // use computed signal to convert map to list for template for loop
  protected tasksToShow = computed(() => {
    return Array.from(this.taskData.tasks().values());
  });
}
