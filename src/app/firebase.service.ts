import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public afAuth: AngularFireAuth) { }


  createUserWithEmailAndPassword(email, password){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  createUserWithGoogleAccount(){
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
}
