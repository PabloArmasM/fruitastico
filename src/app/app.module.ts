import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import {MatMenuModule} from '@angular/material/menu';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component';
import { FruitDialog } from './home/home.component';
import { ObjectComponent } from './object/object.component';
import { BuyCenterComponent } from './buy-center/buy-center.component';
import { CardDialog } from './buy-center/buy-center.component';
import { RegisterComponent } from './register/register.component';
import { SigninDialog } from './app.component';
import { OrdersComponent } from './orders/orders.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FruitDialog,
    ObjectComponent,
    BuyCenterComponent,
    CardDialog,
    RegisterComponent,
    SigninDialog,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    AngularFireModule.initializeApp(environment.firebase, 'fruitastico'),
    AngularFireAuthModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    FruitDialog,
    CardDialog,
    SigninDialog
  ]
})
export class AppModule { }
