import { Component, Input, OnInit } from '@angular/core';
import { newsfeedModel } from 'src/app/models/newsfeed.model';
import { StudentModel } from 'src/app/models/student.model';
import { NewsfeedService } from 'src/app/services/newsfeed.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-posted-user',
  templateUrl: './posted-user.component.html',
  styleUrls: ['./posted-user.component.scss'],
})
export class PostedUserComponent implements OnInit {
  postData:newsfeedModel
  studentData:StudentModel
  @Input()post_id:string
  constructor( private newsfeedService :NewsfeedService,private studentService:StudentsService) { }

  ngOnInit() {
    this.newsfeedService.getPostsByPostid(this.post_id).subscribe(post => this.postData=post)
    this.studentService.getstudentbyid(this.postData.student_id).subscribe(Data => this.studentData=Data )
  }

}
