import { Routes } from '@angular/router';

// ******** Route components ******

import { LoginComponent } from './pages/login/login.component';
export const routes: Routes = [
    {
        path:"",component:LoginComponent
    },
    { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
];
