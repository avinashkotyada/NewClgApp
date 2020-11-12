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
  declarations: [AppComponent,LibrarystudentinfoComponent,IssuingbookComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,AngularFireModule.initializeApp(firebaseConfig),AngularFirestoreModule],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    
    Camera
   
    
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
