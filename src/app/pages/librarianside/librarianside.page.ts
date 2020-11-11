import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StudentModel } from 'src/app/models/student.model';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-librarianside',
  templateUrl: './librarianside.page.html',
  styleUrls: ['./librarianside.page.scss'],
})
export class LibrariansidePage implements OnInit {
  students : any;

  constructor(private db:AngularFirestore) { }

  ngOnInit(){
    this.db.collection('students').snapshotChanges().subscribe(students=>{
      this.students = []
      students.forEach(a=>{
        this.students.push(a.payload.doc.data())
         
        
        
      })
      
    })
  }
      

    
  


}
