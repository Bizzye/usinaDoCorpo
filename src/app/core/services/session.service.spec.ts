import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { USER_FIXTURE } from '@testing/fixtures';

import { DEFAULT_LEVEL_COLOR, SessionService } from './session.service';

describe('SessionService', () => {
  let service: SessionService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(SessionService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should load the current user', async () => {
    const result = firstValueFrom(service.getCurrentUser());

    http.expectOne('assets/data/user.json').flush(USER_FIXTURE);

    expect(await result).toEqual(USER_FIXTURE);
  });

  it('should accept short hex colors', async () => {
    const result = firstValueFrom(service.getCurrentUser());

    http.expectOne('assets/data/user.json').flush({ ...USER_FIXTURE, levelColor: '#fff' });

    expect((await result).levelColor).toBe('#fff');
  });

  for (const unsafeColor of [
    'red; background: url(https://evil.test)',
    'javascript:alert(1)',
    '',
  ]) {
    it(`should replace the invalid level color "${unsafeColor}" with the default one`, async () => {
      const result = firstValueFrom(service.getCurrentUser());

      http.expectOne('assets/data/user.json').flush({ ...USER_FIXTURE, levelColor: unsafeColor });

      expect((await result).levelColor).toBe(DEFAULT_LEVEL_COLOR);
    });
  }
});
