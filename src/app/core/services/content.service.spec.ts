import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { API_BASE_URL } from '@app/core/tokens/api-base-url.token';
import { HOME_SECTIONS_FIXTURE } from '@testing/fixtures';

import { ContentService } from './content.service';

describe('ContentService', () => {
  let service: ContentService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ContentService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should load the home sections from the default base url', async () => {
    const result = firstValueFrom(service.getHomeSections());

    const request = http.expectOne('assets/data/home.json');
    expect(request.request.method).toBe('GET');
    request.flush(HOME_SECTIONS_FIXTURE);

    expect(await result).toEqual(HOME_SECTIONS_FIXTURE);
  });

  it('should propagate http errors to the caller', async () => {
    const result = firstValueFrom(service.getHomeSections());

    http.expectOne('assets/data/home.json').flush('boom', { status: 500, statusText: 'Error' });

    await expectAsync(result).toBeRejected();
  });
});

describe('ContentService with a custom API_BASE_URL', () => {
  it('should use the provided base url', () => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: 'https://api.example.com' },
      ],
    });
    const http = TestBed.inject(HttpTestingController);

    TestBed.inject(ContentService).getHomeSections().subscribe();

    const request = http.expectOne('https://api.example.com/home.json');
    expect(request.request.method).toBe('GET');
    request.flush([]);
    http.verify();
  });
});
