import { Injectable, Optional, Inject } from '@angular/core';
import { MicroAppStateService } from './micro-app-state.service';
import { PlatformLocation, APP_BASE_HREF, PathLocationStrategy, LocationStrategy } from '@angular/common';

@Injectable()
export class CustomPathLocationStrategy extends PathLocationStrategy implements LocationStrategy {

  constructor(
    private mircoAppStateService: MicroAppStateService,
    platformLocation: PlatformLocation,
    @Optional() @Inject(APP_BASE_HREF) href?: string) {
      super(platformLocation, href);
      this.updateOutletUrlsOnPopState();
      this.pushStates();
  }

  pushState(state: any, title: string, url: string, queryParams: string): void {
    const externalUrlTree = this.mircoAppStateService.serializeUrl(
      this.mircoAppStateService.getRouteState(
        this.mircoAppStateService.parseUrl(url)
      )
    );

    super.pushState(state, title, externalUrlTree, queryParams);
  }

  updateOutletUrlsOnPopState(): void {
    this.onPopState((popStateEvent: PopStateEvent & { path: (typeof window)[] }) => {
      const pathname = popStateEvent?.path[0]?.location?.pathname;
      if (pathname) {
        this.replaceState(null, null, pathname, '');
      }
    });
  }

  pushStates(): void {
    this.mircoAppStateService.pushState$
      .subscribe(url => this.pushState(null, null, url, null));
  }
}
