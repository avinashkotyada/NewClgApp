import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { GooglePlus } from '@ionic-native/google-plus/ngx';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private UserisLoggedIn = false
  private userid : string


  getloginstatus(){
    return this.UserisLoggedIn
  }
  getUserId(){
    return this.userid;

  }
  setUserId(student_id : string){
    this.userid = student_id;
    
  }


  changeloginstatus(){
    this.UserisLoggedIn = !this.UserisLoggedIn
  }

  constructor(private afAuth: AngularFireAuth,private googlePlus : GooglePlus) { }
  userData: any = {};
  async googleSignin() {
    this.googlePlus.login({})
      .then(result =>{this.userData = result
        console.log(this.userData)
      })
      .catch(err => this.userData = `Error ${JSON.stringify(err)}`);
   
   
  }
  async signOut() {
    this.googlePlus.logout()
    
    
  }
  
  
}
