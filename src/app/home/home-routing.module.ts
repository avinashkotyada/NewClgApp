import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component : HomePage,
    children :[
      {
        path : '',
        redirectTo :'newsfeed',
        pathMatch :'full'
      },{
        path: 'newsfeed',
        loadChildren: () => import('../pages/newsfeed/newsfeed.module').then( m => m.NewsfeedPageModule)
      },
      {
        path: 'timeline',
        loadChildren: () => import('../pages/timeline/timeline.module').then( m => m.TimelinePageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../pages/settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path : 'profile',
        loadChildren:()=>import('../pages/profile/profile.module').then(m=>m.ProfilePageModule)
      },
      
    ]
  },
  {
    path: 'librarianside',
    loadChildren: () => import('../pages/librarianside/librarianside.module').then( m => m.LibrariansidePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
