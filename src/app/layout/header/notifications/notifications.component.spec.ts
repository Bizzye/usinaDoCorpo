import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { type Observable, of, throwError } from 'rxjs';

import type { AppNotification } from '@app/core/models';
import { NotificationService } from '@app/core/services/notification.service';
import { NOTIFICATIONS_FIXTURE } from '@testing/fixtures';

import { NotificationsComponent } from './notifications.component';

describe('NotificationsComponent', () => {
  let fixture: ComponentFixture<NotificationsComponent>;
  let element: HTMLElement;

  async function setup(
    notifications$: Observable<readonly AppNotification[]> = of(NOTIFICATIONS_FIXTURE),
  ): Promise<void> {
    TestBed.configureTestingModule({
      providers: [
        { provide: NotificationService, useValue: { getNotifications: () => notifications$ } },
      ],
    });
    fixture = TestBed.createComponent(NotificationsComponent);
    element = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  }

  const bell = (): HTMLButtonElement => element.querySelector<HTMLButtonElement>('.bell')!;
  const panel = (): HTMLElement | null => element.querySelector('#notifications-panel');

  async function clickBell(): Promise<void> {
    bell().click();
    await fixture.whenStable();
  }

  it('should start closed and show the unread indicator', async () => {
    await setup();

    expect(panel()).toBeNull();
    expect(bell().getAttribute('aria-expanded')).toBe('false');
    expect(element.querySelector('[data-testid="unread-dot"]')).not.toBeNull();
  });

  it('should not show the unread indicator when everything was read', async () => {
    await setup(of(NOTIFICATIONS_FIXTURE.map((n) => ({ ...n, read: true }))));

    expect(element.querySelector('[data-testid="unread-dot"]')).toBeNull();
  });

  it('should open the panel with every notification when the bell is clicked', async () => {
    await setup();

    await clickBell();

    expect(panel()).not.toBeNull();
    expect(bell().getAttribute('aria-expanded')).toBe('true');
    expect(element.querySelectorAll('app-notification-item').length).toBe(
      NOTIFICATIONS_FIXTURE.length,
    );
  });

  it('should hide the unread indicator after the panel is opened', async () => {
    await setup();

    await clickBell();

    expect(element.querySelector('[data-testid="unread-dot"]')).toBeNull();
  });

  it('should toggle the panel', async () => {
    await setup();

    await clickBell();
    await clickBell();

    expect(panel()).toBeNull();
  });

  it('should close when clicking outside', async () => {
    await setup();
    await clickBell();

    document.body.click();
    await fixture.whenStable();

    expect(panel()).toBeNull();
  });

  it('should stay open when clicking inside the panel', async () => {
    await setup();
    await clickBell();

    panel()!.click();
    await fixture.whenStable();

    expect(panel()).not.toBeNull();
  });

  it('should close when pressing Escape', async () => {
    await setup();
    await clickBell();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fixture.whenStable();

    expect(panel()).toBeNull();
  });

  it('should render an empty state', async () => {
    await setup(of([]));

    await clickBell();

    expect(panel()?.textContent).toContain('Nenhuma notificação');
  });

  it('should render an error state', async () => {
    await setup(throwError(() => new Error('offline')));

    await clickBell();

    expect(panel()?.textContent).toContain('Não foi possível carregar as notificações');
    expect(element.querySelector('[data-testid="unread-dot"]')).toBeNull();
  });
});
