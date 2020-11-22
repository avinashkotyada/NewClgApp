import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IonInput, IonSelect, ModalController } from '@ionic/angular';
import { StudentModel } from 'src/app/models/student.model';
@Component({
  selector: 'app-issuingbook',
  templateUrl: './issuingbook.component.html',
  styleUrls: ['./issuingbook.component.scss'],
})
export class IssuingbookComponent implements OnInit {

  @Input() student_id: string
  currentStudent: StudentModel
  currentStudent_name: string
  currentStudent_photo: string
  numbers: number[] = [1, 2, 3, 4, 5, 6]
  time: Date
  @ViewChild('bookname') Bookname: IonInput
  @ViewChild('noofdays') NoofDays: IonSelect

  constructor(private db: AngularFirestore, private modalCtrl: ModalController) {

  }

  ngOnInit() {
    this.time = new Date()
    this.db.collection('students').doc<StudentModel>(this.student_id).valueChanges().subscribe(
      student => {

        this.currentStudent = student
        this.currentStudent_name = this.currentStudent.student_name
        this.currentStudent_photo = this.currentStudent.student_photo
      })


    

  }

  addbook() {

    const id = this.db.createId()
    this.db.collection('bookhistory').doc(this.student_id).collection('link').doc(id).set({
      book_name: this.Bookname.value
      , takenin_date: this.time.getTime(), submit_date: parseInt(this.NoofDays.value), status: 'pending',
      student_id: this.student_id
    })

this.db.collection('pendings').doc(id).set({
      book_name: this.Bookname.value
      , takenin_date: this.time.getTime(), submit_date: parseInt(this.NoofDays.value), status: 'pending',
      student_id: this.student_id
    })

    this.dismiss()

  }


  dismiss() {
    this.modalCtrl.dismiss({

    });
  }



}
