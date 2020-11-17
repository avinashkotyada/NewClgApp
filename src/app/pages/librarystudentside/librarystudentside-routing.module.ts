import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibrarystudentsidePage } from './librarystudentside.page';

const routes: Routes = [
  {
    path: '',
    component: LibrarystudentsidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibrarystudentsidePageRoutingModule {}
