import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { BackgroundImagesComponent } from './background-images/background-images.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TopicCardComponent, StepTopicsComponent, StepFinalComponent, EditTopicsDialogComponent } from './components';

@NgModule({
  declarations: [
    BackgroundImagesComponent,
    ToolbarComponent,
    TopicCardComponent,
    StepTopicsComponent,
    StepFinalComponent,
    EditTopicsDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  exports: [
    BackgroundImagesComponent,
    ToolbarComponent,
    TopicCardComponent,
    StepTopicsComponent,
    StepFinalComponent,
    EditTopicsDialogComponent
  ]
})
export class SharedModule {}
