import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../../model/Task';
import { TaskDataService } from '../../services/TaskInformation/task-data';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask {
  private formBuilder = inject(FormBuilder); 
  private taskData = inject(TaskDataService);

  // Grab the toast element from the template
  @ViewChild('successToast') successToast!: ElementRef;
  @ViewChild('failureToast') failureToast!: ElementRef;

  taskForm = this.formBuilder.group({
    id: ['', [Validators.required]],
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  onSubmit(): void {
    if (this.taskForm.valid) {

      const newTask: Task = {
        id: Number(this.taskForm.value.id!),
        title: this.taskForm.value.title!,
        description: this.taskForm.value.description!,
      };
      
      console.log("form data: " + newTask)
      const validTask: boolean = this.taskData.addTask(newTask);

      if (validTask) {
        this.showToast(this.successToast);
      } else {
        this.showToast(this.failureToast);
      }

      this.taskForm.reset();
    }
  }

  private showToast(toast: ElementRef): void {
    // Initialize and show the Bootstrap toast
    const toastToShow = new bootstrap.Toast(toast.nativeElement);
    toastToShow.show();
  }

  blockInvalidChars(event: KeyboardEvent): void {
  // Block 'e', 'E', '+', '-', and '.'
  if (['e', 'E', '+', '-', '.'].includes(event.key)) {
    event.preventDefault();
  }
}
}
