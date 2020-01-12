import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpService, public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      user : ['', Validators.required],
      email :['', [Validators.required, Validators.email]],
      password : ['', [Validators.required,
          Validators.minLength(6),
         Validators.maxLength(25)]],
      fullName : ['', Validators.required],
      postalAdd : ['', Validators.required],
      street : ['', Validators.required],
      city: ['', Validators.required],
      province :['', Validators.required],
      telephone : ['', Validators.required],
      country : ['', Validators.required],
      idCard: ['', Validators.required]
    });
  }

  saveUser(){
    this.afAuth.auth.createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
     .then(snap => {
       this.http.setNewUser("users", snap.user.uid, this.registerForm.value).subscribe(res=>{
         console.log("res");
       });
     })
     .catch(error => console.log(error));
  }

}
