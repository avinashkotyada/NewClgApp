import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { SendmessageComponent } from 'src/app/components/sendmessage/sendmessage.component';
import { MessageModel, RecentMessageModel } from 'src/app/models/message.model';
import { StudentModel } from 'src/app/models/student.model';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  students: StudentModel[];
  dummyStudents: StudentModel[]
  id: string
  recents : RecentMessageModel[]
  constructor(private studentService: StudentsService,private db : AngularFirestore, private modalController: ModalController) { }

  ngOnInit() {
    
    this.studentService.getuserid().subscribe(id => {
      this.id = id

    })
    this.db.collection<StudentModel>('students').snapshotChanges().subscribe(students => {
      this.students = []
      students.forEach(student => {
        this.students.push(student.payload.doc.data())
      })
      this.dummyStudents = this.students

    })
    console.log(this.id)
    this.db.collection('recent').doc(this.id).collection<MessageModel>('link',q=> q.orderBy('Timestamp','desc')).snapshotChanges().subscribe(recents=>
      { this.recents=[]
        recents.forEach(recent=>{
          this.recents.push({...recent.payload.doc.data(),ide : recent.payload.doc.id})
        })
        console.log(this.recents)
      }


      
      )
      

  }

  

  filterStudents(event: any) {
    const searchTerm = event.detail.value;
    this.dummyStudents = this.students

    if (!searchTerm) {
      return;
    }

    this.dummyStudents = this.dummyStudents.filter(currentStudent => {
      if (currentStudent.student_name && searchTerm) {
        return (currentStudent.student_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || currentStudent.student_id.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  
  async SendMessageModal(student_id: string) {
    const modal = await this.modalController.create({
      component: SendmessageComponent,
      componentProps: {
        student_id: student_id
      }
    });
    return await modal.present();
  }


}
