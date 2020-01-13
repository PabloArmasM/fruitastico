import { Component, OnInit, Inject } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import {MatTableModule} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FirebaseService } from '../firebase.service';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';


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
  activeUser = false;

  constructor(private dialog: MatDialog, private firebase: FirebaseService, private router : Router,
    private http : HttpService) { }

  ngOnInit() {
    this.productList = ShoppingCartService.getProducts();
    this.calculateTotal();
    this.activeUser = this.firebase.existUser();
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

  openPopUpWindow(){
    if(!this.activeUser){
      confirm("Debe iniciar sesión para poder realizar el pedido");
      return;
    }
    if(this.productList.length < 1){
      confirm("No hay productos que comprar");
    }else{
      const dialogRef = this.dialog.open(CardDialog, {
        width: '800px',
      });

      dialogRef.afterClosed().subscribe(() =>{
        this.http.setOrders("orders", this.firebase.getCurrentUser().uid, this.productList);
        this.router.navigate(['/orders']);
        this.deleteElement(-1);

      });
    }
  }

}

@Component({
  selector: 'card-dialog',
  templateUrl: 'card-dialog.html',
  styleUrls: ['./buy-center.component.css']
})
export class CardDialog {
  start = true;
  message = "Procesando solicitud";

  secondsCounter = interval(1000);
  takeFourNumbers = this.secondsCounter.pipe(take(100));
  counterSub : any;

  constructor(
    public dialogRef: MatDialogRef<CardDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CardDialog) {}

    cardProcessing(){
      this.start = false;
      this.counterSub = this.takeFourNumbers.subscribe(n =>{
        if(n == 3)
          this.message = "Solicitud aprobada";
        if(n == 6)
          this.message = "Realizando pago";
        if(n == 8){
          this.counterSub.unsubscribe();
          this.dialogRef.close();
        }
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
