import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
    })
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getData(firebaseCollection){
    return this.http.post<any>(this.uri+'/getFruitCollection', JSON.stringify({collection : firebaseCollection}), httpOptions);
  }

  getSpecificElement(firebaseCollection, _id){
    return this.http.post<any>(this.uri+'/getSpecificElement', JSON.stringify({collection : firebaseCollection, _id: _id}), httpOptions);
  }

  getGroupOfElements(firebaseCollection, _id){
    return this.http.post<any>(this.uri+'/getGroupOfElements', JSON.stringify({collection : firebaseCollection, _id: _id}), httpOptions);
  }

  setNewUser(firebaseCollection, _id, userData){
    return this.http.post<any>(this.uri+'/setNewUser', JSON.stringify({collection : firebaseCollection, _id: _id, data: userData}), httpOptions);
  }

  setOrders(firebaseCollection, _id, email, orders){
    this.http.post<any>(this.uri+'/setOrders', JSON.stringify({collection : firebaseCollection, _id: _id, email: email, data: orders}), httpOptions).subscribe(res=>{
      console.log(res);
    });
  }


}
