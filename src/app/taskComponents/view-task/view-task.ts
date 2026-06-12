import { Component, inject } from '@angular/core';
import { Task } from '../../model/Task';
import { TaskDataService } from '../../services/TaskInformation/task-data';

@Component({
  selector: 'app-view-task',
  imports: [],
  templateUrl: './view-task.html',
  styleUrl: './view-task.css',
})
export class ViewTask {
  private taskData = inject(TaskDataService);
  protected tasksToShow = this.taskData.tasks;
}
