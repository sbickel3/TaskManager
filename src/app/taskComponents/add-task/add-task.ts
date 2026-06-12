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

  // Grab the toast element from the template
  @ViewChild('successToast', { static: true }) toastElement!: ElementRef;

  constructor(private taskData: TaskDataService){}

  // Define the form structure
  taskForm = this.formBuilder.group({
    id: ['', [Validators.required]],
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  onSubmit(): void {
    if (this.taskForm.valid) {
      // Mapping the form values to our Task model
      const newTask: Task = {
        id: Number(this.taskForm.value.id!),
        title: this.taskForm.value.title!,
        description: this.taskForm.value.description!,
      };
      
      console.log("form data: " + newTask)
      this.taskData.addTask(newTask);
      this.showSuccessToast(); // Trigger the visual feedback
      this.taskForm.reset();
    }
  }

  private showSuccessToast(): void {
    // Initialize and show the Bootstrap toast
    const toast = new bootstrap.Toast(this.toastElement.nativeElement);
    toast.show();
  }

  blockInvalidChars(event: KeyboardEvent): void {
  // Block 'e', 'E', '+', '-', and '.'
  if (['e', 'E', '+', '-', '.'].includes(event.key)) {
    event.preventDefault();
  }
}
}
