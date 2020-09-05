import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElderlyPageRoutingModule } from './elderly-routing.module';

import { ElderlyPage } from './elderly.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElderlyPageRoutingModule
  ],
  declarations: [ElderlyPage]
})
export class ElderlyPageModule {}
