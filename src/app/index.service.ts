import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, tap } from 'rxjs';

import { Videos } from './interfaces';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class IndexService {
  public url!: SafeResourceUrl
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {


    this.getImage('http://localhost:3000/indeximages').subscribe(x => this.url = x)
  }

  //************************** */
  getVideos(): Observable<Videos[]> {
    return this.http.get<Videos[]>("http://localhost:3000/")
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

 searchVideos(form:FormData):Observable<Videos[]>{
    console.log('output from search services',form)
    return this.http.post<Videos[]>(`http://localhost:3000/searchvideos/form`,form).pipe(
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
