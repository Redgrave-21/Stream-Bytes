import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap } from 'rxjs';
import { IndexService } from '../index.service';
import { Video,} from '../interfaces';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-video-search',
  templateUrl: './video-search.component.html',
  styleUrls: ['./video-search.component.css']
})
export class VideoSearchComponent {
  // videos !: Observable<Video[]>
  videos: Video[] = [];
  searchForm={term:''}
  searchResult:boolean=false

  constructor(private indexService:IndexService){}
  searchFormTemplate !: FormGroup;

  // search(term: string):void {
  //   this.searchTerms.next(term);
  // }
  ngOnInit():void{
    this.searchFormTemplate = new FormGroup({
      term: new FormControl(this.searchForm.term)
    });
  }

  returnSearch(){
    return this.searchFormTemplate.value;
  }
  search():void{
    let form = new FormData()
    console.log('Output of getter for term in search ',this.returnSearch().term)
    form.append('term',this.returnSearch().term)
    this.indexService.searchVideos(form).subscribe(videos => this.videos = videos)
    // console.log(this.searchForm().searchBox.value)
  }

  hidePane(){
  if (this.searchResult==false){
    this.searchResult=true
  }
  else if(this.searchResult==true){
    this.searchResult=false
  }
  }
}