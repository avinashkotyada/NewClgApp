import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { StudentsService } from './services/students.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private studentService : StudentsService,
    private router : Router,
    private af : AngularFireAuth,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.af.onAuthStateChanged(user =>{
        if(user){
          const student_id= user.email.split('@')[0]
          this.studentService.setUserid(student_id)
          this.router.navigateByUrl('/home')
        }else{
          this.router.navigateByUrl('/welcome')
        }
      }
       
      )
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
