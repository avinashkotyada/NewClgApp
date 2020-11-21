import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
  photo : string
  name : string
  id : string

  
 
  constructor(private db : AngularFirestore,private alertController : AlertController, private loginService : LoginService, private router : Router,private studentService :StudentsService) {}


//  async onLogout(){

//   const alert = await this.alertController.create({

//     header: 'Confirm Logout',
//     message: 'Are you sure, do you want logout?',
//     buttons: [
//       {
//         text: 'Cancel',
//         role: 'cancel',
//         handler: (blah) => {
//           console.log('Confirm Cancel: blah');
//         }
//       }, {
//         text: 'Logout',
//         handler: () => {
//           this.loginService.signOut();
//           this.loginService.changeloginstatus()
//           this.router.navigateByUrl('/login')
         

//         }
//       }
//     ]
//   });

//   await alert.present();



//   }
  ngOnInit(){
    this.db.collection('students').doc<StudentModel>(this.studentService.getuserid()).valueChanges().subscribe(student=>{
      
      this.photo = student.student_photo
      this.name = student.student_name
      this.id = student.student_id
    
    
    })
  }


}
