import { InjectionToken } from '@angular/core';

export interface MicroAppNavigationConfig {
  label: string;
  routerLink: any | string;
}

export const NGX_MICRO_APP_PLATFORM_NAVIGATION = new InjectionToken<MicroAppNavigationConfig[]>('NGX_MICRO_APP_PLATFORM_NAVIGATION');
