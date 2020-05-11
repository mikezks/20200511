import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MicroAppPlatformService } from '../../services/micro-app-platform.service';
import { NGX_MICRO_APP_PLATFORM_NAVIGATION } from '../../tokens/micro-app-navigation';
import { DOCUMENT } from '@angular/common';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'flight-workspace-micro-app-loader',
  templateUrl: './micro-app-loader.component.html',
  styleUrls: ['./micro-app-loader.component.css']
})
export class MicroAppLoaderComponent implements OnInit {
  loadedCustomElements = {};
  gridStyle: 'fillColumns' | 'fillRows' = 'fillRows';
  microApps: {
    ids: string[],
    entries: {[key: string]: HTMLElement }
  } = {
    ids: [],
    entries: {}
  };

  @ViewChild('microAppContainer', { read: ElementRef }) private microAppContainer: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private microAppPlattform: MicroAppPlatformService,
    @Inject(NGX_MICRO_APP_PLATFORM_NAVIGATION) public navigationConfig: any[],
    @Inject(DOCUMENT) private document: any) {
      this.document = this.document as Document;
  }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(route => {
        const microAppKey = route.get('micro-app');
        if (microAppKey) {
          this.loadMicroApp(microAppKey);
        }
      });
  }

  loadMicroApp(microAppKey: string): void {
    this.loadBundles(microAppKey);
    this.addMicroAppTags(microAppKey);
  }

  loadBundles(microAppKey: string): void {
    if (!this.microAppPlattform.microAppStateService.loadedBundles[microAppKey]) {
      this.addScriptTags(`apps/${ microAppKey }/scripts.js`);
      this.addScriptTags(`apps/${ microAppKey }/main.js`);
      this.microAppPlattform.microAppStateService.loadedBundles[microAppKey] = true;
    }
  }

  addMicroAppTags(microAppKey: string): void {
    if (!this.loadedCustomElements[microAppKey]) {
      setTimeout(() => {
        const microApp = this.document.createElement(`ce-${ microAppKey }`);
        this.microAppContainer.nativeElement.appendChild(microApp);
        /**
         * EventListener as native feature or with RxJS
         * microApp.addEventListener('microAppMessage', value => console.log('event listener', value), false);
         **/
        fromEvent(microApp, 'microAppMessage')
          .subscribe((microAppEvent: CustomEvent) =>
            console.log(`rxjs event from ${ microAppKey }: ${ microAppEvent.detail }`)
          );
        this.microApps.entries[microAppKey] = microApp;
        this.microApps.ids.push(microAppKey);
        this.loadedCustomElements[microAppKey] = true;
      }, 0);
    }
  }

  addScriptTags(name: string): void {
    const script = this.document.createElement('script');
    script.src = name;
    this.document.body.appendChild(script);
  }

  setMicroAppState(microAppKey: string): void {
    this.microApps.entries[microAppKey]
      .setAttribute('microAppState', 'shell-data');
  }
}
