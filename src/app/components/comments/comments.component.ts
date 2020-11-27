import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {

  @Input() post_id : string
  @Input() student_id : string

  constructor() { }

  ngOnInit() {
    console.log(this.post_id)
  }

}
