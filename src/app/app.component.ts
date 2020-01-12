import { Component, Inject } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from './firebase.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pruebaFruit';
  quantity: number = 0;
  activeUser : Boolean;

  constructor(private dialog: MatDialog, private firebase: FirebaseService, private router : Router){
    this.firebase.getAuth().onAuthStateChanged(user =>{
      if(user){
        this.activeUser = true;
      }else{
        this.activeUser = false;
      }
    });
  }

  ngOnInit(){
    ShoppingCartService.getProduct$().subscribe(product => {
        this.quantity = ShoppingCartService.getLength();
    });
  }

  openPopUpWindow(){
    const dialogRef = this.dialog.open(SigninDialog, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El dialogo se ha cerrado');
    });
  }

  closeSession(){
    this.activeUser = false;
    this.firebase.closeSession();
    debugger;
    this.router.navigate(['/home']);
  }
}

@Component({
  selector: 'signin-dialog',
  templateUrl: 'signin-dialog.html',
  styleUrls: ['./app.component.css']
})
export class SigninDialog {
  loginForm : FormGroup;
  currentUser : any;

  constructor(
    public dialogRef: MatDialogRef<SigninDialog>,
    @Inject(MAT_DIALOG_DATA) public data: SigninDialog,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private router : Router
    ) {}

    ngOnInit() {
      this.loginForm = this.formBuilder.group({
        password : ['', Validators.required],
        email :['', [Validators.required, Validators.email]]});

        this.currentUser = this.firebase.getCurrentUser();
    }


      signIn(){
        this.firebase.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then(snap =>{
          this.router.navigate(['/home']);
          this.dialogRef.close();
        }).catch(err =>{
          console.log(err);
        })
      }

    googleSignUp(){
      this.firebase.createUserWithGoogleAccount().then(snap => {
        console.log("exito");

        if(snap.additionalUserInfo.isNewUser){
          this.firebase.setUserData(snap.user.uid, snap.user.displayName, snap.user.email);
          this.router.navigate(['/register']);
        }else{
          this.router.navigate(['/home']);
        }
        this.dialogRef.close();

      }).catch(err => {
        console.log(err);
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
