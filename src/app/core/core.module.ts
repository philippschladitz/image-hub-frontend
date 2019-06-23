import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule
  ]
})
export class CoreModule { }
