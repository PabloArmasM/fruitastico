import { Component, OnInit, Inject } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import {MatTableModule} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-buy-center',
  templateUrl: './buy-center.component.html',
  styleUrls: ['./buy-center.component.css']
})
export class BuyCenterComponent implements OnInit {

  productList : any;
  displayedColumns = ['name', 'quantity', 'price', 'delete'];
  quantity = [];
  totalPrice : number;
  totalQuantity:number;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.productList = ShoppingCartService.getProducts();
    this.calculateTotal();
  }

  calculateTotal(){
    this.totalPrice = 0;
    this.totalQuantity = 0;
    this.productList.forEach(product =>{
      this.totalPrice = this.totalPrice + (product.price * product.quantity);
      this.totalQuantity = this.totalQuantity + product.quantity;
    });
  }

  modifyQuantity(_id, quantity){
    this.productList = this.productList.filter((value, key) =>{
      if(value._id == _id){
        value.quantity = value.quantity + quantity < 1 ? 1 : value.quantity+quantity;
      }
      return true;
    });
    this.calculateTotal();
  }

  deleteElement(_id){
    ShoppingCartService.deleteElement(_id);
    if(_id == -1){
      this.productList = [];
    }else{
      this.productList = this.productList.filter((value,key)=>{
        return value._id != _id;
      });
    }
    this.calculateTotal();
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  getTotalQuantity(){
    return this.totalQuantity;
  }

  /*openPopUpWindow(){
    const dialogRef = this.dialog.open(CardDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }*/

}

@Component({
  selector: 'card-dialog',
  templateUrl: 'card-dialog.html',
  styleUrls: ['./buy-center.component.css']
})
export class CardDialog {

  constructor(
    public dialogRef: MatDialogRef<CardDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CardDialog) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
