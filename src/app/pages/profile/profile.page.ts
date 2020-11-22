import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { StudentModel } from 'src/app/models/student.model';
import { StudentsService } from 'src/app/services/students.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoginService } from 'src/app/services/login.service';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  student_photo : string
  student_name : string
  student_id : string
  student_phoneNumber : number
  student_email : string
  
  constructor(private studentService : StudentsService,
    private actionSheetController : ActionSheetController,
    private toastController :ToastController,
    private camera : Camera,
    private db : AngularFirestore
    ) 
    { }
  


  ngOnInit() {
    this.studentService.getuserid().subscribe(student_id=>{
      this.db.collection('students').doc<StudentModel>(student_id).valueChanges().subscribe(student=>{
          
        this.student_photo = student.student_photo
        this.student_name = student.student_name
        this.student_id = student.student_id
        this.student_phoneNumber = student.student_phoneNumber
        this.student_email = student.student_email
      })

    })
    
    
    

    
  }



  getPhoto(){
    this.camera.getPicture({
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType : this.camera.DestinationType.DATA_URL,
    }).then((res)=>
      {
         this.student_photo= 'data:image/jpeg;base64,'+res
      })
   
  }

    
      

    
    
    
    
  
  
  onSubmit(){
    this.studentService.updateCurrentUser(this.student_photo,this.student_phoneNumber)
    this.presentToast();
  
    
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Saved successfully',
      duration: 1500
    });
    toast.present();
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'options',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete Photo',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.student_photo= 'https://img.favpng.com/5/1/21/computer-icons-user-profile-avatar-female-png-favpng-cqykKc0Hpkh65ueWt6Nh2KFvS.jpg'
        }
      }, {
        text: 'Choose Photo',
        icon: 'image',
        handler: () => {
          this.getPhoto();
        }
  
      }]
    });
    await actionSheet.present();
  }

}
