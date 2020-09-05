import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DonorwallPageRoutingModule } from './donorwall-routing.module';

import { DonorwallPage } from './donorwall.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DonorwallPageRoutingModule
  ],
  declarations: [DonorwallPage]
})
export class DonorwallPageModule {}
