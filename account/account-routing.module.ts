import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountPage } from './account.page';
const routes: Routes = [
  {
    path: 'account',
    component: AccountPage,
    children: [
      {
        path:'account2',
        loadChildren: () => import('../account2/account2.module').then(m => m.Account2PageModule)
      },
      {
        path:'history',
        loadChildren: () => import('../history/history.module').then(m => m.HistoryPageModule)
      },
    ]
  },
  {
    path:'',
    redirectTo:'account/account2',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPageRoutingModule { }
