import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take} from 'rxjs/operators';
import { StudentModel } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private students = new BehaviorSubject<StudentModel[]>([new StudentModel("avinash","123@gmail,com","122","https://img.favpng.com/5/1/21/computer-icons-user-profile-avatar-female-png-favpng-cqykKc0Hpkh65ueWt6Nh2KFvS.jpg"),
  new StudentModel("munch","124@gmail,com","124","https://img.favpng.com/5/1/21/computer-icons-user-profile-avatar-female-png-favpng-cqykKc0Hpkh65ueWt6Nh2KFvS.jpg"),
  new StudentModel("dheeraj","125@gmail,com","125","https://img.favpng.com/5/1/21/computer-icons-user-profile-avatar-female-png-favpng-cqykKc0Hpkh65ueWt6Nh2KFvS.jpg"),
  new StudentModel("suraj","126@gmail,com","126","https://img.favpng.com/5/1/21/computer-icons-user-profile-avatar-female-png-favpng-cqykKc0Hpkh65ueWt6Nh2KFvS.jpg"),
  new StudentModel("vishnu","127@gmail,com","127","https://img.favpng.com/5/1/21/computer-icons-user-profile-avatar-female-png-favpng-cqykKc0Hpkh65ueWt6Nh2KFvS.jpg"),
  new StudentModel("pranavi","128@gmail,com","128","https://img.favpng.com/5/1/21/computer-icons-user-profile-avatar-female-png-favpng-cqykKc0Hpkh65ueWt6Nh2KFvS.jpg"),
  new StudentModel("kishore","130@gmail,com","130","https://img.favpng.com/5/1/21/computer-icons-user-profile-avatar-female-png-favpng-cqykKc0Hpkh65ueWt6Nh2KFvS.jpg"),
  new StudentModel("tooty","131@gmail,com","131","https://img.favpng.com/5/1/21/computer-icons-user-profile-avatar-female-png-favpng-cqykKc0Hpkh65ueWt6Nh2KFvS.jpg"),
  new StudentModel("gopal","132@gmail,com","132","https://img.favpng.com/5/1/21/computer-icons-user-profile-avatar-female-png-favpng-cqykKc0Hpkh65ueWt6Nh2KFvS.jpg"),
  new StudentModel("hemanth","133@gmail,com","133","https://img.favpng.com/5/1/21/computer-icons-user-profile-avatar-female-png-favpng-cqykKc0Hpkh65ueWt6Nh2KFvS.jpg"),
  new StudentModel("akhila","134@gmail,com","134","https://img.favpng.com/5/1/21/computer-icons-user-profile-avatar-female-png-favpng-cqykKc0Hpkh65ueWt6Nh2KFvS.jpg"),
  new StudentModel("kukka","135@gmail,com","135","https://img.favpng.com/5/1/21/computer-icons-user-profile-avatar-female-png-favpng-cqykKc0Hpkh65ueWt6Nh2KFvS.jpg")])
  
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
  updateDataByIndex(student_name : string, student_email : string,student_id : string, student_profileImage : string){
    return this.getallstudents().pipe(take(1)).subscribe(data=>{
      const profileIndex = data.findIndex(profiles=>profiles.student_id===student_id);
      const updatedData= [...data];
      updatedData[profileIndex] = new StudentModel(student_name,student_email,student_id,student_profileImage);
      this.students.next(updatedData);


      

    });
  }


  getstudentbyid(student_id : string){
    return this.getallstudents().pipe(map(students => { return { ...students.find(p => p.student_id === student_id) } }))

  }
}
