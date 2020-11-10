import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { newsfeedModel } from '../models/newsfeed.model';
import { StudentsService } from './students.service';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {
  
  constructor(private students_service:StudentsService) { }
private newsfeed_posts= new BehaviorSubject<newsfeedModel[]>([])
private posts_ids= new BehaviorSubject<string[]>([])
getAllPosts(){
  return this.newsfeed_posts.asObservable()
}

addNewpostData( newsfeed_image: string,  newsfeed_id : string,   student_id : string, newsfeed_description : string){
  this.getAllPosts().pipe(take(1)).subscribe(posts => this.newsfeed_posts.next(posts.concat(new newsfeedModel(newsfeed_image,newsfeed_id,student_id,newsfeed_description ))))
  console.log(this.newsfeed_posts)
  this.getAllPostsId().pipe(take(1)).subscribe(ids => this.posts_ids.next(ids.concat(newsfeed_id)))
}
getAllPostsId(){
  return this.posts_ids.asObservable()
}
getPostsByPostid(postid:string){
  return this.getAllPosts().pipe(map(posts => { return { ...posts.find(p => p.newsfeed_id === postid) } }))
}

}
