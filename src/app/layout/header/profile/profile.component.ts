import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { IonSkeletonText } from '@ionic/angular';

import { NavigationService } from '@app/core/services/navigation.service';
import { SessionService } from '@app/core/services/session.service';

export const DEFAULT_AVATAR = 'assets/imgs/profile/avatar.webp';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [IonSkeletonText],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private readonly session = inject(SessionService);
  protected readonly navigation = inject(NavigationService);

  protected readonly defaultAvatar = DEFAULT_AVATAR;

  protected readonly user = rxResource({
    stream: () => this.session.getCurrentUser(),
  });
}
