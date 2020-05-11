import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule, LocationStrategy } from '@angular/common';
import { MicroAppPlatformService } from './services/micro-app-platform.service';
import { UrlHandlingStrategy, RouterModule, Routes, ExtraOptions, ROUTES, ROUTER_CONFIGURATION } from '@angular/router';
import { CustomPathLocationStrategy } from './services/custom-path-location-strategy';
import { CustomUrlHandlingStrategy } from './services/custom-url-handling-strategy';
import { MicroAppLoaderComponent } from './container/micro-app-loader/micro-app-loader.component';
import { MicroAppNavigationConfig, NGX_MICRO_APP_PLATFORM_NAVIGATION } from './tokens/micro-app-navigation';

export const NGX_MIRCO_APP_PLATFORM_TEMP_ROUTER_CONFIG = new InjectionToken<ExtraOptions>('NGX_MIRCO_APP_PLATFORM_TEMP_ROUTER_CONFIG');

export function patchedRouterConfigFn(routerConfig: ExtraOptions) {
  const patchedRouterConfig = { ...routerConfig };
  patchedRouterConfig.onSameUrlNavigation = 'reload';
  return patchedRouterConfig
}

export const RouterModuleForRoot = RouterModule.forRoot([]);

@NgModule({
  imports: [
    CommonModule,
    RouterModuleForRoot
  ],
  declarations: [
    MicroAppLoaderComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: CustomPathLocationStrategy },
    { provide: UrlHandlingStrategy, useClass: CustomUrlHandlingStrategy }
  ],
  exports: [
    RouterModule,
    MicroAppLoaderComponent
  ]
})
export class MicroAppPlatformModule {
  static forRoot(
    routes: Routes,
    navigationConfig?: MicroAppNavigationConfig[],
    routerConfig?: ExtraOptions): ModuleWithProviders<MicroAppPlatformModule> {
    return {
      ngModule: MicroAppPlatformModule,
      providers: [
        {
          provide: ROUTES,
          useValue: routes,
          multi: true
        },
        {
          provide: NGX_MIRCO_APP_PLATFORM_TEMP_ROUTER_CONFIG,
          useValue: routerConfig
        },
        {
          provide: ROUTER_CONFIGURATION,
          deps: [NGX_MIRCO_APP_PLATFORM_TEMP_ROUTER_CONFIG],
          useFactory: patchedRouterConfigFn
        },
        {
          provide: NGX_MICRO_APP_PLATFORM_NAVIGATION,
          useValue: navigationConfig ? navigationConfig : {}
        }
      ]
    };
  }

  constructor(private microAppPlatform: MicroAppPlatformService) {}
}
