import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AlertController, Platform } from '@ionic/angular';
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
  student_photo : string
  student_name : string
  student_id : string

  
 
  constructor(private platform : Platform, private af : AngularFireAuth, private googlePlus : GooglePlus, private db : AngularFirestore,private alertController : AlertController, private loginService : LoginService, private router : Router,private studentService :StudentsService) {}


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
        
          if(this.platform.is('cordova')){
            this.googlePlus.logout().then(()=>{
              this.af.signOut().then(()=>{
                this.router.navigateByUrl('/login')
              
              })
            })
          }else{

            this.af.signOut().then(()=>{
              this.router.navigate(['/','login'],{replaceUrl : true})
            })

          }
     
        

        }
      }
    ]
  });

  await alert.present();



  }
  ngOnInit(){
    this.af.onAuthStateChanged(user =>{
      if(user){
        const student_id= user.email.split('@')[0]
        this.studentService.setUserid(student_id)
        this.studentService.getuserid().subscribe(student_id => {
          this.db.collection('students').doc<StudentModel>(student_id).valueChanges().subscribe(student=>{
          
            this.student_photo = student.student_photo
            this.student_name = student.student_name
            this.student_id = student.student_id
          
          
          })
        })
      
      }else{
        this.router.navigate(['/','welcome'],{replaceUrl : true})
      }
    }
     
    )
    
 
  
  }


}
