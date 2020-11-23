import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { SendmessageComponent } from 'src/app/components/sendmessage/sendmessage.component';
import { StudentModel } from 'src/app/models/student.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  students: StudentModel[];
  dummyStudents: StudentModel[]
  constructor(private db : AngularFirestore, private modalController: ModalController) { }

  ngOnInit() {
    this.db.collection<StudentModel>('students').snapshotChanges().subscribe(students => {
      this.students = []
      students.forEach(student => {
        this.students.push(student.payload.doc.data())
      })
      this.dummyStudents = this.students

    })

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
