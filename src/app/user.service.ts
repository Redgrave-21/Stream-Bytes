import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Res } from './interfaces';
import { IndexService } from './index.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http:HttpClient, private indexService:IndexService) { }
  id:string

  signUp(form:FormData):Observable<HttpResponse<Res>>{
    return this.http.post<Res>('http://localhost:3000/user/signup',form,{
    //  responseType:'json',
     observe:'response'
    });
  }

  login(form:FormData):Observable<HttpResponse<Res>>{
    return this.http.post<Res>('http://localhost:3000/user/login',form,{
      withCredentials:true,
      observe:'response'
    })
  }

  getUser():Observable<HttpResponse<Res>>{
    let Uid=sessionStorage.getItem('userId')
    console.log(Uid)
    console.log(this.id)
    return this.http.get<Res>(`http://localhost:3000/user/${this.id}`,{
      withCredentials:true,
      observe:'response',
    })
  }

  logO():Observable<HttpResponse<Res>>{   
    const body={text:'destory session'}
    // return this.http.get('http://localhost:3000/user/logout')
    return this.http.get<Res>('http://localhost:3000/logout',{
      withCredentials:true,
      observe:'response'
    })
  }
  
  deleteVideo(id:string):Observable<HttpResponse<Res>>{
    return this.http.post<Res>('http://localhost:3000/video/delete/:id',id,{
      withCredentials:true,
      observe:'response'
    })
  }
}
