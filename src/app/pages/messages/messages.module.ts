import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagesPageRoutingModule } from './messages-routing.module';

import { MessagesPage } from './messages.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { RecentcardComponent } from 'src/app/components/recentcard/recentcard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuperTabsModule,
    MessagesPageRoutingModule
  ],
  declarations: [MessagesPage,RecentcardComponent]
})
export class MessagesPageModule {}
