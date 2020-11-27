import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { AddpostComponent } from 'src/app/components/addpost/addpost.component';
import { PostModel } from 'src/app/models/post.model';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.page.html',
  styleUrls: ['./newsfeed.page.scss'],
})
export class NewsfeedPage implements OnInit {
 postids : string[]
  constructor(public modalController: ModalController,private db : AngularFirestore) { }

  ngOnInit() {
    this.db.collection('posts',q=> q.orderBy('Timestamp','desc')).snapshotChanges().subscribe(posts => {
      this.postids =[]
      posts.forEach(post => {
        this.postids.push(post.payload.doc.id)
      })
      console.log(this.postids)
    })
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddpostComponent,
      
    });
    return await modal.present();
  }

}
