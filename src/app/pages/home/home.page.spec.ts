import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { NEVER, type Observable, of, throwError } from 'rxjs';

import type { HomeSection } from '@app/core/models';
import { ContentService } from '@app/core/services/content.service';
import { provideDataServicesStub } from '@testing/data-services.mock';
import { HOME_SECTIONS_FIXTURE } from '@testing/fixtures';
import {
  type NavigationSpy,
  createNavigationSpy,
  provideNavigationSpy,
} from '@testing/navigation.mock';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let fixture: ComponentFixture<HomePage>;
  let element: HTMLElement;
  let navigation: NavigationSpy;
  let getHomeSections: jasmine.Spy<() => Observable<readonly HomeSection[]>>;

  async function setup(
    sections$: Observable<readonly HomeSection[]>,
    pending = false,
  ): Promise<void> {
    navigation = createNavigationSpy();
    getHomeSections = jasmine.createSpy('getHomeSections').and.returnValue(sections$);
    TestBed.configureTestingModule({
      providers: [
        ...provideDataServicesStub(),
        provideNavigationSpy(navigation),
        { provide: ContentService, useValue: { getHomeSections } },
      ],
    });
    fixture = TestBed.createComponent(HomePage);
    element = fixture.nativeElement as HTMLElement;
    // A pending resource keeps the fixture unstable, so loading states only need a render pass.
    if (pending) {
      fixture.detectChanges();
    } else {
      await fixture.whenStable();
    }
  }

  const sectionTitles = (): (string | undefined)[] =>
    Array.from(element.querySelectorAll('section h2')).map((el) => el.textContent?.trim());

  describe('when the content is loaded', () => {
    beforeEach(() => setup(of(HOME_SECTIONS_FIXTURE)));

    it('should render the header', () => {
      expect(element.querySelector('app-header')).not.toBeNull();
    });

    it('should render one section per item with its title', () => {
      expect(sectionTitles()).toEqual(['PERSONAL ONLINE', 'PROGRAMAS NOVO', 'CONTEÚDOS']);
    });

    it('should link each section to its heading for screen readers', () => {
      const section = element.querySelector('section')!;
      const headingId = section.getAttribute('aria-labelledby')!;
      expect(element.querySelector(`#${headingId}`)?.textContent).toContain('PERSONAL ONLINE');
    });

    it('should render the badges', () => {
      const [personal, programs, contents] = Array.from(element.querySelectorAll('section'));
      expect(personal!.querySelector('ion-icon.plus')).not.toBeNull();
      expect(programs!.querySelector('.new')?.textContent).toContain('NOVO');
      expect(contents!.querySelector('ion-icon.plus, .new')).toBeNull();
    });

    it('should render the "new training" shortcut only where it is enabled', () => {
      const shortcuts = element.querySelectorAll('section .new-training');
      expect(shortcuts.length).toBe(1);
      expect(element.querySelector('section')!.contains(shortcuts[0]!)).toBeTrue();
    });

    it('should render every card', () => {
      const total = HOME_SECTIONS_FIXTURE.reduce((sum, section) => sum + section.items.length, 0);
      expect(element.querySelectorAll('app-card').length).toBe(total);
    });

    it('should navigate to the card link when a card is selected', () => {
      const programCard = HOME_SECTIONS_FIXTURE[1]!.items[0]!;
      const programs = element.querySelectorAll('section')[1]!;

      programs.querySelector<HTMLButtonElement>('app-card button')!.click();

      expect(navigation.open).toHaveBeenCalledOnceWith(programCard.link);
    });

    it('should show the "coming soon" feedback when starting a new training', () => {
      element.querySelector<HTMLButtonElement>('.new-training')!.click();

      expect(navigation.open).toHaveBeenCalledOnceWith(null);
    });
  });

  it('should render skeletons while loading', async () => {
    await setup(NEVER, true);

    expect(element.querySelectorAll('[aria-busy="true"]').length).toBe(3);
    expect(element.querySelector('section')).toBeNull();
  });

  it('should render an error state that allows retrying', async () => {
    await setup(throwError(() => new Error('offline')));

    const alert = element.querySelector('[role="alert"]');
    expect(alert?.textContent).toContain('Não foi possível carregar os conteúdos.');

    getHomeSections.and.returnValue(of(HOME_SECTIONS_FIXTURE));
    alert!.querySelector<HTMLElement>('ion-button')!.click();
    await fixture.whenStable();

    expect(getHomeSections).toHaveBeenCalledTimes(2);
    expect(sectionTitles().length).toBe(HOME_SECTIONS_FIXTURE.length);
  });
});
