import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './auth/login.guard';
import { TripPageComponent } from './trip-page/trip-page.component';
import { TripsComponent } from './trips/trips.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'trips',
    component: TripsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tripPage/:tripId',
    component: TripPageComponent,
  },
  { path: 'auth', component: AuthComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
