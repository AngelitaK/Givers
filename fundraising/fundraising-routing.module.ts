import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FundraisingPage } from './fundraising.page';

const routes: Routes = [
  {
    path: '',
    component: FundraisingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FundraisingPageRoutingModule {}
