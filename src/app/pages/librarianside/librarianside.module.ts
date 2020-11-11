import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibrariansidePageRoutingModule } from './librarianside-routing.module';

import { LibrariansidePage } from './librarianside.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibrariansidePageRoutingModule
  ],
  declarations: [LibrariansidePage]
})
export class LibrariansidePageModule {}
