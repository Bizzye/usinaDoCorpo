import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { NOTIFICATIONS_FIXTURE } from '@testing/fixtures';

import { NotificationItemComponent } from './notification-item.component';

describe('NotificationItemComponent', () => {
  let fixture: ComponentFixture<NotificationItemComponent>;
  let element: HTMLElement;
  const [unread, read] = NOTIFICATIONS_FIXTURE;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationItemComponent);
    element = fixture.nativeElement as HTMLElement;
  });

  it('should render the notification title', async () => {
    fixture.componentRef.setInput('notification', unread);
    await fixture.whenStable();

    expect(element.textContent).toContain(unread!.title);
  });

  it('should not render the divider for the first item', async () => {
    fixture.componentRef.setInput('notification', unread);
    fixture.componentRef.setInput('first', true);
    await fixture.whenStable();

    expect(element.querySelector('.item')?.classList).not.toContain('divider');
  });

  it('should render the divider for the following items', async () => {
    fixture.componentRef.setInput('notification', read);
    await fixture.whenStable();

    expect(element.querySelector('.item')?.classList).toContain('divider');
  });

  it('should highlight unread notifications', async () => {
    fixture.componentRef.setInput('notification', unread);
    await fixture.whenStable();
    expect(element.querySelector('.item')?.classList).toContain('unread');

    fixture.componentRef.setInput('notification', read);
    await fixture.whenStable();
    expect(element.querySelector('.item')?.classList).not.toContain('unread');
  });
});
