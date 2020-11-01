import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing';
import { LoginComponent } from './components/login/login.component';
@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  entryComponents: [
  ],
})
export class AuthModule { }

