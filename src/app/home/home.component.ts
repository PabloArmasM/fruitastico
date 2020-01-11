import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  collection : any;

  constructor(private http : HttpService, private dialog: MatDialog) { }

  ngOnInit() {
    this.http.getData("fruit").subscribe(res =>{
      this.collection = res;
    });
  }
  algo(){
    console.log("ola");
  }
  openPopUpWindow(idElement){
    console.log(idElement);
    const dialogRef = this.dialog.open(FruitDialog, {
      width: '400px',
      data: this.collection[idElement]
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El dialogo se ha cerrado');
    });
  }

}


@Component({
  selector: 'fruit-dialog',
  templateUrl: 'fruit-dialog.html',
  styleUrls: ['./home.component.css']
})
export class FruitDialog {

  constructor(
    public dialogRef: MatDialogRef<FruitDialog>,
    @Inject(MAT_DIALOG_DATA) public data: FruitDialog) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
