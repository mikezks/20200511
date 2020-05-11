import { MicroAppPlatformState } from '../models/micro-app-platform-state';

export const getMicroAppPlatformState = () => {
  const typedWindow = window as Partial<{ ngxMicroAppPlatform: MicroAppPlatformState }>;
  const microAppPlatformState =
    typedWindow.ngxMicroAppPlatform ||
    (typedWindow.ngxMicroAppPlatform = {});
  return microAppPlatformState;
}

export const getNgZone = () => getMicroAppPlatformState()?.zone || 'zone.js';
