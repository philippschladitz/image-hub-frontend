import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '@app/shared/shared.module';
import { StepperComponent } from './stepper/stepper.component';
import { StepWelcomeComponent, StepGenderComponent } from './steps';

@NgModule({
  declarations: [
    DashboardComponent,
    StepperComponent,
    StepWelcomeComponent,
    StepGenderComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    SharedModule
  ]
})
export class DashboardModule { }
