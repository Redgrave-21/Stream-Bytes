import { Injectable } from '@angular/core';
import { videoDataForm } from './forms';
import { catchError, finalize, Observable } from 'rxjs';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(
    private http: HttpClient,) { }
  fields: [] = []
  videoUploadUrl = "http://localhost:3000/videodataupload"
  /**POST send data to backend 
   * 
  */
  uploadVideo(form: FormData): Observable<any> {
    // var headers=new HttpHeaders()
    // const idToken=localStorage.getItem('SessionId');
    const idToken = localStorage.getItem('id_token')
    console.log(idToken)
    // console.log(idT)
    let headers: HttpHeaders = new HttpHeaders();
    if (idToken) {
      console.log(idToken)
      headers = headers.set('Authorization', 'Bearer ' + idToken);
      console.log(headers)
    }
    return this.http.post<any>('http://localhost:3000/uploadvideo', form, {
      // headers: headers,
      withCredentials: true,
      reportProgress: true,
      observe: 'events'
    })
  }
  /** end of uploadVideo*/
}