import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { StudentModel } from 'src/app/models/student.model';

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
  constructor(private modalCtrl: ModalController,private db : AngularFirestore) { }

  ngOnInit(){
  
    this.db.collection('students').doc<StudentModel>(this.student_id).valueChanges().subscribe(student => {
      this.currentStudent = student
      this.currentStudent_name = this.currentStudent.student_name
      this.currentStudent_photo = this.currentStudent.student_photo
    })
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({

    });
  }

}
