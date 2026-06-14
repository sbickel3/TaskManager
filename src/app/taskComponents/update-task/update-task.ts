import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { TaskDataService } from '../../services/TaskInformation/task-data';
import { Task } from '../../model/Task';

@Component({
  selector: 'app-update-task',
  imports: [ReactiveFormsModule],
  templateUrl: './update-task.html',
  styleUrl: './update-task.css',
})
export class UpdateTask {
  private fb = inject(FormBuilder);
  private taskData = inject(TaskDataService);
  protected tasksToShow = this.taskData.tasks;
  
  private modalInstance: any;
  private currentTaskId: number | null = null;

  @ViewChild('updateModal') updateModalElement!: ElementRef;

  // Define the form structure
  updateForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  openUpdateModal(task: Task): void {
    this.currentTaskId = task.id;
    
    this.updateForm.patchValue({
      title: task.title,
      description: task.description
    });

    this.modalInstance = new bootstrap.Modal(this.updateModalElement.nativeElement);
    this.modalInstance.show();
  }

  saveUpdate(): void {
    if (this.updateForm.valid && this.currentTaskId !== null) {
      const updatedTask: Task = {
        id: this.currentTaskId,
        title: this.updateForm.value.title!,
        description: this.updateForm.value.description!
      };

      this.taskData.updateTask(updatedTask);
      this.modalInstance.hide();
    }
  }
}
