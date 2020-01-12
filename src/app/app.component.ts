import { Component } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pruebaFruit';
  quantity: number = 0;

  ngOnInit(){
    ShoppingCartService.getProduct$().subscribe(product => {
        this.quantity = ShoppingCartService.getLength();
    });
  }
}
