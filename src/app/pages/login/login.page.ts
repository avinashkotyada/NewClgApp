import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StudentModel } from 'src/app/models/student.model';
import { LoginService } from 'src/app/services/login.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //google sign in gives this info
  student_name : string
  student_email : string
  student_id : string
  student_profileImage : string
  student : StudentModel
  


  constructor(private toastController : ToastController, private studentsService: StudentsService, private loginService: LoginService, private router: Router) { }

  ngOnInit() {

    this.student_name = "asd"
    this.student_email = '123@gmail.com'
    this.student_id = "123"
    this.student_profileImage  = "https://img.favpng.com/5/1/21/computer-icons-user-profile-avatar-female-png-favpng-cqykKc0Hpkh65ueWt6Nh2KFvS.jpg"
    
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Logged In Successfully',
      duration: 1200
    });
    toast.present();
  }


  clickongooglesignin() {
    this.studentsService.getstudentbyid(this.student_id).subscribe(
       student =>    this.student = student
    )

    if(this.student.student_id){
      this.loginService.changeloginstatus()
      this.router.navigateByUrl('/home')

     

     }
     else{
       this.loginService.changeloginstatus()
       this.studentsService.addstudent(this.student_name,this.student_email,this.student_id,this.student_profileImage)
       this.router.navigateByUrl('/home')
       
      }

      this.presentToast()
      this.loginService.setUserId(this.student_id)
   
  }

}
