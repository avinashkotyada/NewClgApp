import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibrarystudentsidePageRoutingModule } from './librarystudentside-routing.module';

import { LibrarystudentsidePage } from './librarystudentside.page';
import { SuperTabsModule} from '@ionic-super-tabs/angular'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuperTabsModule,
    LibrarystudentsidePageRoutingModule
  ],
  declarations: [LibrarystudentsidePage]
})
export class LibrarystudentsidePageModule {}
