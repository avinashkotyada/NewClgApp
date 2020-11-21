import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { StudentModel } from 'src/app/models/student.model';
import { StudentsService } from 'src/app/services/students.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit,OnDestroy {

  private form : FormGroup;
  profile1 : StudentModel;
  profileSub :Subscription;
  
  
  
  
  
  
  constructor(private studentService : StudentsService,
    private actionSheetController : ActionSheetController,
    private toastController :ToastController,
    private camera : Camera,
    private loginService : LoginService
    ) 
    { }
  

  ngOnInit() {
    this.profile1 = this.studentService.getCurrentUser()
    console.log(this.profile1)

      this.form = new FormGroup({
        name : new FormControl(this.profile1.student_name,{
          updateOn : 'change',
          validators : [Validators.required]
        }),
        emailid :  new FormControl({value:this.profile1.student_email,disabled :true},{
          updateOn : 'change',
          validators : [Validators.required]
        }),
        entry_no : new FormControl({value:this.profile1.student_id,disabled :true},{
          updateOn : 'change',
          validators : [Validators.required]
        }),
        photo : new FormControl(this.profile1.student_photo,{
          updateOn : 'change',
          validators  : [Validators.required]
  
        }),
        phone_number : new FormControl(this.profile1.student_phoneNumber,{
          updateOn : 'change',
          validators : [Validators.required]
        })
  
  
  
      });

    

    
  }
  getPhoto(){
    this.camera.getPicture({
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType : this.camera.DestinationType.DATA_URL,
    }).then((res)=>
      {
        this.form.get('photo').setValue('data:image/jpeg;base64,'+res)
      })
    this.form.markAsDirty();
  }

    
      

    
    
    
    
  
  
  onSubmit(){
    this.studentService.updateCurrentUser(this.form.value.photo,this.form.value.name,this.form.value.phone_number)
    
  
    
    
    this.presentToast();
    this.form.markAsPristine();
  
    
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
          this.form.get('photo').setValue('https://img.favpng.com/5/1/21/computer-icons-user-profile-avatar-female-png-favpng-cqykKc0Hpkh65ueWt6Nh2KFvS.jpg');
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
  ngOnDestroy(){
    if(this.profileSub){
      this.profileSub.unsubscribe();
    }
  }

}
