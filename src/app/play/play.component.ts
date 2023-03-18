import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PlayService } from '../play.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Observable } from 'rxjs';
import { Video } from '../interfaces';
import { FormBuilder } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent {
  apiUrl=environment.apiUrl;

  //id: string| null = '0';
  video: any
  addCommentDiv: boolean = false

  constructor(private http: HttpClient, private playService: PlayService, private sanitizer: DomSanitizer,
    private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router,
    private authService: AuthServiceService) { }

  checkloggedin() {
    console.log('checkloggedin cliecked')
    if (this.authService.isLoggedOut() && this.authService.isLoggedIn() == false) {
      alert('you must be logged in to use this feature')
      this.addCommentDiv = false
    }
    else if (this.authService.isLoggedOut() == false && this.authService.isLoggedIn()) {
      if (this.addCommentDiv == false) {
        this.addCommentDiv = true;
      }
      else if (this.addCommentDiv == true) {
        this.addCommentDiv = false;
      }
    }
  }

  commentForm = this.formBuilder.group({
    text: '',
    //date: Date,
  });

  ngOnInit(): void {
    const videoId = this.route.snapshot.paramMap.get('_id')
    this.getVideo();
    console.log(videoId)
    // this.populateComments()
  }

  id = String(this.route.snapshot.paramMap.get('id'));
  getVideo(): void {
    //  const id = String(this.route.snapshot.paramMap.get('id'));
    this.playService.getVideo(this.id).subscribe(video => this.video = video);
  }

  getComment(): any {
    return this.commentForm.value
  }

  addComment(): void {
    const commentFormData = new FormData()
    commentFormData.append('text', this.getComment().text)
    let commenttext = this.getComment().text
    //console.log(this.getComment().text)
    console.log(commentFormData)
    console.log(commenttext)
    console.log("video id", this.id)
    this.playService.addNewComment(this.id, commentFormData).subscribe()
  }

  // populateComments():void {
  //   this.playService.getComments().subscribe()
  // }

  addLike() {
    console.log('like passed')
    if (this.authService.isLoggedOut() && this.authService.isLoggedIn() == false) {
      alert("you must be logged in to like this video")
    }
    else if (this.authService.isLoggedOut() == false && this.authService.isLoggedIn()) {
      console.log(this.id)
      this.playService.addLike(this.id).subscribe();
    }
  }
  addDislike() {
    console.log('dislike passed')
    if (this.authService.isLoggedOut() && this.authService.isLoggedIn() == false) {
      alert('you must be logged in to dislike this video')

    }
    else if (this.authService.isLoggedOut() == false && this.authService.isLoggedIn()) {
      this.playService.addDislike(this.id).subscribe();
    }
  }

  addToPlaylist(){
    if (this.authService.isLoggedOut() && this.authService.isLoggedIn() == false) {
      alert('you must be logged in to add this video to playlist')

    }
    else if (this.authService.isLoggedOut() == false && this.authService.isLoggedIn()) {
      console.log(this.id)
      this.playService.addToPlaylist(this.id).subscribe();
    }
  }
}
