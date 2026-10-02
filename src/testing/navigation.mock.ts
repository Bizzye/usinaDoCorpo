import type { Provider } from '@angular/core';

import { NavigationService } from '@app/core/services/navigation.service';

export type NavigationSpy = jasmine.SpyObj<NavigationService>;

export function createNavigationSpy(): NavigationSpy {
  const spy = jasmine.createSpyObj<NavigationService>('NavigationService', ['open']);
  spy.open.and.resolveTo();
  return spy;
}

export function provideNavigationSpy(spy: NavigationSpy): Provider {
  return { provide: NavigationService, useValue: spy };
}
