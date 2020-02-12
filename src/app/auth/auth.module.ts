import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import {AuthRoutingModule} from "./auth-routing.module";
import {LoginModule} from "./login/login/login.module";
import {AuthComponent} from "./auth.component";
import {ErrorInterceptor, fakeBackendProvider, JwtInterceptor} from "./login/_helpers";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ThemeModule} from "../@theme/theme.module";
import {NbMenuModule} from "@nebular/theme";

// used to create fake backend

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    NbMenuModule,
    ThemeModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthRoutingModule,
    LoginModule,
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend
    fakeBackendProvider
  ],
})
export class AuthModule {};
