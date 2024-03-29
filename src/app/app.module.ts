import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { LibrarystudentinfoComponent } from './components/librarystudentinfo/librarystudentinfo.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { IssuingbookComponent } from './components/issuingbook/issuingbook.component';
import { SuperTabsModule} from '@ionic-super-tabs/angular'
import {  AngularFireAuthModule } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { SendmessageComponent } from './components/sendmessage/sendmessage.component';
import { FormsModule } from '@angular/forms';
import { AddpostComponent } from './components/addpost/addpost.component';
import { CommentsComponent } from './components/comments/comments.component';
import { MessagesPage } from './pages/messages/messages.page';



const firebaseConfig = {
  apiKey: "AIzaSyAMK-eYvpXNnSYgehQwyrWwaB9z1DXapSQ",
  authDomain: "iitjammu-0.firebaseapp.com",
  databaseURL: "https://iitjammu-0.firebaseio.com",
  projectId: "iitjammu-0",
  storageBucket: "iitjammu-0.appspot.com",
  messagingSenderId: "479433138616",
  appId: "1:479433138616:web:c756a006c26ab468b0ef4d",
  measurementId: "G-JWN10XFFLX"
};

@NgModule({
  declarations: [AppComponent,LibrarystudentinfoComponent,CommentsComponent, IssuingbookComponent, SendmessageComponent, AddpostComponent],
  entryComponents: [],
  imports: [BrowserModule,SuperTabsModule.forRoot(), IonicModule.forRoot(), AppRoutingModule,AngularFireModule.initializeApp(firebaseConfig),AngularFirestoreModule,AngularFireAuthModule,FormsModule
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    
    Camera,
    GooglePlus
   
    
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
