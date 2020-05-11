import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MicroAppPlatformModule } from '@intauria/ngx-micro-app-platform';
import { APP_ROUTES } from './app.routes';
import { FlightDetailComponent } from './flight-detail/flight-detail.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './+state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import * as fromFlightBooking from './+state';
import { FlightApiModule } from '@flight-workspace/flight-api';
import { HttpClientModule } from '@angular/common/http';
import { FlightCardComponent } from './flight-card/flight-card.component';


@NgModule({
  declarations: [
    AppComponent,
    FlightDetailComponent,
    FlightCardComponent
  ],
  imports: [
    BrowserModule,
    MicroAppPlatformModule.forRoot(APP_ROUTES),
    HttpClientModule,
    ReactiveFormsModule,
    FlightApiModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true
      }
    }),
    /* !environment.production ? */ StoreDevtoolsModule.instrument({
      name: 'ngrx: Micro-App-Flight'
    }) /* : [] */,
    EffectsModule.forRoot([fromFlightBooking.FlightBookingEffects])
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    customElements.define(
      'ce-micro-app-flight',
      createCustomElement(AppComponent, {
        injector: this.injector
      })
    );
  }
}
