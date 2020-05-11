import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PassengerDetailComponent } from './passenger-detail/passenger-detail.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    outlet: 'micro-app-passenger',
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
        path: 'passenger',
        children: [
          {
            path: 'detail',
            component: PassengerDetailComponent
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
