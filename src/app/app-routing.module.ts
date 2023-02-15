import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { PlayComponent } from './play/play.component';
import { UserComponent } from './user/user.component';
import { VideouploadComponent } from './videoupload/videoupload.component';
import { UserpageComponent } from './userpage/userpage.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'upload', title: 'Upload Video', component: VideouploadComponent },
  { path: 'play/:id', title: 'play video', component: PlayComponent },
  { path: 'user/signup', title: 'sign up', component: UserComponent },
  { path: 'user/home', title: 'your page', component: UserpageComponent },
  { path: '**', title: '404 page not found', component: ErrorpageComponent }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
