import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '@app/shared/shared.module';
import { StepperComponent } from './stepper/stepper.component';
import {
  StepWelcomeComponent,
  StepGenderComponent,
  StepsService,
  StepLanguageCountryComponent,
  StepTopicsComponent,
  TopicCardComponent,
} from './steps';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    DashboardComponent,
    StepperComponent,
    StepWelcomeComponent,
    StepGenderComponent,
    StepLanguageCountryComponent,
    StepTopicsComponent,
    TopicCardComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DashboardRoutingModule,
    FormsModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    StepsService
  ]
})
export class DashboardModule { }
