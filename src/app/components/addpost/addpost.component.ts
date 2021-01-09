import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, ModalController } from '@ionic/angular';
// import { LikesService } from 'src/app/services/likes.service';
// import { LoginService } from 'src/app/services/login.service';
// import { NewsfeedService } from 'src/app/services/newsfeed.service';
import { Camera } from '@ionic-native/camera/ngx';
import { StudentsService } from 'src/app/services/students.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase'
@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.scss'],
})
export class AddpostComponent implements OnInit {
  binding: string
  imgUrl: string
  student_id: string
  @ViewChild('caption') Caption: IonInput
  // private newsfeedService:NewsfeedService
  constructor(private db: AngularFirestore, private fireStorage: AngularFireStorage, private camera: Camera, private modalController: ModalController, private studentsService: StudentsService) { }

  ngOnInit() {
    this.studentsService.getuserid().subscribe(
      student_id => {
        this.student_id = student_id

      }
    )
    this.takePicture()
  }

  addpost() {
    const time = new Date().getTime()
    const path = 'posts/' + this.student_id + '/' + time
    this.fireStorage.ref(path).putString(this.imgUrl, firebase.storage.StringFormat.DATA_URL).then(a => {
      
      a.ref.getDownloadURL().then(data => {
        const postid = this.db.createId()
        this.db.collection('posts').doc(postid).set({
          student_id: this.student_id,
          postid: postid,
          photo_url: data,
          caption: this.Caption.value,
          Timestamp: time

        }).then(() => {

          this.db.collection('studpostarray').doc(this.student_id).collection('link').doc(postid).set({
            Timestamp : time
          }).then(() => {
            this.dismiss()
          })
        })

      })



    }
    )


  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({

    });
  }
  takePicture() {
    this.camera.getPicture({
      quality: 100,
      targetHeight : 500,
      targetWidth : 800,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.imgUrl = "data:image/jpeg;base64," + imageData

    }).catch(err => {
      console.log(err)
    });
  }
}
