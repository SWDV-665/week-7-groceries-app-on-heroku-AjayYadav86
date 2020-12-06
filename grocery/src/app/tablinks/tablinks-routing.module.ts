// tablinks-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablinksPage } from './tablinks.page';

const routes: Routes = [
  {
    path: 'tablinks',
    component: TablinksPage,
    children: [
      {
        path: 'Grocery',
        loadChildren: () => import('../grocery/grocery.module').then(m => m.GroceryPageModule)
      },
      {
        path: 'Contact US',
        loadChildren: () => import('../contactus/contactus.module').then(m => m.ContactusPageModule)
      },
      {
        path: 'About US',
        loadChildren: () => import('../aboutus/aboutus.module').then(m => m.AboutusPageModule)
      },
      {
        path: '',
        redirectTo: '/tablinks/Grocery',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tablinks/Grocery',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablinksPageRoutingModule { }
