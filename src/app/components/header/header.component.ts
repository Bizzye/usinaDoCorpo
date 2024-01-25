import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from '../menu/menu.component';

import { addIcons } from 'ionicons';

import { menu } from 'ionicons/icons';
import { NotificationsComponent } from './notifications/notifications.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true, 
  imports: [ IonicModule, MenuComponent, NotificationsComponent, PerfilComponent, NavComponent ]
})
export class HeaderComponent  implements OnInit {

  constructor() {
    addIcons({ menu });
   }

  ngOnInit() {}

}
