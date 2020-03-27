import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from "../_models";
import {keys} from "../../../constants/keys";
import {LoginDTO} from "../login/login-dto";
import {APIService} from "../../../custom-components/http-service/service";
import {Router} from "@angular/router";
import {LogoutDTO} from "../login/loout-dto";

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  logoutDto = new LogoutDTO;
  user = new User();

  constructor(private service: APIService, private router: Router, private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  async login(loginDto: LoginDTO) {

    this.service.post(keys.apiAddress + `Account/Login`, loginDto)
      .then((data: any) => {
        this.user.token = data.token;
        this.user.username = data.username;
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        this.currentUserSubject.next(data);
        this.router.navigate(['/pages/page']);
      })
      .catch((error: any) => console.log(error));
  }

  logout() {

    this.logoutDto.email = this.currentUserSubject.getValue().username;
    this.logoutDto.token = this.currentUserSubject.getValue().token;

    this.service.post(keys.apiAddress + `Account/Logout`, this.logoutDto)
      .then(() => {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.currentUserValue;
        this.user = null;
        this.router.navigate(['/login']);
      })
      .catch((error: any) => console.log(error));
    // remove user from local storage and set current user to null
  }
}
