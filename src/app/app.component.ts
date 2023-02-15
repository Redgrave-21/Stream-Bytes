import { Component, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthServiceService,){}
  title = 'stream-bytes';

  isLoggedIn:boolean=false;
  
  loggedIn(){
    if(this.authService.isLoggedIn()!=null){
      this.isLoggedIn=true;
    }
    else{
      this.isLoggedIn=false;
    }
  }
 
  logout(){
    this.authService.logout()
    this.isLoggedIn=false;
  }
  
}

@Injectable()
export class APIInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
    const apiReq = req.clone({ url: `http://localhost:3000/${req}` });
    return next.handle(apiReq);
  }
  
}
