import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  

  {
    path: '',
    loadChildren: () => import('./index/index.module').then( m => m.IndexPageModule)
  },  {
    path: 'trash',
    loadChildren: () => import('./pages/trash/trash.module').then( m => m.TrashPageModule)
  },
  



  
  
  
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
