import { Injectable } from '@angular/core';

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

  constructor() { }
}
