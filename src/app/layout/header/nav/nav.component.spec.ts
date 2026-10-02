import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import {
  type NavigationSpy,
  createNavigationSpy,
  provideNavigationSpy,
} from '@testing/navigation.mock';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let fixture: ComponentFixture<NavComponent>;
  let element: HTMLElement;
  let navigation: NavigationSpy;

  beforeEach(async () => {
    navigation = createNavigationSpy();
    TestBed.configureTestingModule({ providers: [provideNavigationSpy(navigation)] });
    fixture = TestBed.createComponent(NavComponent);
    element = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  it('should render the shortcuts inside an accessible nav landmark', () => {
    const nav = element.querySelector('nav');
    expect(nav?.getAttribute('aria-label')).toBe('Atalhos');

    const labels = Array.from(element.querySelectorAll('.label')).map((el) =>
      el.textContent?.trim(),
    );
    expect(labels).toEqual(['MEU CORPO', 'OBJETIVOS E CONQUISTAS']);
  });

  it('should delegate the click to the NavigationService', () => {
    element.querySelectorAll<HTMLButtonElement>('button')[1]!.click();

    expect(navigation.open).toHaveBeenCalledOnceWith(null);
  });
});
