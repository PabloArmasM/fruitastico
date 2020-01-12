import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  userData = {};

  constructor(public afAuth: AngularFireAuth) {
  }

  getAuth(){
    return this.afAuth.auth;
  }

  getCurrentUser(){
    return this.afAuth.auth.currentUser;
  }

  createUserWithEmailAndPassword(email, password){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  createUserWithGoogleAccount(){
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  signInWithEmailAndPassword(email, password){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  setUserData(_id, fullName, email){
    this.userData = {_id : _id, fullName: fullName, email: email};
  }

  getUserData(){
    return this.userData;
  }

  cleanUserData(){
    this.userData = {};
  }

  closeSession(){
    this.cleanUserData();
    this.afAuth.auth.signOut();
  }

  existUser(){
    debugger;
    return (this.afAuth.auth.currentUser == null ? false : true);
  }
}
