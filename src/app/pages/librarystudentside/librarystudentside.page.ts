import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { IonSlides } from '@ionic/angular';
import { Book, BookHistory } from 'src/app/models/bookhistory.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-librarystudentside',
  templateUrl: './librarystudentside.page.html',
  styleUrls: ['./librarystudentside.page.scss'],
})
export class LibrarystudentsidePage implements OnInit {

  student_id: string
  student_history: BookHistory[];
  books: Book[];
  dummybooks: Book[]


  constructor(private Loginservice: LoginService, private db: AngularFirestore, private loginService: LoginService, private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
    this.student_id = this.Loginservice.getUserId()
    this.db.collection('bookhistory').doc(this.student_id).collection<BookHistory>('link',q => q.orderBy('takenin_date')).snapshotChanges().subscribe(history => {
      this.student_history = []
      history.forEach(a => {
        const data = a.payload.doc.data();
        this.student_history.push(data);
      })


    })
    this.db.collection<Book>('books').snapshotChanges().subscribe(books => {
      this.books = []
      books.forEach(book => {
        this.books.push(book.payload.doc.data())
      })
      this.dummybooks = this.books

    })


  }
 
  encodeText() {
    const time = new Date().getTime().toString()
    const encodeData = this.student_id+'/'+ time
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,encodeData).then((encodedData) => {

  }, (err) => {
      console.log("Error occured : " + err);
  });    
  
  }
  filterBooks(event) {
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

}
