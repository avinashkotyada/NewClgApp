import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibrarystudentsidePageRoutingModule } from './librarystudentside-routing.module';

import { LibrarystudentsidePage } from './librarystudentside.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibrarystudentsidePageRoutingModule
  ],
  declarations: [LibrarystudentsidePage]
})
export class LibrarystudentsidePageModule {}
