import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { CommentModel } from 'src/app/models/post.model';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {

  @Input() post_id : string
  @Input() student_id : string
  Comment : string =""
  Comments : CommentModel[]
  constructor(private modalCtrl : ModalController, private db : AngularFirestore) { }

  ngOnInit() {
    this.db.collection('comments').doc(this.post_id).collection<CommentModel>('link',q=> q.orderBy('Timestamp')).snapshotChanges().subscribe(
      comments => {
        this.Comments =[]
        comments.forEach(comment => {
          this.Comments.push(comment.payload.doc.data())
        })

      }
    )
    
  }

  dismiss(){
    this.modalCtrl.dismiss({

    });
  }

  AddComment(){
    const comment = this.Comment
    this.Comment =""
    this.db.collection('comments').doc(this.post_id).collection('link').add({
      Timestamp : new Date().getTime(),
      comment : comment,
      student_id : this.student_id 
     
    })
  }

}
