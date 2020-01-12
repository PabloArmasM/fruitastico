import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { FormControl } from '@angular/forms';
import { ShoppingCartService } from '../shopping-cart.service';


@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {

  productDescription: any;
  productBase: any;
  quantity = new FormControl(1);
  _id : String;
  semaphore = false;

  constructor(private route: ActivatedRoute, private http : HttpService) { }

  modifyQuantity(value){
    this.quantity.setValue(this.quantity.value + value < 1 ? 1 : this.quantity.value + value);
  }

  ngOnInit() {
    var jsonParse = JSON.parse(this.route.snapshot.paramMap.get('id'));
    this.productBase = jsonParse.value;
    this._id = jsonParse.key;
  }

  ngAfterViewInit(){
    this.http.getSpecificElement("fruitDescription", this._id).subscribe(res =>{
      this.semaphore = true;
      console.log(res);
      this.productDescription = res;
      console.log(this.productDescription);
    });
  }

  addProduct(){
    if(this.quantity.value > 0){
      var product = {
        _id : this._id,
        name : this.productBase.name,
        quantity : this.quantity.value,
        price : this.productBase.price
      };
      ShoppingCartService.addProduct(product);
    }
  }
}
