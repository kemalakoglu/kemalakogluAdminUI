import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService, AuthenticationService} from "../_services";
import * as sha512 from 'js-sha512';
import {LoginDTO} from "./login-dto";

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  loginRequest = new LoginDTO;
  loginResponse = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {

    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      return this.router.navigate(['/pages/page']);
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    //this.onValueChanges();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onValueChanges(): void {
    this.loginForm.valueChanges.subscribe(val => {
      this.f.password.setValue((sha512.sha512(val[1])));
    })
  }

  onSubmit() {

    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.loginRequest.Email = this.f.username.value;
    this.loginRequest.Password = sha512.sha512(this.f.password.value);
    this.authenticationService.login(this.loginRequest);
  }
}
