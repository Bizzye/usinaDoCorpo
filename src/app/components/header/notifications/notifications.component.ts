import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';

import { notifications } from 'ionicons/icons';
import { INotification } from 'src/app/interfaces/notifications/notifications-item.interface';
import { ItemComponent } from './item/item.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone: true,
  imports: [ IonicModule, ItemComponent ]
})
export class NotificationsComponent  implements OnInit {

  notifications: INotification[] = [
    {
      title: 'Olá mundo!'
    },
    {
      title: 'Hello World!'
    },
  ]

  constructor() {
    addIcons({ notifications });
   }

  ngOnInit() {}

  toggleNotification() {
    const wrapper = document.getElementById('notification_content');
    
    wrapper?.classList.toggle('hidden');
  }

}
