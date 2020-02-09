import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule, StepsService } from '@app/shared';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BannerComponent } from './banner/banner.component';
import { TopicsBannerComponent } from './topics-banner/topics-banner.component';

@NgModule({
  declarations: [DashboardComponent, BannerComponent, TopicsBannerComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, MatIconModule, MatButtonModule, MatDialogModule],
  providers: [StepsService]
})
export class DashboardModule {}
