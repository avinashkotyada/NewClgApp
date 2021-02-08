import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { LoginService } from 'src/app/services/login.service';
import { AlertController } from '@ionic/angular';

import { OutpassRegisterLog, StudentModel } from 'src/app/models/student.model';
import { StudentsService } from 'src/app/services/students.service';
import { AngularFirestore } from '@angular/fire/firestore';
;

@Component({
  selector: 'app-outpass-studentside',
  templateUrl: './outpass-studentside.page.html',
  styleUrls: ['./outpass-studentside.page.scss'],
})
export class OutpassStudentsidePage implements OnInit {
 
  student_name : string;
  student_id : string;
  student_outstatus:number;
  Register_Logs : OutpassRegisterLog[]


  constructor( private barcodeScanner: BarcodeScanner, private studentService: StudentsService, private alertController: AlertController, private db: AngularFirestore) { }

  ngOnInit() {
    this.studentService.getuserid().subscribe(id => {
      this.db.collection('students').doc<StudentModel>(id).valueChanges().subscribe(student=>{


        this.student_name = student.student_name
        console.log(this.student_name)
        this.student_id = student.student_id
        this.student_outstatus = student.student_outstatus
      })

      this.db.collection('students').doc(id).collection<OutpassRegisterLog>('in-out-register').valueChanges().subscribe(logs => {
        this.Register_Logs =[]
        logs.forEach(log=>{
          this.Register_Logs.push(log)
        })
      })

    })
  
  }

  async OutpassForm(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Apply for a break',
      inputs: [
        {
          name: 'purpose',
          type: 'text',
          placeholder: 'Purpose'
        },
        {
          name: 'phoneno',
          type: 'number',
          placeholder: "Phone Number"
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
          text: 'Out',
          handler: (data) => {
          this.GenerateQRCodeOutpass(data.phoneno,data.purpose)
          }
        }
      ]
    });

    await alert.present();

  }

  GenerateQRCodeOutpass(PhoneNo : number,Purpose : string) {

    const encodeData = this.student_id+'_'+this.student_name+'_'+PhoneNo+'_'+Purpose+'_'+this.student_outstatus.toString()
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,encodeData).then((encodedData) => {

  
  }, (err) => {
      console.log("Error occured : " + err);
  });  
  }


  
  // async LongBreakForm() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Apply for a break',
  //     inputs: [
  //       {
  //         name: 'name1',
  //         type: 'text',
  //         placeholder: 'Where you are going'
  //       },
  //       {
  //         name: 'name2',
  //         type: 'text',
  //         placeholder: "parent's Phone No"
  //       },
  //       // multiline input.
        
        
  //       // input date with min & max
  //       {
  //         name: 'name4',
  //         type: 'date',
  //         min: '2017-03-01',
  //         max: '2021-01-12',
  //         placeholder: 'From',
  //       },
  //       // input date without min nor max
  //       {
  //         name: 'name5',
  //         type: 'date',
  //         placeholder: 'Till',
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
  //         text: 'Apply',
  //         handler: (data) => {
  //           console.log('Confirm Ok');
  //           console.log(data.name1);
  //           // write the function to send this form to backend for confirmation
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }


}


