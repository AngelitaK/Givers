import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisabilityPage } from './disability.page';

const routes: Routes = [
  {
    path: '',
    component: DisabilityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisabilityPageRoutingModule {}
