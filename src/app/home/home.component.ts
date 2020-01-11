import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  collection : any;

  constructor(private http : HttpService) { }

  ngOnInit() {
    this.http.getData("fruit").subscribe(res =>{
      this.collection = res;
    });
  }

}
