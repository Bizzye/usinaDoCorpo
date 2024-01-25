import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';

import { notifications } from 'ionicons/icons';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone: true,
  imports: [ IonicModule ]
})
export class NotificationsComponent  implements OnInit {

  constructor() {
    addIcons({ notifications });
   }

  ngOnInit() {}

}
