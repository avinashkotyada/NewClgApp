import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StudentModel } from 'src/app/models/student.model';

@Component({
  selector: 'app-recentcard',
  templateUrl: './recentcard.component.html',
  styleUrls: ['./recentcard.component.scss'],
})
export class RecentcardComponent implements OnInit {
  @Input() student_id : string
  @Input() message : string
  currentStudent: StudentModel
  currentStudent_name: string
  currentStudent_photo: string
  constructor(private db : AngularFirestore) { }

  ngOnInit() {
    
    this.db.collection('students').doc<StudentModel>(this.student_id).valueChanges().subscribe(student => {
      this.currentStudent = student
      this.currentStudent_name = this.currentStudent.student_name
      this.currentStudent_photo = this.currentStudent.student_photo
    })
  }

}
