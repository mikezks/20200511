import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {FlightBookingComponent} from './flight-booking.component';
import {FLIGHT_BOOKING_ROUTES} from './flight-booking.routes';
import {FlightCardComponent} from './flight-card/flight-card.component';
import {FlightEditComponent} from './flight-edit/flight-edit.component';
import {FlightSearchComponent} from './flight-search/flight-search.component';
import {PassengerSearchComponent} from './passenger-search/passenger-search.component';
import { FlightDynamicSearchComponent } from './flight-dynamic-search/flight-dynamic-search.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromFlightBooking from './+state';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forChild(),
    RouterModule.forChild(FLIGHT_BOOKING_ROUTES),
    StoreModule.forFeature(fromFlightBooking.flightBookingFeatureKey, fromFlightBooking.reducer),
    EffectsModule.forFeature([fromFlightBooking.FlightBookingEffects])
  ],
  declarations: [
    FlightSearchComponent,
    FlightCardComponent,
    PassengerSearchComponent,
    FlightEditComponent,
    FlightDynamicSearchComponent,
    FlightBookingComponent
  ],
  providers: [],
  exports: [
    FlightSearchComponent
  ]
})
export class FlightBookingModule {
}
