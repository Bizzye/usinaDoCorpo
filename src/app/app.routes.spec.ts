import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideIonicAngular } from '@ionic/angular';

import { provideDataServicesStub } from '@testing/data-services.mock';
import { createNavigationSpy, provideNavigationSpy } from '@testing/navigation.mock';

import { routes } from './app.routes';
import { AboutPage } from './pages/about/about.page';
import { HomePage } from './pages/home/home.page';

describe('app routes', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        provideIonicAngular(),
        ...provideDataServicesStub(),
        provideNavigationSpy(createNavigationSpy()),
      ],
    });
    harness = await RouterTestingHarness.create();
  });

  it('should redirect the empty path to /home', async () => {
    const page = await harness.navigateByUrl('/', HomePage);

    expect(page).toBeInstanceOf(HomePage);
    expect(TestBed.inject(Router).url).toBe('/home');
  });

  it('should lazy load the about page', async () => {
    const page = await harness.navigateByUrl('/about', AboutPage);

    expect(page).toBeInstanceOf(AboutPage);
  });

  it('should redirect unknown urls to /home', async () => {
    await harness.navigateByUrl('/this-page-does-not-exist');

    expect(TestBed.inject(Router).url).toBe('/home');
  });

  it('should define page titles', () => {
    const titled = routes.filter((route) => route.loadComponent);
    expect(titled.every((route) => typeof route.title === 'string')).toBeTrue();
  });
});
