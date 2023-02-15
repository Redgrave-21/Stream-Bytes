import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import http client module for http operations
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { APIInterceptor, AppComponent } from './app.component';
import { ConfigComponent } from './config/config.component';
import { IndexComponent } from './index/index.component';
import { VideouploadComponent } from './videoupload/videoupload.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PlayComponent } from './play/play.component';
import { UserComponent } from './user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserpageComponent } from './userpage/userpage.component';
import { CookieService } from 'ngx-cookie-service';
import { VideoSearchComponent } from './video-search/video-search.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { MatCard, MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,
    IndexComponent,
    VideouploadComponent,
    PlayComponent,
    UserComponent,
    UserpageComponent,
    VideoSearchComponent,
    ErrorpageComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,

    //import http here
    HttpClientModule,
    AppRoutingModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    NgbModule,
    MatCardModule
  ],
  providers: [
    {
      provide: "http://localhost:3000",
      useClass: APIInterceptor,
      multi: true
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
