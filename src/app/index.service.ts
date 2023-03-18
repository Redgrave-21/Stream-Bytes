import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, tap } from 'rxjs';

import { Video } from './interfaces';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class IndexService {
  public url!: SafeResourceUrl
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {


    // this.getImage('http://localhost:3000/indeximages').subscribe(x => this.url = x)
    this.getImage(`${environment.apiUrl}/indeximages`).subscribe(x => this.url = x)
  }

  //************************** */
  getVideos(): Observable<Video[]> {
    // return this.http.get<Videos[]>("http://localhost:3000/")
    return this.http.get<Video[]>(`${environment.apiUrl}/`)
  }
  //******************************** */

  public getImage(url: string): Observable<SafeResourceUrl> {
    return this.http
      .get(url, { responseType: 'blob' })
      .pipe(
        map(x => {
          const urlToBlob = window.URL.createObjectURL(x) // get a URL for the blob
          return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob); // tell Anuglar to trust this value
        }),
      );
  }

 searchVideos(form:FormData):Observable<Video[]>{
    console.log('output from search services',form)
    // return this.http.post<Videos[]>(`http://localhost:3000/searchvideos/form`,form).pipe(
      return this.http.post<Video[]>(`${environment.apiUrl}/searchvideos/form`,form).pipe(
    )
 }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
  }
}
