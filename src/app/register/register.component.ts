import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;
  itsCreate = false;
  userUid : String;

  constructor(private formBuilder: FormBuilder, private http: HttpService, private firebase : FirebaseService, private router : Router) { }

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
    debugger;
    if(!this.itsCreate){
      this.firebase.createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
       .then(snap => {
         this.http.setNewUser("users", snap.user.uid, this.registerForm.value).subscribe(res=>{
           console.log("res");
           this.router.navigate(['..']);
         });
       })
       .catch(error => console.log(error));
     }else{
       this.http.setNewUser("users", this.userUid, this.registerForm.value).subscribe(res=>{
         console.log("res");
         if(res != -1)
          this.router.navigate(['..']);
       });
     }
  }

  printData(_id, fullName, email){
    this.itsCreate = true;
    this.userUid = _id;
    this.registerForm.patchValue({
      email : email,
      fullName : fullName
    });
  }

  googleSignUp(){
    this.firebase.createUserWithGoogleAccount().then(snap => {
      this.printData(snap.user.uid, snap.user.displayName, snap.user.email);
      console.log("exito");
    }).catch(err => {
      console.log(err);
    });
  }

}
