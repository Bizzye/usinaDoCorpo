import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { IonIcon } from '@ionic/angular';
import { notifications } from 'ionicons/icons';

import { NotificationService } from '@app/core/services/notification.service';

import { NotificationItemComponent } from './notification-item/notification-item.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
  imports: [IonIcon, NotificationItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'close()',
  },
})
export class NotificationsComponent {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly notificationService = inject(NotificationService);

  protected readonly bellIcon = notifications;

  protected readonly notifications = rxResource({
    stream: () => this.notificationService.getNotifications(),
  });

  protected readonly isOpen = signal(false);
  private readonly seen = signal(false);

  protected readonly hasUnread = computed(() => {
    if (this.seen() || !this.notifications.hasValue()) {
      return false;
    }
    return this.notifications.value().some((notification) => !notification.read);
  });

  protected toggle(): void {
    this.isOpen.update((open) => !open);
    this.seen.set(true);
  }

  protected close(): void {
    this.isOpen.set(false);
  }

  protected onDocumentClick(event: Event): void {
    if (this.isOpen() && !this.host.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }
}
