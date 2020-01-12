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
    console.log(firebaseCollection);
    console.log(_id);
    return this.http.post<any>(this.uri+'/getSpecificElement', JSON.stringify({collection : firebaseCollection, _id: _id}), httpOptions);
  }
}