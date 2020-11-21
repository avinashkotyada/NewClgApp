import { Component, OnInit, Renderer2 } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { StudentModel } from 'src/app/models/student.model';
import { LoginService } from 'src/app/services/login.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  profile1 : StudentModel
  photo : string
  name : string
  id : string

  

  constructor(private db :AngularFirestore,private renderer : Renderer2,private modalController : ModalController,private studentService :StudentsService,private loginService : LoginService) { }

  ngOnInit() {
    this.db.collection('students').doc<StudentModel>(this.studentService.getCurrentUser().student_id).valueChanges().subscribe(student=>{
      
      this.photo = student.student_photo
      this.name = student.student_name
      this.id = student.student_id
    })

  }
  onClick(event){
    if(event.detail.checked){
      this.renderer.setAttribute(document.body,'color-theme','dark')

    }
    else{
      this.renderer.setAttribute(document.body,'color-theme','light')
    }
    
  }
  

}
