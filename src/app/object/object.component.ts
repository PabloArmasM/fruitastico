import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {

  productDescription: any;
  productBase: any;
  quantity = new FormControl(0);

  constructor(private route: ActivatedRoute, private http : HttpService) { }

  modifyQuantity(value){
    this.quantity.setValue(this.quantity.value + value);
  }

  ngOnInit() {
    var jsonParse = JSON.parse(this.route.snapshot.paramMap.get('id'));
    this.productBase = jsonParse.value;
    this.http.getSpecificElement("fruitDescription", jsonParse.key).subscribe(res =>{
      this.productDescription = res;
      console.log(this.productDescription);
    });

  }

}
