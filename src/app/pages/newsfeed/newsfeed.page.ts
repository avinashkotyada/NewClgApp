import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { AddpostComponent } from 'src/app/components/addpost/addpost.component';
import { newsfeedModel } from 'src/app/models/newsfeed.model';
import { StudentModel } from 'src/app/models/student.model';
import { LikesService } from 'src/app/services/likes.service';
import { LoginService } from 'src/app/services/login.service';
import { NewsfeedService } from 'src/app/services/newsfeed.service';
import { StudentsService } from 'src/app/services/students.service';
import { Camera } from '@ionic-native/camera/ngx';
;

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.page.html',
  styleUrls: ['./newsfeed.page.scss'],
})
export class NewsfeedPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
 postsData:string[]
 data:string[]
  searchTerm: string = "";
  names:StudentModel[]
  current_user:string
  toplimit=2
  text:string
  constructor(public modalController: ModalController,private newsfeedService:NewsfeedService ,private students_service:StudentsService,private login_service:LoginService,private likesService:LikesService) { }
  
  ngOnInit() {
    this.newsfeedService.getAllPostsId().subscribe(postids => {this.postsData=postids
    // this.postsData=this.postsData.reverse()
    this.data=this.postsData.slice(0,this.toplimit)
    } )
    // this.filterNames(this.searchTerm)
    // this.current_user=this.login_service.getUserId()
    
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: AddpostComponent,
      
    });
    return await modal.present();
  }
  // filterNames(searchTerm) {
  //     this.students_service.getallstudents().subscribe(students => {
  //       this.names=students.filter(item => {
  //       return item.student_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
  //     })})
  // }
  // likes_checker(){

  // }
  // likes(postid:string){
  //   this.likesService.userId_like_postId(this.current_user,postid)
  // }
  loadData(event) {
    setTimeout(() => {
 
      console.log('Done');
      this.toplimit=this.toplimit+2
      this.data=this.postsData.slice(0,this.toplimit)
      event.target.complete();
      
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.data.length == this.postsData.length) {
       event.target.disabled = true
      }
    }, 500);
  }
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
  
}
