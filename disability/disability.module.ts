import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisabilityPageRoutingModule } from './disability-routing.module';

import { DisabilityPage } from './disability.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisabilityPageRoutingModule
  ],
  declarations: [DisabilityPage]
})
export class DisabilityPageModule {}
