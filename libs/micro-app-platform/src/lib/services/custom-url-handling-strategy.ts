import { Injectable } from '@angular/core';
import { UrlHandlingStrategy, UrlTree, UrlSerializer } from '@angular/router';
import { MicroAppStateService } from './micro-app-state.service';

@Injectable()
export class CustomUrlHandlingStrategy implements UrlHandlingStrategy {

  constructor(private microAppStateService: MicroAppStateService) { }

  shouldProcessUrl(url: UrlTree): boolean {
    return true;
  }

  extract(tree: UrlTree): UrlTree {
    return this.convertRouteStateInternalExternal(tree);
  }

  merge(newUrlPart: UrlTree, rawUrl: UrlTree): UrlTree {
    return newUrlPart;
  }

  convertRouteStateInternalExternal(tree: UrlTree): UrlTree {
    const externalUrl = this.microAppStateService.serializeUrl(tree);
    const internalUrlTree = this.microAppStateService.setRouteState(tree);
    const internalUrl = this.microAppStateService.serializeUrl(internalUrlTree);

    if (internalUrl === this.microAppStateService.browserUrl &&
        internalUrl !== externalUrl) {
      this.microAppStateService.pushState$.next(externalUrl);
    }

    return internalUrlTree;
  }
}
