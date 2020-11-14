import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IonSegment, IonSlides, ModalController, ToastController } from '@ionic/angular';
import { LibrarystudentinfoComponent } from 'src/app/components/librarystudentinfo/librarystudentinfo.component';
import { StudentModel } from 'src/app/models/student.model';
import { StudentsService } from 'src/app/services/students.service';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx'
import { IssuingbookComponent } from 'src/app/components/issuingbook/issuingbook.component';

@Component({
  selector: 'app-librarianside',
  templateUrl: './librarianside.page.html',
  styleUrls: ['./librarianside.page.scss'],
})
export class LibrariansidePage implements OnInit {
  students: StudentModel[];
  ScannedData: string;
  dummyStudents: StudentModel[]
  @ViewChild('slides') Slides: IonSlides
  Segment = 0

  constructor(private toastController : ToastController, private db: AngularFirestore, private modalController: ModalController, private barcodescanner: BarcodeScanner) { }
  slideOpts = {

    initialSlide: 0,
    speed: 400,

  };
  ngOnInit() {
    console.log(new Date().getTime())

    this.db.collection<StudentModel>('students').snapshotChanges().subscribe(students => {
      this.students = []
      students.forEach(a => {
        this.students.push(a.payload.doc.data())

      })
      this.dummyStudents = this.students


    })








  }
  async filterList(evt) {
    const searchTerm = evt.srcElement.value;
    this.dummyStudents = this.students

    if (!searchTerm) {
      return;
    }

    this.dummyStudents = this.dummyStudents.filter(currentStudent => {
      if (currentStudent.student_name && searchTerm) {
        return (currentStudent.student_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || currentStudent.student_id.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }
  async presentModal(student_id: string) {
    const modal = await this.modalController.create({
      component: LibrarystudentinfoComponent,

      componentProps: {
        'student_id': student_id
      }

    });
    return await modal.present();
  }


  slidechange() {
    this.Slides.getActiveIndex().then((index: number) => {
      this.Segment = index

    }
    )


  }

  segmentchange(event: any) {

    this.Slides.slideTo(event.detail.value)
  }
  scanBarcode() {
    const time = new Date().getTime()

    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417',
      orientation: 'portrait',
    };

    this.barcodescanner.scan(options).then(barcodeData => {


      this.ScannedData = barcodeData.text;

      
      const student_id = this.ScannedData.split('/')[0]
      const a= time-parseInt( this.ScannedData.split('/')[1])
      if(a>30000){
        
      const toast = this.toastController.create({
        message: "QrCode Expired it only lasts for 30secs" ,
        duration: 1200
        }).then(
          p=> p.present()
        )


        return

      }

      this.db.collection('students').doc(student_id).snapshotChanges().subscribe(
        student => {
      
          if (student.payload.exists) {

            const modal = this.modalController.create({
              component: IssuingbookComponent,

              componentProps: {
                'student_id': student_id
              }

            }).then(p => p.present())




          } else {

            const toast = this.toastController.create({
              message: "Student doesn't exists",
              duration: 1200
            }).then(
              p=> p.present()
            )
           
          }
        }
        

    )


  }).catch(err => {
    console.log('Error', err);
    });
  } 


  








}

