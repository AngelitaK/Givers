import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonorwallPage } from './donorwall.page';

const routes: Routes = [
  {
    path: '',
    component: DonorwallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonorwallPageRoutingModule {}
