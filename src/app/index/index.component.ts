import { Component, OnInit } from '@angular/core';
import { isFormRecord } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Video } from '../interfaces';
import { IndexService } from '../index.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchAll } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  apiUrl=environment.apiUrl;
  public url: SafeResourceUrl | undefined
  constructor(private http:HttpClient, private indexService:IndexService, private sanitizer: DomSanitizer, private route: ActivatedRoute){
    console.log(environment.apiUrl)
  }

  videos: Video[] = [];
  selectedId : string;
  ngOnInit():void{
      this.showVideos()
      // this.getImage("http://localhost:3000/indeximages")
      this.getImage(`${environment.apiUrl}/indeximages`)
      
  }

  showVideos():void {
    this.indexService.getVideos().subscribe(videos => this.videos = videos)
}
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
}
