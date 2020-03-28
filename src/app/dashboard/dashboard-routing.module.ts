import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PinResolver } from '@app/shared';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PinDetailsComponent } from './pin-details/pin-details.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'pin-details/:id',
    component: PinDetailsComponent,
    resolve: {
      pin: PinResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
