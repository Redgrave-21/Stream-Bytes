import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { videoDataForm } from '../forms';
import { FormsService } from '../forms.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Title } from '@angular/platform-browser';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpEventType } from '@angular/common/http';
import { AuthServiceService } from '../auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';



@Component({
  selector: 'app-videoupload',
  templateUrl: './videoupload.component.html',
  styleUrls: ['./videoupload.component.css']
})
export class VideouploadComponent {

  fileName = '';
  uploadProgress: number = 0;
  fileToUpload: File | null = null;
  file: File
  uploadFileSub!: Subscription;

  

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormsService,
    private authService: AuthServiceService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  /**
   * fields required for video upload form
   */
  videoUpload = { title: '', description: '' }
  videoUploadForm !: FormGroup;

  ngOnInit(): void {
    if (this.authService.isLoggedIn() == true) {
      // this.userService.getUser().subscribe(user=>this.User=user)
      // this.getUser()
      this.videoUploadForm = new FormGroup({
        title: new FormControl(this.videoUpload.title, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100)
        ]),
        description: new FormControl(this.videoUpload.description, [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(300)

        ])
      })
    }
    else {
      alert('you cannot access your user page unless you log in')
      this.router.navigate(['/'])
    }
  }
  formData(): any {
    // return this.videoDataForm.value
    return this.videoUploadForm.value
  }

  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0]
    console.log(event.target.files[0])
    let fileName = event.target.files[0].type;
    if(fileName !== "video/mp4"){
      alert("Only video file type with .mp4 extensions are allowed");
    }
  }

  onSubmit(): void {
    const form = new FormData()
    form.append('title', this.formData().title)
    form.append('description', this.formData().description)
    //form.append('file',this.formData().file)
    form.append('file', this.fileToUpload)
    console.log(form)
    this.formService.uploadVideo(form).subscribe(event => {
      if (event.type == HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(100 * (event.loaded / event.total))
        console.log(this.uploadProgress)//this.formData);
      }
    })
  }

  cancelUpload() {
    if (this.fileToUpload != null) {
      this.uploadFileSub.unsubscribe()
      this.reset()
    }
  }

  reset() {
    this.uploadProgress = 0;
    this.uploadFileSub.closed;
  }

}