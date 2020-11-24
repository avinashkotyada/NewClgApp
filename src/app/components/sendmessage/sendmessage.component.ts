import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { StudentModel } from 'src/app/models/student.model';
import { StudentsService } from 'src/app/services/students.service';
import * as firebase from 'firebase'

@Component({
  selector: 'app-sendmessage',
  templateUrl: './sendmessage.component.html',
  styleUrls: ['./sendmessage.component.scss'],
})
export class SendmessageComponent implements OnInit {
  @Input() student_id: string;
  @ViewChild("messagebar") messagebar
  currentStudent: StudentModel
  currentStudent_name: string
  currentStudent_photo: string
  message : string
  id : string
  chatRef : any
  constructor(private studentService : StudentsService,private modalCtrl: ModalController,private db : AngularFirestore) {

   }

  ngOnInit(){

    this.studentService.getuserid().subscribe(id=>{
      this.id =id

    })
  
    this.db.collection('students').doc<StudentModel>(this.student_id).valueChanges().subscribe(student => {
      this.currentStudent = student
      this.currentStudent_name = this.currentStudent.student_name
      this.currentStudent_photo = this.currentStudent.student_photo
    })
    this.chatRef = this.db.collection('chats').doc(this.id).collection(this.student_id,ref=>ref.orderBy('Timestamp')).valueChanges()

  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({

    });
  }
  sendMessage(){
    this.db.collection('chats').doc(this.id).collection(this.student_id).add({
      message : this.message,
      id : this.id,
      Timestamp : firebase.default.firestore.FieldValue.serverTimestamp()
    })
    this.db.collection('chats').doc(this.student_id).collection(this.id).add({
      message : this.message,
      id : this.student_id,
      Timestamp : firebase.default.firestore.FieldValue.serverTimestamp()
    })
    this.message = ''
  

  }

}
