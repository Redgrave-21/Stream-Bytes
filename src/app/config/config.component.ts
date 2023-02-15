import { Component, OnInit } from '@angular/core';
import { HttpClient,} from '@angular/common/http';
import { ConfigService } from '../config.service';

import { Data } from '../message'
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  data:Data[] = [];

  constructor(private configService:ConfigService){}
  
  ngOnInit(): void {
      this.getd()

  }
  getd():void {
    this.configService.getData().subscribe(data => this.data = data)
}

}
