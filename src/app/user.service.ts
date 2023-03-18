import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Res } from './interfaces';
import { IndexService } from './index.service';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})


export class UserService {
  constructor(private http:HttpClient, private indexService:IndexService) { }
  id:string
  signUp(form:FormData):Observable<HttpResponse<Res>>{
    // return this.http.post<Res>('http://localhost:3000/user/signup',form,{
      return this.http.post<Res>(`${apiUrl}/user/signup`,form,{
    //  responseType:'json',
     observe:'response'
    });
  }

  login(form:FormData):Observable<HttpResponse<Res>>{
    // return this.http.post<Res>('http://localhost:3000/user/login',form,{
       return this.http.post<Res>(`${apiUrl}/user/login`,form,{
      withCredentials:false,
      observe:'response'
    })
  }

  getUser():Observable<HttpResponse<Res>>{
    let uId = sessionStorage.getItem('userId')
    // let uId = localStorage.getItem('userId')
    console.log("output of uid fetched from localStorage",uId)
    // return this.http.get<Res>(`http://localhost:3000/user/${this.id}`,{
      return this.http.get<Res>(`${apiUrl}/user/${uId}`,{
      withCredentials:false,
      observe:'response',
    })
  }

  logO():Observable<HttpResponse<Res>>{   
    const body={text:'destory session'}
    // return this.http.get<Res>('http://localhost:3000/logout',{
      return this.http.get<Res>(`${apiUrl}/logout`,{
      withCredentials:false,
      observe:'response'
    })
  }
  
  deleteVideo(id:string):Observable<HttpResponse<Res>>{
    // return this.http.post<Res>('http://localhost:3000/video/delete/:id',id,{
      return this.http.post<Res>(`${apiUrl}/video/delete/:id`,id,{
      withCredentials:false,
      observe:'response'
    })
  }
}
