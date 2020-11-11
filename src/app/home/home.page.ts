import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentModel } from '../models/student.model';
import { LoginService } from '../services/login.service';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  profile1 : StudentModel;
  sub :Subscription;
  current_student_id : string;
  constructor(private loginService : LoginService, private router : Router,private studentService :StudentsService) {}


  onLogout(){
    this.loginService.signOut();
    this.loginService.changeloginstatus()
    this.router.navigateByUrl('/login')

  }
  ngOnInit(){
    this.current_student_id =this.loginService.getUserId()
    this.sub = this.studentService.getallstudents().subscribe(data=>
      this.profile1 = data.filter(p=>p.student_id === this.current_student_id)[0]);
    
  }

}
