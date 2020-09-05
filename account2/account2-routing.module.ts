import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Account2Page } from './account2.page';

const routes: Routes = [
  {
    path: '',
    component: Account2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Account2PageRoutingModule {}
