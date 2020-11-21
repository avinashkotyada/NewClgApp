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
  student_photo : string
  student_name : string
  student_id : string

  

  constructor(private db :AngularFirestore,private renderer : Renderer2,private studentService :StudentsService) { }

  ngOnInit() {
    this.db.collection('students').doc<StudentModel>(this.studentService.getuserid()).valueChanges().subscribe(student=>{
      
      this.student_photo = student.student_photo
      this.student_name = student.student_name
      this.student_id = student.student_id
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
