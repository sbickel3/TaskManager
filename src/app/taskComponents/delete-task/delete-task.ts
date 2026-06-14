import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { TaskDataService } from '../../services/TaskInformation/task-data';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-delete-task',
  imports: [],
  templateUrl: './delete-task.html',
  styleUrl: './delete-task.css',
})
export class DeleteTask {
  private taskToDeleteId: number | null = null;
  private modalInstance: any;
  private taskData = inject(TaskDataService);
  protected tasksToShow = this.taskData.tasks;

  @ViewChild('deleteModal') deleteModalElement!: ElementRef;

  prepareDelete(id: number): void {
    this.taskToDeleteId = id;
    this.modalInstance = new bootstrap.Modal(this.deleteModalElement.nativeElement);
    this.modalInstance.show();
  }

  confirmDelete(): void {
    if (this.taskToDeleteId !== null) {
      this.taskData.deleteTask(this.taskToDeleteId);
      this.modalInstance.hide();
      this.taskToDeleteId = null;
    }
  }

}
