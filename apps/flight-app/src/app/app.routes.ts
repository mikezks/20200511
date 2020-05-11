import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import { MicroAppLoaderComponent, MicroAppNavigationConfig } from '@intauria/ngx-micro-app-platform';

export const APP_ROUTES: Routes = [
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
    path: 'loader',
    children: [
      {
        path: '',
        redirectTo: 'micro-app-flight',
        pathMatch: 'full'
      },
      {
        path: ':micro-app',
        component: MicroAppLoaderComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

export const MICRO_APP_NAVIGATION: MicroAppNavigationConfig[] = [
  {
    label: 'Micro App: Flight',
    routerLink: '/loader/micro-app-flight'
  },
  {
    label: 'Micro App: Passenger',
    routerLink: '/loader/micro-app-passenger'
  }
];
