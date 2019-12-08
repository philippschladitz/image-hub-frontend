import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationDashboardComponent } from './registration-dashboard/registration-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrationDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationDashboardRoutingModule { }
