import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


export interface  Product{
  _id : String;
  name : String;
  quantity: number;
}


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  static productList$: BehaviorSubject<Product[]>;
  static productList : Product[];

  static addProduct(product: Product){
    debugger;
    var saveProduct = this.productList.find(saveProduct => saveProduct._id === product._id);
    if(saveProduct === undefined)
      this.productList.push(product);
    else{
      var index = this.productList.indexOf(saveProduct);
      this.productList[index].quantity = this.productList[index].quantity + product.quantity;
    }
    this.productList$.next(this.productList);
  }

  static getProduct$(): Observable<Product[]> {
    if(this.productList === undefined || this.productList < 0 ){
      this.productList = [];
      this.productList$ = new BehaviorSubject<Product[]>();
    }
    return this.productList$.asObservable();
  }

  static getLength(){
    console.log(this.productList.length);
    return this.productList.length;
  }
}
