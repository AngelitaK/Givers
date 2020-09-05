import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MigrantPage } from './migrant.page';

const routes: Routes = [
  {
    path: '',
    component: MigrantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MigrantPageRoutingModule {}
