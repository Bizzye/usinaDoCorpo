import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { NOTIFICATIONS_FIXTURE } from '@testing/fixtures';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(NotificationService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should load the notifications', async () => {
    const result = firstValueFrom(service.getNotifications());

    const request = http.expectOne('assets/data/notifications.json');
    expect(request.request.method).toBe('GET');
    request.flush(NOTIFICATIONS_FIXTURE);

    expect(await result).toEqual(NOTIFICATIONS_FIXTURE);
  });
});
