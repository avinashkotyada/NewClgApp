import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { BookHistory, BookHistorywithid } from 'src/app/models/bookhistory.model';
import { StudentModel } from 'src/app/models/student.model';



@Component({
  selector: 'app-librarystudentinfo',
  templateUrl: './librarystudentinfo.component.html',
  styleUrls: ['./librarystudentinfo.component.scss'],
})
export class LibrarystudentinfoComponent implements OnInit {
  @Input() student_id: string;
  currentStudent: StudentModel
  currentStudent_name: string
  currentStudent_photo: string
  student_history: BookHistorywithid[]
  constructor(private toastctrl: ToastController, private loadingController: LoadingController, private modalCtrl: ModalController, private alertController: AlertController, private db: AngularFirestore) { }

  ngOnInit() {


    this.db.collection('students').doc<StudentModel>(this.student_id).valueChanges().subscribe(student => {
      this.currentStudent = student
      this.currentStudent_name = this.currentStudent.student_name
      this.currentStudent_photo = this.currentStudent.student_photo
    })

    this.db.collection('bookhistory').doc(this.student_id).collection<BookHistory>('link', q => q.orderBy('takenin_date')).snapshotChanges().subscribe(
      total_history => {
        this.student_history = []
        total_history.forEach(single_history => {
          const data = single_history.payload.doc.data();
          const id = single_history.payload.doc.id;
          this.student_history.push({ ...data, id: id })
        }
        )
      }
    )


  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({

    });
  }



  async booksubmit(id: string) {
    const alert = await this.alertController.create({

      header: 'Confirm Submit',
      message: 'is he going to submit this book',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Submit',
          handler: () => {
            this.db.collection('bookhistory').doc(this.student_id).collection('link').doc(id).update({
              submit_date: new Date().getTime(),
              status: 'submitted'
            })

            this.db.collection('pendings').doc(id).delete()

            

          }
        }
      ]
    });

    await alert.present();


  }





}
