import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FirebaseService } from '../firebase.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderList = {};

  constructor(private http: HttpService, private firebase : FirebaseService) { }

  ngOnInit() {
    this.http.getGroupOfElements("orders", this.firebase.getCurrentUser().uid).subscribe(res =>{
      debugger;
      this.orderList = res;
    });
  }

}
