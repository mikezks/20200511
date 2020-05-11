import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MicroAppPlatformModule } from '@intauria/ngx-micro-app-platform';
import { APP_ROUTES } from './app.routes';
import { PassengerDetailComponent } from './passenger-detail/passenger-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    PassengerDetailComponent
  ],
  imports: [
    BrowserModule,
    MicroAppPlatformModule.forRoot(APP_ROUTES),
    ReactiveFormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    customElements.define(
      'ce-micro-app-passenger',
      createCustomElement(AppComponent, {
        injector: this.injector
      })
    );
  }
}
