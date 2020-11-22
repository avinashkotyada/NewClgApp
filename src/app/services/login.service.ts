import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private UserisLoggedIn = false
  private userid : string
  private PhoneNo: string


  getloginstatus(){
    return this.UserisLoggedIn
  }
  getUserId(){
    return this.userid;

  }
  setUserId(student_id : string){
    this.userid = student_id;
    
  }

  getPhoneNo(){
    return this.PhoneNo;
  }

  setPhoneNo(PhoneNovar : string){
    this.PhoneNo = PhoneNovar
  }

  changeloginstatus(){
    this.UserisLoggedIn = !this.UserisLoggedIn
  }

  constructor(private afAuth: AngularFireAuth) { }
  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    console.log(credential.user.displayName,credential.user.email,credential.user.phoneNumber);
  }
  async signOut() {
    await this.afAuth.signOut();
    
  }
  
  
}
