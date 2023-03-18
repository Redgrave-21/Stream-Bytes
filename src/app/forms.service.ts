import { Injectable } from '@angular/core';
import { videoDataForm } from './forms';
import { catchError, finalize, Observable } from 'rxjs';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(
    private http: HttpClient,) { }
  fields: [] = []
  // videoUploadUrl = "http://localhost:3000/videodataupload"
  videoUploadUrl = `${apiUrl}/videodataupload`

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

    // return this.http.post<any>('http://localhost:3000/uploadvideo', form, {
      let uid = sessionStorage.getItem('userId')
      return this.http.post<any>(`${apiUrl}/user/${uid}/uploadvideo`, form, {
      // headers: headers,
      withCredentials: false,
      reportProgress: true,
      observe: 'events'
    })
  }
  /** end of uploadVideo*/
}