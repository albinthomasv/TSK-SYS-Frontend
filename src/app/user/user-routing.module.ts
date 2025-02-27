import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './pages/tasks/tasks.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { AuthGuard } from '../auth.gaurd';

const routes: Routes = [
  {path:"",component:UserLayoutComponent,children:[
    { path: '', pathMatch: 'full', redirectTo: 'tasks' }, // Redirect empty path to "tasks"
    { path: 'tasks', component: TasksComponent }, // Load TasksComponent for "/tasks"
    { path: '**', redirectTo: 'tasks' } // Redirect unknown paths to "tasks"
  ],canActivate:[AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
