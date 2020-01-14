import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './login/_services';
import { User } from './login/_models';
import './auth.component.scss';

@Component({
  selector: 'auth',
  styleUrls: ['auth.component.scss'],
  template: `
    <ngx-no-column-layout>
      <router-outlet></router-outlet>
    </ngx-no-column-layout>
  `})
export class AuthComponent {
    currentUser: User;
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
