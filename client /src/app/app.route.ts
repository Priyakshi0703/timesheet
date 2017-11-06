import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { AuthGuard} from './app.auth-guard'
export const route: Routes = [{ path: 'login', component: LoginComponent } ,
{path:'', component: LoginComponent},
{path:'admin',component:AdminComponent, canActivate: [AuthGuard], data: [{ loginStatus: '1' }]},
{path:'user',component:UserComponent, canActivate: [AuthGuard], data: [{ loginStatus: '2' }]}
  ]  
