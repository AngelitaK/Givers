import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonormessagePageRoutingModule } from './donormessage-routing.module';

import { DonormessagePage } from './donormessage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonormessagePageRoutingModule
  ],
  declarations: [DonormessagePage]
})
export class DonormessagePageModule {}
