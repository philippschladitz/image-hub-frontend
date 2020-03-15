import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

import { SharedModule, StepsService, PinService } from '@app/shared';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BannerComponent } from './banner/banner.component';
import { TopicsBannerComponent } from './topics-banner/topics-banner.component';
import { PinOverviewComponent } from './pin-overview/pin-overview.component';
import { PinComponent } from './pin/pin.component';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [DashboardComponent, BannerComponent, TopicsBannerComponent, PinOverviewComponent, PinComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatMenuModule,
    MatDividerModule
  ],
  providers: [StepsService, PinService]
})
export class DashboardModule {}
