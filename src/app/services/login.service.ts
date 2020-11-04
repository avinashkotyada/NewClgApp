import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private UserisLoggedIn = false

  getloginstatus(){
    return this.UserisLoggedIn
  }


  changeloginstatus(){
    this.UserisLoggedIn = !this.UserisLoggedIn
  }

  constructor() { }
}
