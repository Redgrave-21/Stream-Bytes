import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs'
import { tap, shareReplay } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(form: FormData) {
    // return this.http.post<User>('http://localhost:3000/user/login', form).do(res=>this.setSession)
    return this.http.post<any>('http://localhost:3000/user/login', form, {
      withCredentials: true,
      observe: 'response'
    }).pipe(tap(response => this.setSession), shareReplay())
  }

  setSession(authResult) {
    // const expiresAt = moment().add(authResult.expiresIn, 'second');
    // localStorage.setItem('id_token', authResult.idToken);
    // localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    // console.log(authResult.idToken)
    console.log(authResult)
    localStorage.setItem('userId',authResult.userId)
    console.log("output of localstorage.get",localStorage.getItem('userId'))
  }

  logout() {
    // localStorage.removeItem('id_token');
    // localStorage.removeItem('expires_at');
    localStorage.removeItem('userId');
    this.cookieService.deleteAll()
    console.log('output of localstorage userId',(localStorage.getItem('userId')))
    return this.http.get('http://localhost:3000/user/logout')
  }

  isLoggedIn() {
    if(localStorage.getItem('userId')!=null){
      console.log('is logged in true')
      return true
    }else{
      return false
      console.log('is logged in false')
    }
    // return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    console.log("is user logged out",!this.isLoggedIn())
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
