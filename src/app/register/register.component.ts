import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      user : [''],
      email :[''],
      password : [''],
      fullName : [''],
      postalAdd : [''],
      street : [''],
      city: [''],
      province :[''],
      telephone : [''],
      country : [''],
      idCard: ['']
    });
  }

  saveUser(){
    this.http.setNewUser("users", this.registerForm.value).subscribe(res=>{
      console.log("Holi");
    });
  }

}
