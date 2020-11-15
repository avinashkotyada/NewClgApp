import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IonDatetime, IonInput, IonSelect, ModalController } from '@ionic/angular';
import { StudentModel } from 'src/app/models/student.model';
import { FormControl, FormGroup, FormsModule, Validators} from '@angular/forms'

@Component({
  selector: 'app-issuingbook',
  templateUrl: './issuingbook.component.html',
  styleUrls: ['./issuingbook.component.scss'],
})
export class IssuingbookComponent implements OnInit {

  @Input() student_id: string
  Student: StudentModel
  numbers: number[] = [1, 2, 3, 4, 5, 6]
  time : Date
  @ViewChild('bookname') Bookname : IonInput
  // @ViewChild('takendate') Takendate : IonDatetime
  @ViewChild('noofdays') NoofDays : IonSelect

  constructor(private db: AngularFirestore, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.db.collection('students').doc<StudentModel>(this.student_id).snapshotChanges().subscribe(
      student => {
        this.Student= student.payload.data()
      })


      this.time = new Date()
 
  }



  addbook() {
    
    console.log(this.time.getTime())

    this.db.collection('bookhistory').doc(this.student_id).collection('link').add({
      book_name: this.Bookname.value
      , takenin_date: this.time.getTime() , submit_date: parseInt(this.NoofDays.value), status: 'pending'


    }

    ).then( p=>  
      this.dismiss()
    ).catch( err=> 
      console.log(err))

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
