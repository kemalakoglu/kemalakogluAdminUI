// used to create fake backend
import {LoginComponent} from "./login.component";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  declarations: [
    LoginComponent
  ],
  providers: []
})
export class LoginModule { };
