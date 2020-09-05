import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonormessagePage } from './donormessage.page';

const routes: Routes = [
  {
    path: '',
    component: DonormessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonormessagePageRoutingModule {}
