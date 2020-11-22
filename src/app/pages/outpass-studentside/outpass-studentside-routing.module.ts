import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutpassStudentsidePage } from './outpass-studentside.page';

const routes: Routes = [
  {
    path: '',
    component: OutpassStudentsidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutpassStudentsidePageRoutingModule {}
