import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { StudentModel } from 'src/app/models/student.model';
import { FormsModule} from '@angular/forms'

@Component({
  selector: 'app-issuingbook',
  templateUrl: './issuingbook.component.html',
  styleUrls: ['./issuingbook.component.scss'],
})
export class IssuingbookComponent implements OnInit {

  @Input() student_id: string
  Student: StudentModel
  numbers: number[] = [1, 2, 3, 4, 5, 6]
  bookname : string
  takendate : string
  noofdays : string

  constructor(private db: AngularFirestore, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.db.collection('students').doc<StudentModel>(this.student_id).valueChanges().subscribe(
      student => {
        this.Student = student
      })
  }

  addbook() {

   const bookname= document.getElementById('bookname').nodeValue
   const takendate= document.getElementById('takendate').nodeValue
   const noofdays= document.getElementById('noofdays').nodeValue
    this.db.collection('bookhistory').doc(this.student_id).collection('link').add({
      book_name: bookname
      , takenin_date: takendate, submit_date: noofdays, status: 'pending'


    }

    )

  }


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({

    });
  }

  // async presentAlertPrompt() {
  //   const alert = await this.alertController.create({
  //     header: 'Add Book',
  //     inputs: [
  //      

  //      

  //       {
  //         name: 'takein',
  //         type: 'date'
  //       },
  //       {
  //         name: 'days',
  //         type: 'number',
  //         min: 1,
  //         max: 7,
  //       },


  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: () => {
  //           console.log('Confirm Cancel');
  //         }
  //       }, {
  //         text: 'Ok',
  //         handler: (data) => {

  //           this.db.collection('bookhistory').doc(data.student_id).collection('link').add({
  //             book_name: data.bookname
  //             , takenin_date: data.takein, submit_date: data.days, status: 'pending'


  //           }

  //           )


  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

}
