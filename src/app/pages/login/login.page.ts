import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { StudentModel } from 'src/app/models/student.model';
import { LoginService } from 'src/app/services/login.service';
import { StudentsService } from 'src/app/services/students.service';
import firebase from 'firebase'
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private studentService: StudentsService, private loadingController: LoadingController, private platform: Platform, private toastController: ToastController, private db: AngularFirestore, private router: Router, private afAuth: AngularFireAuth, private googlePlus: GooglePlus) { }

  ngOnInit() {


  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Logged In Successfully',
      duration: 1200

    });
    toast.present();
  }

  clickongooglesignin() {

    const loadingController = this.loadingController.create({

      message: 'Please wait ,this may take some time',
      backdropDismiss: false,
    }).then(dialog => {

      if (this.platform.is('cordova')) {
        this.googlePlus.login({
        }).then(result => {
          dialog.present()
          const credential = firebase.auth.GoogleAuthProvider
            .credential(null, result.accessToken)
          this.afAuth.signInWithCredential(credential)
            .then((success) => {
              const user = success.user
              this.checkuseradd(user, dialog)
            }).catch(err => {
              console.log(`Error ${JSON.stringify(err)}`)
              dialog.dismiss()
            });

        }).catch(err => console.log(`Error ${JSON.stringify(err)}`));


      } else {


        this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(success => {
          const user = success.user;
          dialog.present()
          this.checkuseradd(user, dialog)

        }).
          catch(err => {
            console.log(err.message, 'error in google login');
          });



      }



    }

    )
  }

  checkuseradd(user: firebase.User, dialog: HTMLIonLoadingElement) {


    const student_id = user.email.split('@')[0]
    this.studentService.setUserid(student_id)
    this.db.collection('students').doc(student_id).snapshotChanges().subscribe(
      student => {
        if (student.payload.exists) {

          this.router.navigate(['/','home'], {replaceUrl : true})
          dialog.dismiss()
          this.presentToast()

        } else {
          this.db.collection('students').doc(student_id).set({
            student_uid: user.uid,
            student_photo: user.photoURL,
            student_name: user.displayName,
            student_phoneNumber: user.phoneNumber,
            student_id: student_id,
            student_email: user.email

          }

          ).then(success => {
          
            this.router.navigate(['/','home'], {replaceUrl : true})
            dialog.dismiss()
            this.presentToast()
          }


          )


        }
      }
    )

  }





}


