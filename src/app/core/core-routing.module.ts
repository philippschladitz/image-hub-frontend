import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationGuard, AuthGuard } from './guards';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { RedirectGuard } from './guards/redirect.guard';

const routes: Routes = [
  {
    path: 'registration-dashboard',
    loadChildren: () => import('@app/registration-dashboard').then(m => m.RegistrationDashboardModule),
    canLoad: [RegistrationGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('@app/dashboard').then(m => m.DashboardModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('@app/authentication').then(m => m.AuthenticationModule),
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
