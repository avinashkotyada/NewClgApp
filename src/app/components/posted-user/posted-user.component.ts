import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { PostModel } from 'src/app/models/post.model';

import { StudentModel } from 'src/app/models/student.model';

import { StudentsService } from 'src/app/services/students.service';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-posted-user',
  templateUrl: './posted-user.component.html',
  styleUrls: ['./posted-user.component.scss'],
})
export class PostedUserComponent implements OnInit {

  post_caption: string
  post_image: string
  currentStudent_name: string
  currentStudent_photo: string
  student_id: string
  liked : boolean
  likesCount : number

  @Input() post_id: string
  constructor(private db: AngularFirestore, private studentsService: StudentsService,private modalController : ModalController) { }

  ngOnInit() {

    this.db.collection('posts').doc<PostModel>(this.post_id).valueChanges().subscribe(
      post => {
        this.post_caption = post.caption
        this.post_image = post.photo_url
        this.db.collection('students').doc<StudentModel>(post.student_id).valueChanges().subscribe(
          student => {

            this.currentStudent_name = student.student_name
            this.currentStudent_photo = student.student_photo

          }
        )

      }

    )

    this.db.collection('likes').doc(this.post_id).collection('link').snapshotChanges().subscribe(
      likes => {
        this.likesCount= likes.length
      

      }
    )

    this.studentsService.getuserid().subscribe(student_id => {
      this.student_id = student_id
      this.db.collection('likes').doc(this.post_id).collection('link').doc(this.student_id).snapshotChanges().subscribe(
        like => {
          this.liked= like.payload.exists
        
  
        }
      )
    })


   



  }

  addlike() {

    this.db.collection('likes').doc(this.post_id).collection('link').doc(this.student_id).set({
      Timestamp: new Date().getTime()
    })

  }

  removelike() {

    this.db.collection('likes').doc(this.post_id).collection('link').doc(this.student_id).delete()


  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CommentsComponent,
      componentProps : {
        post_id : this.post_id,
        student_id : this.student_id
      }
      
    });
    return await modal.present();
  }


}
