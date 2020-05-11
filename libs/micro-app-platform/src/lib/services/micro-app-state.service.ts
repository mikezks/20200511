import { Injectable } from '@angular/core';
import { UrlSegmentGroup, Routes, DefaultUrlSerializer, UrlTree, ExtraOptions } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MicroAppStateService {
  routerOutletNames: string[];
  outletUrlSegmentGroups = {};
  loadedBundles = {};
  routerConfig: ExtraOptions;

  private defaultUrlSerializer = new DefaultUrlSerializer();
  pushState$ = new Subject<string>();

  get browserUrl(): string {
    return [''].concat(location.href.split('/').slice(3)).join('/');
  }

  setRouterOutletNames(config: Routes): void {
    const routes = {};
    config
      .filter(route => route.component || route.children || route.loadChildren)
      .forEach(route => route.outlet ? routes[route.outlet] = true : routes['primary'] = true);
    this.routerOutletNames = Object.keys(routes).map(key => key);
  }

  setOutUrlSegmentGroup(outletUrlSegmentGroup: { [id: string]: UrlSegmentGroup }) {
    this.outletUrlSegmentGroups = { ...this.outletUrlSegmentGroups, ...outletUrlSegmentGroup };
  }

  serializeUrl(tree: UrlTree): string {
    return this.defaultUrlSerializer.serialize(tree);
  }

  parseUrl(url: string): UrlTree {
    return this.defaultUrlSerializer.parse(url);
  }

  getRouteState(tree: UrlTree): UrlTree {
    Object.keys(this.outletUrlSegmentGroups)
      .filter(outletUrlSegmentGroupKey => !tree.root.children[outletUrlSegmentGroupKey])
      .forEach(outletUrlSegmentGroupKey => {
        tree.root.children[outletUrlSegmentGroupKey] = this.outletUrlSegmentGroups[outletUrlSegmentGroupKey]
        tree.root.children[outletUrlSegmentGroupKey].parent = tree.root;
      });

    return tree;
  }

  getExternalUrl(internalUrl: string): string {
    return this.serializeUrl(
      this.getRouteState(
        this.parseUrl(internalUrl)
      )
    );
  }

  setRouteState(tree: UrlTree): UrlTree {
    const outlets = tree.root.children;

    Object.keys(outlets)
      .filter(outletKey =>
        !this.routerOutletNames.some(outletName => outletName === outletKey)
      )
      .forEach(outletKey => {
        outlets[outletKey].parent = null;
        this.setOutUrlSegmentGroup({ [outletKey]: outlets[outletKey] });
        delete tree.root.children[outletKey];
      });

    return tree;
  }
}
