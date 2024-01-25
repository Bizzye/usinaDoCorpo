import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CardComponent } from 'src/app/components/home/card/card.component';
import { ICard } from 'src/app/interfaces/card/card-item.interface';
import { UtilsService } from 'src/app/services/utils/utils.service';

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
      backgroundImage: 'assets/imgs/home/gym5.jpg',
      title: 'Levantamento de Peso',
      hasTraining: true,
      link: '#',
      linkType: "Internal"
    },
    {
      image: 'assets/imgs/gym4.jpg',
      backgroundImage: 'assets/imgs/home/gym4.jpg',
      title: 'Levantamento de Peso',
      hasTraining: false,
      link: '#',
      linkType: "Internal"
    },
    {
      image: 'assets/imgs/gym1.jpg',
      backgroundImage: 'assets/imgs/home/gym1.jpg',
      title: 'Levantamento de Peso',
      hasTraining: false,
      link: '#',
      linkType: "Internal"
    },
    {
      image: 'assets/imgs/gym2.jpg',
      backgroundImage: 'assets/imgs/home/gym2.jpg',
      title: 'Levantamento de Peso',
      hasTraining: false,
      link: '#',
      linkType: "Internal"
    }
  ]

  newTraining: ICard = {
    image: 'assets/imgs/gym5.jpg',
    backgroundImage: 'assets/imgs/home/gym5.jpg',
    title: '',
    hasTraining: false,
    link: '#',
    linkType: "Internal"
  }

  constructor(
    public _utils: UtilsService
  ) { }

  ngOnInit() {
  }

}
