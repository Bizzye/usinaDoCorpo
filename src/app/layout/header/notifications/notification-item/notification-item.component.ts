import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { AppNotification } from '@app/core/models';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrl: './notification-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationItemComponent {
  readonly notification = input.required<AppNotification>();
  /** The first item of the list is rendered without the top divider. */
  readonly first = input(false);
}
