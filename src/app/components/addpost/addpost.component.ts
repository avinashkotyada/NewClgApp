import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LikesService } from 'src/app/services/likes.service';
import { LoginService } from 'src/app/services/login.service';
import { NewsfeedService } from 'src/app/services/newsfeed.service';
import { Camera } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.scss'],
})
export class AddpostComponent implements OnInit {
  binding:string
  imgUrl:string
  stud_id:string

  constructor(private newsfeedService:NewsfeedService,private modalController: ModalController,private loginservice:LoginService,private likesService:LikesService,private camera:Camera) { }

  ngOnInit() {
    this.stud_id=this.loginservice.getUserId()
    this.takePicture()
  }
  logChange(event) {
    this.binding=event.detail.value
  }
  addpost(){
     const id=Math.random().toString()
     this.newsfeedService.addNewpostData(this.imgUrl,id,this.stud_id,this.binding)
    this.likesService.onAddingNewpost(id)
     this.dismiss()
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      
    });
  }
  takePicture(){
    this.camera.getPicture({
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.imgUrl= "data:image/jpeg;base64,"+imageData
      console.log(imageData)
     }).catch(err =>{
       console.log(err)
     });
    }
}
