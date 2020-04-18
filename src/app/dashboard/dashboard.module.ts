import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';

import { SharedModule, StepsService, PinService, PinResolver } from '@app/shared';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BannerComponent } from './banner/banner.component';
import { TopicsBannerComponent } from './topics-banner/topics-banner.component';
import { PinOverviewComponent } from './pin-overview/pin-overview.component';
import { PinComponent } from './pin/pin.component';
import { PinDetailsComponent } from './pin-details/pin-details.component';
import { UploadPhotoDialogComponent } from './upload-photo-dialog/upload-photo-dialog.component';
import { ShareMenuComponent } from './share-menu/share-menu.component';
import { PinMenuComponent } from './pin-menu/pin-menu.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BannerComponent,
    TopicsBannerComponent,
    PinOverviewComponent,
    PinComponent,
    PinDetailsComponent,
    UploadPhotoDialogComponent,
    ShareMenuComponent,
    PinMenuComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatMenuModule,
    MatDividerModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [StepsService, PinService, PinResolver]
})
export class DashboardModule {}
