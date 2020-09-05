import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Account2PageRoutingModule } from './account2-routing.module';
import { Account2Page } from './account2.page';
import { FileSizeFormatPipe } from './file-size-format.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    Account2PageRoutingModule
  ],
  declarations: [Account2Page,FileSizeFormatPipe]
})
export class Account2PageModule {}
