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
  currentStudent: StudentModel
  currentStudent_name: string
  currentStudent_photo: string
  message: string=""
  id: string
  chatRef: MessageModel[]
  @ViewChild('content') private content : any;
  constructor(private studentService: StudentsService, private modalCtrl: ModalController, private db: AngularFirestore) {

  }

  ngOnInit() {
    this.scrollToBottomOnInit();

    this.studentService.getuserid().subscribe(id => {
      this.id = id

    })

    this.db.collection('students').doc<StudentModel>(this.student_id).valueChanges().subscribe(student => {
      this.currentStudent = student
      this.currentStudent_name = this.currentStudent.student_name
      this.currentStudent_photo = this.currentStudent.student_photo
    })
    this.db.collection('chats').doc(this.id).collection<MessageModel>(this.student_id, q => q.orderBy('Timestamp')).snapshotChanges().subscribe(messages => {
      this.chatRef = []
      messages.forEach(message => {
        this.chatRef.push(message.payload.doc.data())
      }



      )

      console.log(this.chatRef)

    }

    )

  }
  scrollToBottomOnInit() {
    setTimeout(() => {
        if (this.content.scrollToBottom) {
            this.content.scrollToBottom(10);
        }
    }, 500);
}

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({

    });
  }
  sendMessage() {
    
    const time = new Date().getTime()
    const mess = this.message
    this.message = ''
    this.db.collection('chats').doc(this.id).collection(this.student_id).add({
      message: mess,
      check: "sender",
      Timestamp: time
    
    }).then(() => {
      this.db.collection('recent').doc(this.id).collection('link').doc(this.student_id).set({
        message: mess,
        check: "sender",
        Timestamp: time
      })

    })


    this.db.collection('chats').doc(this.student_id).collection(this.id).add({
      message: mess,
      check: "receiver",
      Timestamp: time
    }).then(() => {
      this.db.collection('recent').doc(this.student_id).collection('link').doc(this.id).set({
        message: mess,
        check: "receiver",
        Timestamp: time
      })
    })
   


  }

}
