import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login';
import {AuthComponent} from "./auth.component";
import {NgModule} from "@angular/core";

const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children:[
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
    },
    {
      path: 'login', component: LoginComponent
    },
    // otherwise redirect to home
    {
      path: '**', redirectTo: ''
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
