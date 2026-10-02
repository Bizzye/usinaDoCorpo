import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonHeader, IonIcon, IonMenuToggle } from '@ionic/angular';
import { menu } from 'ionicons/icons';

import { NavComponent } from './nav/nav.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    IonHeader,
    IonMenuToggle,
    IonIcon,
    NotificationsComponent,
    ProfileComponent,
    NavComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly menuIcon = menu;
}
