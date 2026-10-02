import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonToolbar,
} from '@ionic/angular';
import { bodyOutline, homeOutline, informationCircleOutline, trophyOutline } from 'ionicons/icons';

import type { AppLink } from '@app/core/models';
import { NavigationService } from '@app/core/services/navigation.service';

export interface MenuItem {
  readonly label: string;
  readonly icon: string;
  readonly link: AppLink | null;
}

export const MENU_ITEMS: readonly MenuItem[] = [
  { label: 'Início', icon: homeOutline, link: { type: 'internal', url: '/home' } },
  { label: 'Meu corpo', icon: bodyOutline, link: null },
  { label: 'Objetivos e conquistas', icon: trophyOutline, link: null },
  {
    label: 'Sobre o projeto',
    icon: informationCircleOutline,
    link: { type: 'internal', url: '/about' },
  },
];

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  imports: [
    IonMenu,
    IonHeader,
    IonToolbar,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonMenuToggle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  protected readonly navigation = inject(NavigationService);
  protected readonly items = MENU_ITEMS;
}
