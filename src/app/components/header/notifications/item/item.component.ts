import { Component, Input, OnInit } from '@angular/core';
import { INotification } from 'src/app/interfaces/notifications/notifications-item.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  standalone: true
})
export class ItemComponent  implements OnInit {

  @Input({ required: true }) item!: INotification;
  @Input({ required: true }) index!: number;

  constructor() { }

  ngOnInit() {}

}
