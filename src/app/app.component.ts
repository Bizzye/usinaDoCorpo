import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular';

import { MenuComponent } from './layout/menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [IonApp, IonRouterOutlet, MenuComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
