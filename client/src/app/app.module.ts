import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { FormsModule }   from '@angular/forms';
import{ RouterModule, Routes } from '@angular/router';
import { route } from './app.route';
import {ConnectService} from './connect.service';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './app.auth-guard'


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(route),
    HttpModule
  ],
  providers: [ConnectService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
