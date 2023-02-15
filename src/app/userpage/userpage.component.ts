import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent {
  constructor(private userService:UserService, private authService: AuthServiceService, private router:Router,
    private route:ActivatedRoute){}
  ngOnInit(){
    if(this.authService.isLoggedIn()==true){
      // this.userService.getUser().subscribe(user=>this.User=user)
      this.getUser()
    }
    else{
      alert('you cannot access your user page unless you log in')
      this.router.navigate(['/'])
    }
    
  }

  User:any
  user:[]

  getUser():void{
    this.userService.getUser().subscribe(user=>this.User=user)
    console.log("output of user body is ")
    console.log(this.User)
  }

  logout():void{
    this.authService.logout().subscribe()
    alert('you are logged out successfully')
    this.router.navigate(['/'])
  }

  deleteVideo():void{
    let id =this.User.video.body._id
    console.log(id)
    // this.userService.deleteVideo(id)
  }

}
