import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, ModalController } from '@ionic/angular';
import { StudentModel } from 'src/app/models/student.model';

@Component({
  selector: 'app-librarystudentinfo',
  templateUrl: './librarystudentinfo.component.html',
  styleUrls: ['./librarystudentinfo.component.scss'],
})
export class LibrarystudentinfoComponent implements OnInit {
  @Input() student_id :string; 
  currentStudent : StudentModel

  constructor(private modalCtrl : ModalController,private alertController : AlertController, private db : AngularFirestore) { }

  ngOnInit() {

    this.db.collection('students').doc<StudentModel>(this.student_id).valueChanges().subscribe(student=>{
      this.currentStudent = student;
      

    })

  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      
    });
  }
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Add Book',
      inputs: [
        {
          type: 'text',
          value : this.currentStudent.student_name
        },
        {
          type: 'text',
          value: this.currentStudent.student_id
      
          
        },
        
        {
          name: 'bookname',
          type: 'text',
          placeholder: 'Book Name'
        },
        
        
        {
          name: 'takein',
          type: 'date'
        },
        {
          name: 'days',
          type: 'number',
          min: 1,
          max: 7
        },

        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

}
