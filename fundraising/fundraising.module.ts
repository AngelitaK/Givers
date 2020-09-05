import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FundraisingPageRoutingModule } from './fundraising-routing.module';

import { FundraisingPage } from './fundraising.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FundraisingPageRoutingModule
  ],
  declarations: [FundraisingPage]
})
export class FundraisingPageModule {}
