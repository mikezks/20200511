import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { map, filter, delay, tap } from 'rxjs/operators';
import { MicroAppStateService } from './micro-app-state.service';
import { getMicroAppPlatformState } from '../utils/get-global-store';

@Injectable({
  providedIn: 'root'
})
export class MicroAppPlatformService {
  pathChange$ = fromEvent(document, 'ngxMicroAppPlatformUrlChange')
    .pipe(
      map((customEvent: CustomEvent) => customEvent.detail),
      map(data => data.args[2])
    );

  get microAppPlatformState() {
    return getMicroAppPlatformState();
  }

  constructor(
    private ngZone: NgZone,
    private router: Router,
    public microAppStateService: MicroAppStateService) {
      this.setGlobalNgZone();
      this.monkeyPatchPushState();
      this.updateGlobalRoute();
      this.microAppStateService.setRouterOutletNames(this.router.config);
      this.initialRouting();
  }

  setGlobalNgZone(): void {
    this.microAppPlatformState.zone =
      this.microAppPlatformState.zone ||
      this.ngZone;
  }

  dispatchRoutingEvent(...args: any[]): void {
    document.dispatchEvent(new CustomEvent(
      'ngxMicroAppPlatformUrlChange', { detail: {
        state: 'pushState',
        args
      }}
    ));
  }

  monkeyPatchPushState(): void {
    if (!this.microAppPlatformState.isPushStatePatched) {
      const pushState = history.pushState;

      history.pushState = (...args) => {
        pushState.apply(history, args);
        this.dispatchRoutingEvent(...args);
      };

      this.microAppPlatformState.isPushStatePatched = true;
    }
  }

  initialRouting(): void {
    const microAppName = this.router.config[0]?.outlet;
    this.microAppStateService.setRouteState(
      this.microAppStateService.parseUrl(
        this.microAppStateService.browserUrl
      )
    );

    if (microAppName) {
      this.router.navigateByUrl(`/(${ microAppName }:)`);
    }
  }

  updateGlobalRoute(): void {
    this.pathChange$
      .pipe(
        delay(0),
        filter(globalUrl =>
          globalUrl !== this.microAppStateService.getExternalUrl(this.router.url)
        )
      )
      .subscribe(globalUrl =>
        this.router.navigateByUrl(
          this.microAppStateService.getExternalUrl(globalUrl),
          { skipLocationChange: true }
        )
      );
  }
}
