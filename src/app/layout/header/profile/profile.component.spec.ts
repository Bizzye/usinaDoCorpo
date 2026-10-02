import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { NEVER, type Observable, of, throwError } from 'rxjs';

import type { User } from '@app/core/models';
import { SessionService } from '@app/core/services/session.service';
import { USER_FIXTURE } from '@testing/fixtures';
import {
  type NavigationSpy,
  createNavigationSpy,
  provideNavigationSpy,
} from '@testing/navigation.mock';

import { DEFAULT_AVATAR, ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let fixture: ComponentFixture<ProfileComponent>;
  let element: HTMLElement;
  let navigation: NavigationSpy;

  async function setup(user$: Observable<User>, pending = false): Promise<void> {
    navigation = createNavigationSpy();
    TestBed.configureTestingModule({
      providers: [
        provideNavigationSpy(navigation),
        { provide: SessionService, useValue: { getCurrentUser: () => user$ } },
      ],
    });
    fixture = TestBed.createComponent(ProfileComponent);
    element = fixture.nativeElement as HTMLElement;
    // A pending resource keeps the fixture unstable, so loading states only need a render pass.
    if (pending) {
      fixture.detectChanges();
    } else {
      await fixture.whenStable();
    }
  }

  it('should render the user name, level and level color', async () => {
    await setup(of(USER_FIXTURE));

    expect(element.querySelector('.name')?.textContent).toContain(USER_FIXTURE.name);
    const level = element.querySelector<HTMLElement>('.level')!;
    expect(level.textContent).toContain(`Nível ${USER_FIXTURE.level}`);
    expect(level.style.color).toBe('rgb(106, 54, 232)');
  });

  it('should render an accessible avatar', async () => {
    await setup(of(USER_FIXTURE));

    const avatar = element.querySelector('img')!;
    expect(avatar.getAttribute('src')).toBe(USER_FIXTURE.avatarUrl!);
    expect(avatar.getAttribute('alt')).toBe(`Foto de perfil de ${USER_FIXTURE.name}`);
  });

  it('should fallback to the default avatar', async () => {
    await setup(of({ ...USER_FIXTURE, avatarUrl: '' }));

    expect(element.querySelector('img')?.getAttribute('src')).toBe(DEFAULT_AVATAR);
  });

  it('should show a "coming soon" feedback when the profile is clicked', async () => {
    await setup(of(USER_FIXTURE));

    element.querySelector<HTMLButtonElement>('button')!.click();

    expect(navigation.open).toHaveBeenCalledWith(null);
  });

  it('should render a skeleton while loading', async () => {
    await setup(NEVER, true);

    expect(element.querySelector('[aria-busy="true"]')).not.toBeNull();
    expect(element.querySelectorAll('ion-skeleton-text').length).toBe(3);
  });

  it('should render an error message when the user cannot be loaded', async () => {
    await setup(throwError(() => new Error('offline')));

    expect(element.textContent).toContain('Não foi possível carregar o perfil');
  });
});
