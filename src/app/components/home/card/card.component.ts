import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ICard } from 'src/app/interfaces/card-item.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [ IonicModule ]
})
export class CardComponent  implements OnInit {

  @Input({required: true}) item!: ICard;

  constructor() { }

  ngOnInit() {}

}
