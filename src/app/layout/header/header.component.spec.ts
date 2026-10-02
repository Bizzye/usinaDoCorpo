import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { provideDataServicesStub } from '@testing/data-services.mock';
import { createNavigationSpy, provideNavigationSpy } from '@testing/navigation.mock';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [...provideDataServicesStub(), provideNavigationSpy(createNavigationSpy())],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    element = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  it('should render the brand logo', () => {
    const logo = element.querySelector<HTMLImageElement>('img.logo');
    expect(logo?.getAttribute('alt')).toBe('Usina do Corpo');
  });

  it('should render an accessible menu button', () => {
    const button = element.querySelector('.menu-button');
    expect(button?.getAttribute('aria-label')).toBe('Abrir menu');
    expect(button?.getAttribute('type')).toBe('button');
  });

  it('should compose notifications, profile and nav', () => {
    expect(element.querySelector('app-notifications')).not.toBeNull();
    expect(element.querySelector('app-profile')).not.toBeNull();
    expect(element.querySelector('app-nav')).not.toBeNull();
  });
});
