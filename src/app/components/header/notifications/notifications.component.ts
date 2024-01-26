import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('notification_content') notifications_content!: ElementRef<HTMLDivElement>;

  constructor() {
    addIcons({ notifications });
   }

  ngOnInit() {}

  toggleNotification() { 
    this.notifications_content.nativeElement.classList.toggle('hidden');
  }

}
