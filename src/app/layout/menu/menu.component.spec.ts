import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import {
  type NavigationSpy,
  createNavigationSpy,
  provideNavigationSpy,
} from '@testing/navigation.mock';

import { MENU_ITEMS, MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let fixture: ComponentFixture<MenuComponent>;
  let element: HTMLElement;
  let navigation: NavigationSpy;
  let menuContent: HTMLElement;

  beforeEach(async () => {
    // ion-menu requires the element referenced by `contentId` to exist in the document
    menuContent = document.createElement('div');
    menuContent.id = 'main-content';
    document.body.appendChild(menuContent);

    navigation = createNavigationSpy();
    TestBed.configureTestingModule({ providers: [provideNavigationSpy(navigation)] });
    fixture = TestBed.createComponent(MenuComponent);
    element = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  afterEach(() => menuContent.remove());

  it('should be bound to the main content', () => {
    expect(element.querySelector('ion-menu')?.getAttribute('contentId')).toBe('main-content');
  });

  it('should render every menu item', () => {
    const labels = Array.from(element.querySelectorAll('ion-label')).map((el) =>
      el.textContent?.trim(),
    );
    expect(labels).toEqual(MENU_ITEMS.map((item) => item.label));
  });

  it('should navigate to the item link when clicked', () => {
    const items = element.querySelectorAll<HTMLElement>('ion-item');
    const aboutIndex = MENU_ITEMS.findIndex((item) => item.label === 'Sobre o projeto');

    items[aboutIndex]!.click();

    expect(navigation.open).toHaveBeenCalledOnceWith({ type: 'internal', url: '/about' });
  });
});
