import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PostModel } from 'src/app/models/post.model';

import { StudentModel } from 'src/app/models/student.model';

import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-posted-user',
  templateUrl: './posted-user.component.html',
  styleUrls: ['./posted-user.component.scss'],
})
export class PostedUserComponent implements OnInit {
 
  post_caption : string
  post_image : string
  currentStudent_name: string
  currentStudent_photo: string

  @Input()post_id:string
  constructor(private db : AngularFirestore) { }

  ngOnInit() {
    this.db.collection('posts').doc<PostModel>(this.post_id).valueChanges().subscribe(
      post => {
        this.post_caption=post.caption
        this.post_image = post.photo_url
        this.db.collection('students').doc<StudentModel>(post.student_id).valueChanges().subscribe(
          student=> {
           
            this.currentStudent_name = student.student_name
            this.currentStudent_photo = student.student_photo
           
          }
        )
        
      }

    )
   
  }

}
