import { FlightCancellingModule } from "./flight-booking/flight-cancelling/flight-cancelling.module";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FlightApiModule } from "@flight-workspace/flight-api";

import { AppComponent } from "./app.component";
import { APP_ROUTES, MICRO_APP_NAVIGATION } from "./app.routes";
import { FlightBookingModule } from "./flight-booking/flight-booking.module";
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SharedModule } from "./shared/shared.module";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { MicroAppPlatformModule } from '@intauria/ngx-micro-app-platform';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './+state';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './+state/effects/app.effects';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FlightBookingModule,

    BrowserAnimationsModule,
    FlightCancellingModule,

    FlightApiModule.forRoot(),
    SharedModule.forRoot(),
    MicroAppPlatformModule.forRoot(APP_ROUTES, MICRO_APP_NAVIGATION),

    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true
      }
    }),
    EffectsModule.forRoot([ AppEffects ]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal
    }),
    /* !environment.production ? */ StoreDevtoolsModule.instrument({
      name: 'ngrx: Shell Application'
    }) /* : [] */
  ],
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {}
