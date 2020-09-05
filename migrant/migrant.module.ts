import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MigrantPageRoutingModule } from './migrant-routing.module';

import { MigrantPage } from './migrant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MigrantPageRoutingModule
  ],
  declarations: [MigrantPage]
})
export class MigrantPageModule {}
