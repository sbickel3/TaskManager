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
  // protected tasks: Task[] = [];
  private taskToDeleteId: number | null = null;
  private modalInstance: any;
  private taskData = inject(TaskDataService);
  protected tasksToShow = this.taskData.tasks;

  @ViewChild('deleteModal') deleteModalElement!: ElementRef;

  // Store the ID and open the modal
  prepareDelete(id: number): void {
    this.taskToDeleteId = id;
    this.modalInstance = new bootstrap.Modal(this.deleteModalElement.nativeElement);
    this.modalInstance.show();
  }

  // Perform the actual deletion
  confirmDelete(): void {
    if (this.taskToDeleteId !== null) {
      this.taskData.deleteTask(this.taskToDeleteId);
      this.modalInstance.hide(); // Close the modal
      this.taskToDeleteId = null;
    }
  }

}
