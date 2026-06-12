import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Option } from '../model/Option';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected options: Option[] = [
  { title: "View Task", route: "/viewTasks" },
  { title: "Add Task", route: "/addTask" },
  { title: "Update Task", route: "/updateTask" },
  { title: "Delete Task", route: "/deleteTask" }];
}
