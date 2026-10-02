import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular';

import { AboutPage, REPOSITORY_URL } from './about.page';

describe('AboutPage', () => {
  let fixture: ComponentFixture<AboutPage>;
  let element: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideIonicAngular()],
    });
    fixture = TestBed.createComponent(AboutPage);
    element = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  it('should render the page title', () => {
    expect(element.querySelector('ion-title')?.textContent).toContain('Sobre o projeto');
  });

  it('should list the technology stack', () => {
    const items = Array.from(element.querySelectorAll('.stack strong')).map((el) => el.textContent);
    expect(items).toContain('Angular 22');
    expect(items).toContain('Ionic 9');
    expect(items).toContain('Capacitor 8');
  });

  it('should link to the repository safely', () => {
    const link = element.querySelector<HTMLAnchorElement>('a.repository')!;
    expect(link.getAttribute('href')).toBe(REPOSITORY_URL);
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('should fallback the back button to home', () => {
    expect(element.querySelector('ion-back-button')?.getAttribute('defaultHref')).toBe('/home');
  });
});
