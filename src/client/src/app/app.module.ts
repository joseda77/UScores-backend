import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserComponent } from './component/user/user.component';
import { LoginService } from './services/login.service';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent
  ],
  imports: [
    MaterializeModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    LoginService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
