import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { LibrarystudentinfoComponent } from 'src/app/components/librarystudentinfo/librarystudentinfo.component';
import { StudentModel } from 'src/app/models/student.model';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx'
import { IssuingbookComponent } from 'src/app/components/issuingbook/issuingbook.component';
import { Book, BookHistory, BookHistorywithid } from 'src/app/models/bookhistory.model';


@Component({
  selector: 'app-librarianside',
  templateUrl: './librarianside.page.html',
  styleUrls: ['./librarianside.page.scss'],
})
export class LibrariansidePage implements OnInit {
  students: StudentModel[];
  dummyStudents: StudentModel[]
  books: Book[];
  dummybooks: Book[]
  pendings: BookHistorywithid[]


  constructor(private loadingController: LoadingController, private toastController: ToastController, private db: AngularFirestore, private modalController: ModalController, private barcodescanner: BarcodeScanner) { }

  ngOnInit() {

    this.db.collection<StudentModel>('students').snapshotChanges().subscribe(students => {
      this.students = []
      students.forEach(student => {
        this.students.push(student.payload.doc.data())
      })
      this.dummyStudents = this.students

    })

    this.db.collection<Book>('books').snapshotChanges().subscribe(books => {
      this.books = []
      books.forEach(book => {
        this.books.push(book.payload.doc.data())
      })
      this.dummybooks = this.books

    })


    this.db.collection<BookHistory>('pendings').snapshotChanges().subscribe(pendings => {
      this.pendings = []
      pendings.forEach(pending => {
        this.pendings.push({ ...pending.payload.doc.data(), id: pending.payload.doc.id })
      })

    })

  }


  filterStudents(event: any) {
    const searchTerm = event.detail.value;
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

  filterBooks(event: any) {
    const searchTerm = event.detail.value;
    this.dummybooks = this.books

    if (!searchTerm) {
      return;
    }

    this.dummybooks = this.dummybooks.filter(book => {
      if (book.book_name && searchTerm) {
        return (book.book_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || book.author.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });

  }

  async LibraryStudentInfoModal(student_id: string) {
    const modal = await this.modalController.create({
      component: LibrarystudentinfoComponent,
      componentProps: {
        student_id: student_id
      }
    });
    return await modal.present();
  }


  scanBarcode() {

    const time = new Date().getTime()

    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a QRcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417',
      orientation: 'portrait',
    };

    this.barcodescanner.scan(options).then(barcodeData => {


      const ScannedData = barcodeData.text;
      const student_id = ScannedData.split('/')[0]
      const a = time - parseInt(ScannedData.split('/')[1])
      if (a > 30000) {

        const toast = this.toastController.create({
          message: "QRcode Expired ,it only lasts for 30secs",
          duration: 1200
        }).then(
          p => p.present()
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
              p => p.present()
            )

          }
        }


      )


    }).catch(err => {
      console.log('Error', err);
    });
  }
  












}

