import { InjectionToken } from '@angular/core';

/**
 * Base URL used by the data services.
 *
 * The app ships with static JSON mocks under `assets/data`, so swapping to a real
 * backend only requires providing a different value for this token.
 */
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  providedIn: 'root',
  factory: () => 'assets/data',
});
