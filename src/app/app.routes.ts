import { Routes } from '@angular/router';
import { ViewTask } from './taskComponents/view-task/view-task';
import { AddTask } from './taskComponents/add-task/add-task';
import { Home } from './home/home';
import { DeleteTask } from './taskComponents/delete-task/delete-task';
import { UpdateTask } from './taskComponents/update-task/update-task';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'viewTasks', component: ViewTask},
    {path: 'addTask', component: AddTask},
    {path: 'deleteTask', component: DeleteTask},
    {path: 'updateTask', component: UpdateTask},
    {path: '**', component: Home}
];
