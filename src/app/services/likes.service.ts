import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { likesModel } from '../models/likes.model';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  private likes=new BehaviorSubject<likesModel[]>([])
  constructor() { }
 
  onAddingNewpost(postId:string){
    this.likes.asObservable().pipe(take(1)).subscribe(like => this.likes.next(like.concat(new likesModel(postId,[]))))
    console.log(this.likes)
  }
  userId_like_postId(userId:string,postId:string){
    this.likes.asObservable().pipe(take(1)).subscribe(likeData =>{
      const likeIndex = likeData.findIndex(likes=>likes.postId===postId);
      const updatedData= [...likeData];
      updatedData[likeIndex].likes_array.push(userId)
      this.likes.next(updatedData)
    })
    console.log(this.likes)
  }
 
}
