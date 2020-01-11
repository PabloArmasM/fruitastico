import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ObjectComponent } from './object/object.component';


const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full"
  },{
    path: "object/:id",
    component: ObjectComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
