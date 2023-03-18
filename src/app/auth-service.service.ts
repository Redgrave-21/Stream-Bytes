import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs'
import { tap, shareReplay } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(form: FormData) {
    // return this.http.post<User>('http://localhost:3000/user/login', form).do(res=>this.setSession)
    // return this.http.post<any>('http://localhost:3000/user/login', form, {
      return this.http.post<any>(`${apiUrl}/user/login`, form, {
      withCredentials: false,
      /**
       * setting withCredentials to true will break the 
       * functionality when running on device outside
       * of local machines
       */
      observe: 'response'
    }).pipe(tap(response => this.setSession), shareReplay())
  }

  setSession(authResult) {
    // const expiresAt = moment().add(authResult.expiresIn, 'second');
    // localStorage.setItem('id_token', authResult.idToken);
    // localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    console.log(authResult.idToken)
    console.log(authResult)
    sessionStorage.setItem('userId', authResult.userId)
    // sessionStorage.setItem('userId', authResult.userId)
    console.log("output of localstorage.get", sessionStorage.getItem('userId'))
  }

  logout() {
    // localStorage.removeItem('id_token');
    // localStorage.removeItem('expires_at');
    sessionStorage.removeItem('userId');
    this.cookieService.deleteAll()
    console.log('output of localstorage userId', (sessionStorage.getItem('userId')))
    // return this.http.get('http://localhost:3000/user/logout')
    return this.http.get(`${apiUrl}/user/logout`)
  }

  isLoggedIn() {
    // if (localStorage.getItem('userId') != null) {
      if (sessionStorage.getItem('userId') !=null) {
      console.log('is logged in true')
      return true
    } else {
      return false
      console.log('is logged in false')
    }
    // return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    console.log("is user logged out", !this.isLoggedIn())
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
