import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, ModalController } from '@ionic/angular';
import { BookHistory, BookHistorywithid } from 'src/app/models/bookhistory.model';
import { StudentModel } from 'src/app/models/student.model';


@Component({
  selector: 'app-librarystudentinfo',
  templateUrl: './librarystudentinfo.component.html',
  styleUrls: ['./librarystudentinfo.component.scss'],
})
export class LibrarystudentinfoComponent implements OnInit {
  @Input() student_id :string; 
  currentStudent : StudentModel
  student_history : BookHistorywithid[]
  constructor(private modalCtrl : ModalController,private alertController : AlertController, private db : AngularFirestore) { }

  ngOnInit() {

    this.db.collection('students').doc<StudentModel>(this.student_id).valueChanges().subscribe(student=>{
      this.currentStudent = student;
      
})

    this.db.collection('bookhistory').doc(this.student_id).collection<BookHistory>('link').snapshotChanges().subscribe(
      history => {
        this.student_history=[]
        history.forEach(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          this.student_history.push({...data,id : id})
          

        }
       
        
        )
       
         

      } 
    )

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
        { name : 'student_id',
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
          max: 7,
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
          handler: (data) => {
           
          this.db.collection('bookhistory').doc(data.student_id).collection('link') .add({
            book_name : data.bookname
            , takenin_date : data.takein, submit_date : data.days, status : 'pending'
                
                 
          }
    
          )
        
            
          }
        }
      ]
    });

    await alert.present();
  }

  async booksubmit(status : string, id : string){
    if(status==='submitted'){
      return
    }

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
  status : 'submitted'
})
            
          }
        }
      ]
    });

    await alert.present();


  }

 
 

}
