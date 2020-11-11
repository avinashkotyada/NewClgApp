import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibrariansidePage } from './librarianside.page';

const routes: Routes = [
  {
    path: '',
    component: LibrariansidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibrariansidePageRoutingModule {}
