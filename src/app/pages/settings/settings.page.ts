import { Component, OnInit, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ResetpasswordComponent } from 'src/app/components/resetpassword/resetpassword.component';
import { StudentModel } from 'src/app/models/student.model';
import { LoginService } from 'src/app/services/login.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  profile1 : StudentModel;
  sub :Subscription;
  current_student_id : string

  constructor(private renderer : Renderer2,private modalController : ModalController,private studentService :StudentsService,private loginService : LoginService) { }

  ngOnInit() {
    this.current_student_id = this.loginService.getUserId()
    this.sub = this.studentService.getallstudents().subscribe(data=>
      this.profile1 = data.filter(p=>p.student_id === this.current_student_id)[0]);

  }
  onClick(event){
    if(event.detail.checked){
      this.renderer.setAttribute(document.body,'color-theme','dark')

    }
    else{
      this.renderer.setAttribute(document.body,'color-theme','light')
    }
    
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ResetpasswordComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
