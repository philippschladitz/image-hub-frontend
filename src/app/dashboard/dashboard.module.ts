import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule, StepsService } from '@app/shared';
import { BannerComponent } from './banner/banner.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TopicsBannerComponent } from './topics-banner/topics-banner.component';

@NgModule({
  declarations: [DashboardComponent, BannerComponent, TopicsBannerComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, MatIconModule, MatButtonModule],
  providers: [
    StepsService
  ]
})
export class DashboardModule {}
