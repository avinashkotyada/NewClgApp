import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { IonSegment, IonSlides, ModalController } from '@ionic/angular';
import { LibrarystudentinfoComponent } from 'src/app/components/librarystudentinfo/librarystudentinfo.component';
import { StudentModel } from 'src/app/models/student.model';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-librarianside',
  templateUrl: './librarianside.page.html',
  styleUrls: ['./librarianside.page.scss'],
})
export class LibrariansidePage implements OnInit {
  students: StudentModel[];
  dummyStudents: StudentModel[]
  @ViewChild('slides') Slides: IonSlides
  Segment = 0

  constructor(private db: AngularFirestore, private modalController: ModalController) { }
  slideOpts = {

    initialSlide: 0,
    speed: 400,

  };
  ngOnInit() {
    
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
  // scanBarcode() {
  //   const options: BarcodeScannerOptions = {
  //     preferFrontCamera: false,
  //     showFlipCameraButton: true,
  //     showTorchButton: true,
  //     torchOn: false,
  //     prompt: 'Place a barcode inside the scan area',
  //     resultDisplayDuration: 500,
  //     formats: 'EAN_13,EAN_8,QR_CODE,PDF_417',
  //     orientation: 'portrait',
  //   };

  //   this.barcodeScanner.scan(options).then(barcodeData => {
  //     console.log('Barcode data', barcodeData);
  //     this.scannedData = barcodeData.text;

  //   }).catch(err => {
  //     console.log('Error', err);
  //   });
  // } 


  








}

