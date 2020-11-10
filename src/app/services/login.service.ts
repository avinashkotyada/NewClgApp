import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private UserisLoggedIn = false
 private UserId:string
  getloginstatus(){
    return this.UserisLoggedIn
  }


  changeloginstatus(){
    this.UserisLoggedIn = !this.UserisLoggedIn
  }
  setUserId(studentId){
    this.UserId=studentId
  }
  getUserId(){
    return this.UserId
  }

  constructor() { }
}
