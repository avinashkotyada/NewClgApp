import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutpassStudentsidePageRoutingModule } from './outpass-studentside-routing.module';

import { OutpassStudentsidePage } from './outpass-studentside.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutpassStudentsidePageRoutingModule
  ],
  declarations: [OutpassStudentsidePage]
})
export class OutpassStudentsidePageModule {}
