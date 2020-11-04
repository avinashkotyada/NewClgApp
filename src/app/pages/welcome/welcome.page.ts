import { Component, OnInit, ViewChild } from '@angular/core';
import { IonButton, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  buttonvisible : Boolean
  constructor() { }

  ngOnInit() {

    this.buttonvisible = false
    
  }
  slideOpts = {
    initialSlide: 0,
    speed: 400

    
  };


  slideChanged(slides: IonSlides) {
    slides.getActiveIndex().then((index: number) => {
      if(index===2){
        this.buttonvisible=true
      }else{
        this.buttonvisible=false
      }
    
    });
  } 
}
