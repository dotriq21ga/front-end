import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent
  ],
  imports: [
    AuthRoutingModule,
    SharedModule
  ],
})

export class AuthModule { }