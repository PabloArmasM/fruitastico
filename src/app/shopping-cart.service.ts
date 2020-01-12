import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


export interface  Product{
  _id : String;
  name : String;
  quantity: number;
  price: number;
}


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  static productList$ = new Subject<Product[]>();
  static productList = [];

  static addProduct(product: Product){
    var saveProduct = this.productList.find(saveProduct => saveProduct._id === product._id);
    if(saveProduct === undefined)
      this.productList.push(product);
    else{
      var index = this.productList.indexOf(saveProduct);
      this.productList[index].quantity = this.productList[index].quantity + product.quantity;
    }
    this.productList$.next(this.productList);
  }

  static deleteElement(_id){
    if(_id == -1){
      this.productList = [];
    }else{
      this.productList = this.productList.filter((value,key)=>{
        return value._id != _id;
      });
    }

    this.productList$.next(this.productList);

  }

  static getProduct$(): Observable<Product[]> {
    return this.productList$.asObservable();
  }

  static getProducts() {
    return this.productList;
  }

  static getLength(){
    console.log(this.productList.length);
    return this.productList.length;
  }


}
