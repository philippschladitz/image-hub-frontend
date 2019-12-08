import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CoreRoutingModule } from './core-routing.module';
import { RouterModule } from '@angular/router';
import { PlaceholderComponent } from './placeholder/placeholder.component';

@NgModule({
  declarations: [PlaceholderComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule
  ],
  exports: [
    RouterModule
  ]
})
export class CoreModule { }
