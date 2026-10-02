import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { logoGithub } from 'ionicons/icons';

export const REPOSITORY_URL = 'https://github.com/Bizzye/usinaDoCorpo';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrl: './about.page.scss',
  imports: [IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
  protected readonly githubIcon = logoGithub;
  protected readonly repositoryUrl = REPOSITORY_URL;

  protected readonly stack: readonly { name: string; description: string }[] = [
    { name: 'Angular 22', description: 'Standalone components, signals e zoneless' },
    { name: 'Ionic 9', description: 'Componentes mobile e navegação' },
    { name: 'Capacitor 8', description: 'Build nativo Android' },
    { name: 'Swiper 14', description: 'Carrosséis com Web Components' },
    { name: 'Karma + Jasmine', description: 'Testes unitários com cobertura' },
  ];
}
