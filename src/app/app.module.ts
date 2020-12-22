import { BrowserModule } from '@angular/platform-browser';
import { ClassProvider, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsconfigure from '../aws-exports';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripsComponent } from './trips/trips.component';
import * as fromApp from './store/app.reducer';
import { TripsEffects } from './shared/trips-store/trips.effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { environment } from 'src/environments/environment';
import { TripCardComponent } from './trips/trip-card/trip-card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TripPageComponent } from './trip-page/trip-page.component';
import { HeaderComponent } from './header/header.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { TripImageComponent } from './trip-page/trip-image/trip-image.component';
import { MatIconModule } from '@angular/material/icon';
import { AddEditFormComponent } from './shared/add-edit-form/add-edit-form.component';

Amplify.configure(awsconfigure);

const LOGGING_INTERCEPTOR_PROVIDER: ClassProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: LoggingInterceptor,
  multi: true,
};

@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    TripCardComponent,
    AuthComponent,
    TripPageComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    TripImageComponent,
    AddEditFormComponent,
  ],
  imports: [
    MatIconModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    FormsModule,
    AmplifyUIAngularModule,
    AppRoutingModule,
    BrowserModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([TripsEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    CommonModule,
    FlexLayoutModule,
  ],
  providers: [LOGGING_INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
