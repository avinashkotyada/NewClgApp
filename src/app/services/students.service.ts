import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { map, take} from 'rxjs/operators';
import { StudentModel } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  currentStudent : StudentModel
  id : string

 
  constructor(private db :AngularFirestore) { }
  setCurrentuser(student_id : string){
    this.db.collection('students').doc<StudentModel>(student_id).valueChanges().subscribe(student=>{
      this.currentStudent = student


    })

  }
  getCurrentUser(){
    return this.currentStudent
  }
  updateCurrentUser(student_photo : string,student_name : string, student_phoneNumber :string){
    this.db.collection('students').doc(this.currentStudent.student_id).update({
      
            student_photo: student_photo,
            student_name: student_name,
            student_phoneNumber: student_phoneNumber,
            

    })

  }
  setUserid(id:string){
    this.id = id

  }
  getuserid(){
    return this.id
  }

  


}
