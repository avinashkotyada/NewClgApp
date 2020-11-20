import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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

  profile1 : StudentModel={student_photo :"",student_email:"",student_id:"",student_name:""};
  sub :Subscription;
  current_student_id : string;
  constructor(private alertController : AlertController, private loginService : LoginService, private router : Router,private studentService :StudentsService) {}


 async onLogout(){

  const alert = await this.alertController.create({

    header: 'Confirm Logout',
    message: 'Are you sure, do you want logout?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Logout',
        handler: () => {
          this.loginService.signOut();
          this.loginService.changeloginstatus()
          this.router.navigateByUrl('/login')
         

        }
      }
    ]
  });

  await alert.present();



  }
  ngOnInit(){
    this.current_student_id =this.loginService.getUserId()
    this.sub = this.studentService.getallstudents().subscribe(data=>
      this.profile1 = data.filter(p=>p.student_id === this.current_student_id)[0]);
    
  }

}
