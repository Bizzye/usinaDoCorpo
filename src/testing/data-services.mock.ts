import type { Provider } from '@angular/core';
import { of } from 'rxjs';

import { ContentService } from '@app/core/services/content.service';
import { NotificationService } from '@app/core/services/notification.service';
import { SessionService } from '@app/core/services/session.service';

import { HOME_SECTIONS_FIXTURE, NOTIFICATIONS_FIXTURE, USER_FIXTURE } from './fixtures';

/** Replaces every HTTP backed service with in-memory fixtures. */
export function provideDataServicesStub(): Provider[] {
  return [
    { provide: ContentService, useValue: { getHomeSections: () => of(HOME_SECTIONS_FIXTURE) } },
    {
      provide: NotificationService,
      useValue: { getNotifications: () => of(NOTIFICATIONS_FIXTURE) },
    },
    { provide: SessionService, useValue: { getCurrentUser: () => of(USER_FIXTURE) } },
  ];
}
