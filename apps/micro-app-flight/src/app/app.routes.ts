import {ExtraOptions, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import { FlightDetailComponent } from './flight-detail/flight-detail.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    outlet: 'micro-app-flight',
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'flight',
        children: [
          {
            path: 'detail',
            component: FlightDetailComponent
          }
        ]
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  }
];
