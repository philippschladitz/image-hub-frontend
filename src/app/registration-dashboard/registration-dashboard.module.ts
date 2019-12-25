import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { StepperComponent } from './stepper/stepper.component';
import {
  StepWelcomeComponent,
  StepGenderComponent,
  StepsService,
  StepLanguageCountryComponent,
  StepTopicsComponent,
  TopicCardComponent,
  StepFinalComponent,
} from './steps';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationDashboardComponent } from './registration-dashboard/registration-dashboard.component';
import { RegistrationDashboardRoutingModule } from './registration-dashboard-routing.module';
import { AnimatedBubbleComponent } from './animated-bubble/animated-bubble.component';

@NgModule({
  declarations: [
    RegistrationDashboardComponent,
    StepperComponent,
    StepWelcomeComponent,
    StepGenderComponent,
    StepLanguageCountryComponent,
    StepTopicsComponent,
    TopicCardComponent,
    StepFinalComponent,
    AnimatedBubbleComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RegistrationDashboardRoutingModule,
    FormsModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatProgressBarModule,
    MatSelectModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    StepsService
  ]
})
export class RegistrationDashboardModule { }
