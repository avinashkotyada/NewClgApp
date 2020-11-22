import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { map, take} from 'rxjs/operators';
import { StudentModel } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private student_id = new BehaviorSubject<string>('')
  constructor(private db :AngularFirestore) { }
 
  updateCurrentUser(student_photo : string, student_phoneNumber : number){
    this.getuserid().subscribe(student_id => {
      this.db.collection('students').doc(student_id).update({
      
        student_photo: student_photo,
        student_phoneNumber: student_phoneNumber,
        

})
    })
 

  }
  setUserid(student_id:string){
    this.getuserid().pipe(take(1)).subscribe(stud_id=> this.student_id.next(student_id))
    

  }
  getuserid(){
    return this.student_id.asObservable()
  }

  


}
