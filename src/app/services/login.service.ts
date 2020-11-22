import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StudentModel } from '../models/student.model';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private UserisLoggedIn = false
  private userid: string


  getloginstatus() {
    return this.UserisLoggedIn
  }
  getUserId() {
    return this.userid;

  }
  setUserId(student_id: string) {
    this.userid = student_id;

  }


  changeloginstatus() {
    this.UserisLoggedIn = !this.UserisLoggedIn
  }
  

  constructor(private db : AngularFirestore) { }
 



}
