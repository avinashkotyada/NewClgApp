import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {

  constructor(private modalCtrl : ModalController) { }

  ngOnInit() {}
  dismiss() {
    
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
