import { NgZone } from '@angular/core';

export interface MicroAppPlatformState {
  zone?: NgZone;
  isPushStatePatched?: boolean;
}
