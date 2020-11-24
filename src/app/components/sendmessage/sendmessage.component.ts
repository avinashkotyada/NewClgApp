import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { StudentModel } from 'src/app/models/student.model';
import { StudentsService } from 'src/app/services/students.service';
import * as firebase from 'firebase'
import { MessageModel } from 'src/app/models/message.model';

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
  chatRef : MessageModel[]
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
    this.db.collection('chats').doc(this.id).collection<MessageModel>(this.student_id, q => q.orderBy('Timestamp')).snapshotChanges().subscribe(messages =>
      { this.chatRef=[]
        messages.forEach(message => {
        this.chatRef.push( message.payload.doc.data())
        }

     
        
        )

        console.log(this.chatRef)
        
      }

    )

  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({

    });
  }
  sendMessage(){
    const time = new Date().getTime()
    this.db.collection('chats').doc(this.id).collection(this.student_id).add({
      message : this.message,
      check : "sender",
      Timestamp : time
    })
    this.db.collection('chats').doc(this.student_id).collection(this.id).add({
      message : this.message,
      check : "receiver",
      Timestamp : time
    })
    this.message = ''
  

  }

}
