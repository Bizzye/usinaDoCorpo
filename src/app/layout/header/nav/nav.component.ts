import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonIcon } from '@ionic/angular';
import { body, trophy } from 'ionicons/icons';

import type { AppLink } from '@app/core/models';
import { NavigationService } from '@app/core/services/navigation.service';

export interface NavShortcut {
  readonly label: string;
  readonly icon: string;
  readonly link: AppLink | null;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  imports: [IonIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  protected readonly navigation = inject(NavigationService);

  protected readonly shortcuts: readonly NavShortcut[] = [
    { label: 'MEU CORPO', icon: body, link: null },
    { label: 'OBJETIVOS E CONQUISTAS', icon: trophy, link: null },
  ];
}
