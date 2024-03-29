import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comments, Video } from './interfaces';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { catchError, Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  constructor(private http: HttpClient) { }

  getVideo(id: String): Observable<Video> {
    return this.http.get<Video>(`http://localhost:3000/video/${id}`).pipe(tap(_ => console.log(`fetched video id=${id}`)))
  }

  getComments(): Observable<Comments[]> {
    return this.http.get<Comments[]>('http://localhost:3000/video/')
  }

  /**add comment */
  addNewComment(id: string, form: FormData): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/video/${id}/comments`, form, { withCredentials: true })
    //return this.http.post<any>(`http://localhost:3000/comments`,form)
  }

  addLike(id: string): Observable<any> {
    let userLike = sessionStorage.getItem('userId')
    console.log('video to like is', id)
    return this.http.post<any>(`http://localhost:3000/video/${id}/like`, userLike, { withCredentials: true })
  }

  addDislike(id: string): Observable<any> {
    let userDislike = sessionStorage.getItem('userId')
    return this.http.post<any>(`http://localhost:3000/video/${id}/dislike`, userDislike, { withCredentials: true })
  }

  addToPlaylist(id: string): Observable<any> {
    let userWhoAdded = sessionStorage.getItem('userId')
    return this.http.post<any>(`http://localhost:3000/video/${id}/addtoplaylist`, userWhoAdded, { withCredentials: true })
  }
}
