import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { map, take} from 'rxjs/operators';
import { StudentModel } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  student_id : string
  constructor(private db :AngularFirestore) { }
 
  updateCurrentUser(student_photo : string, student_phoneNumber : number){
    this.db.collection('students').doc(this.student_id).update({
      
            student_photo: student_photo,
            student_phoneNumber: student_phoneNumber,
            

    })

  }
  setUserid(student_id:string){
    this.student_id = student_id

  }
  getuserid(){
    return this.student_id
  }

  


}
