import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take} from 'rxjs/operators';
import { StudentModel } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private students = new BehaviorSubject<StudentModel[]>([])
 
  
  constructor() { }

  getallstudents(){
    return this.students.asObservable()
  }

  addstudent( student_name : string, student_email : string,student_id : string, student_profileImage : string){

    const new_student = new StudentModel(student_name,student_email, student_id, student_profileImage)
    this.getallstudents().pipe(take(1)).subscribe(
      student => this.students.next(student.concat(new_student))
    )
    
    
  }


  getstudentbyid(student_id : string){
    return this.getallstudents().pipe(map(students => { return { ...students.find(p => p.student_id === student_id) } }))

  }
 
}
