import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { LoginService } from 'src/app/services/login.service';
import { AlertController } from '@ionic/angular';

import { StudentModel } from 'src/app/models/student.model';
import { StudentsService } from 'src/app/services/students.service';
import { AngularFirestore } from '@angular/fire/firestore';
;

@Component({
  selector: 'app-outpass-studentside',
  templateUrl: './outpass-studentside.page.html',
  styleUrls: ['./outpass-studentside.page.scss'],
})
export class OutpassStudentsidePage implements OnInit {
  Purpose_Outing='';
  PhoneNo_Outing='';
  
  student_name : string;
  student_id : string;
  student_outstatus:number;


  constructor( private barcodeScanner: BarcodeScanner, private studentService: StudentsService, private alertController: AlertController, private db: AngularFirestore) { }

  ngOnInit() {
    // this.db.collection('students').doc<StudentModel>(this.studentService.getuserid()).valueChanges().subscribe(student=>{
      
      
    //   this.student_name = student.student_name
    //   this.student_id = student.student_id
    //   this.student_outstatus = student.student_outstatus


      

    // })
  }

  GenerateQRCodeOutpass() {

    const encodeData = this.student_id+'_'+this.student_name+'_'+this.PhoneNo_Outing+'_'+this.Purpose_Outing+'_'+this.student_outstatus.toString();

    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,encodeData).then((encodedData) => {

      console.log(encodedData);
      // this.encodedData = encodedData;
  
  }, (err) => {
      console.log("Error occured : " + err);
  });  
  }
  async LongBreakForm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Prompt!',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Where are you going'
        },
        {
          name: 'name2',
          type: 'text',
          placeholder: "parent's Phone No"
        },
        // multiline input.
        
        
        // input date with min & max
        {
          name: 'name4',
          type: 'date',
          min: '2017-03-01',
          max: '2018-01-12',
          placeholder: 'From',
        },
        // input date without min nor max
        {
          name: 'name5',
          type: 'date',
          placeholder: 'Till',
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
          text: 'Apply',
          handler: (data) => {
            console.log('Confirm Ok');
            console.log(data.name1);
            // write the function to send this form to backend for confirmation
          }
        }
      ]
    });

    await alert.present();
  }


}


