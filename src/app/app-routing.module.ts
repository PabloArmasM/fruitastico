import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ObjectComponent } from './object/object.component';
import { BuyCenterComponent } from './buy-center/buy-center.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },{
    path: "home",
    component: HomeComponent,
    pathMatch: "full"
  },{
    path: "object/:id",
    component: ObjectComponent,
  },{
    path: "buyCenter",
    component: BuyCenterComponent,
    pathMatch: "full"
  },{
    path: "register",
    component: RegisterComponent,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
