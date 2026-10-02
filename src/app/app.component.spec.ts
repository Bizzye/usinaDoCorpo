import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular';

import { createNavigationSpy, provideNavigationSpy } from '@testing/navigation.mock';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideIonicAngular(),
        provideNavigationSpy(createNavigationSpy()),
      ],
    });
  });

  it('should render the side menu and the router outlet used as menu content', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('ion-app app-menu')).not.toBeNull();
    expect(element.querySelector('ion-router-outlet')?.id).toBe('main-content');
  });
});
