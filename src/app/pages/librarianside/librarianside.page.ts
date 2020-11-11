import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { LibrarystudentinfoComponent } from 'src/app/components/librarystudentinfo/librarystudentinfo.component';
import { StudentModel } from 'src/app/models/student.model';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-librarianside',
  templateUrl: './librarianside.page.html',
  styleUrls: ['./librarianside.page.scss'],
})
export class LibrariansidePage implements OnInit {
  students : StudentModel[];
  dummyStudents : StudentModel[]

  constructor(private db:AngularFirestore, private modalController : ModalController) { }

  ngOnInit(){
    this.db.collection<StudentModel>('students').snapshotChanges().subscribe(students=>{
      this.students = []
      students.forEach(a=>{
        this.students.push(a.payload.doc.data())
  
        
      })
      this.dummyStudents = this.students

      
    })
  }
  async filterList(evt) {
    
  
    const searchTerm = evt.srcElement.value;
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
  async presentModal(student_id : string) {
    const modal = await this.modalController.create({
      component: LibrarystudentinfoComponent,
      
      componentProps : {
        'student_id' : student_id
      }
      
    });
    return await modal.present();
  }
      

    
  


}
