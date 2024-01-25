import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ICard } from 'src/app/interfaces/card-item.interface';
import { CardComponent } from 'src/app/components/home/card/card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent, CardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {

  cards: ICard[] = [
    {
      image: 'assets/imgs/gym5.jpg',
      backgroundImage: 'assets/imgs/gym5.jpg',
      title: 'Levantamento de Peso',
      hasTraining: true
    },
    {
      image: 'assets/imgs/gym4.jpg',
      backgroundImage: 'assets/imgs/gym4.jpg',
      title: 'Levantamento de Peso',
      hasTraining: false
    },
    {
      image: 'assets/imgs/gym1.jpg',
      backgroundImage: 'assets/imgs/gym1.jpg',
      title: 'Levantamento de Peso',
      hasTraining: false
    },
    {
      image: 'assets/imgs/gym2.jpg',
      backgroundImage: 'assets/imgs/gym2.jpg',
      title: 'Levantamento de Peso',
      hasTraining: false
    }
  ]

  newTraining: ICard = {
    image: 'assets/imgs/gym5.jpg',
    backgroundImage: 'assets/imgs/gym5.jpg',
    title: '',
    hasTraining: false
  }

  constructor() { }

  ngOnInit() {
  }

}
