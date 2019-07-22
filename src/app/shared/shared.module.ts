import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { BackgroundImagesComponent } from './background-images/background-images.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [BackgroundImagesComponent, ToolbarComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
  ],
  exports: [BackgroundImagesComponent, ToolbarComponent]
})
export class SharedModule { }
