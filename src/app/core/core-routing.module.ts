import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationGuard, AuthGuard } from './guards';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { RedirectGuard } from './guards/redirect.guard';

const routes: Routes = [
  {
    path: 'registration-dashboard',
    loadChildren: '@app/registration-dashboard/registration-dashboard.module#RegistrationDashboardModule',
    canLoad: [RegistrationGuard],
  },
  {
    path: 'dashboard',
    loadChildren: '@app/dashboard/dashboard.module#DashboardModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: '@app/authentication/authentication.module#AuthenticationModule',
  },
  {
    path: '',
    pathMatch: 'full',
    component: PlaceholderComponent,
    canActivate: [RedirectGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
