import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { IonButton, IonContent, IonIcon, IonSkeletonText } from '@ionic/angular';
import { addCircleOutline } from 'ionicons/icons';
import { register as registerSwiperElements } from 'swiper/element';

import type { TrainingCard } from '@app/core/models';
import { ContentService } from '@app/core/services/content.service';
import { NavigationService } from '@app/core/services/navigation.service';
import { HeaderComponent } from '@app/layout/header/header.component';
import { CardComponent } from '@app/shared/components/card/card.component';

// Swiper is consumed as Web Components (<swiper-container>). Registering it here keeps
// it inside the lazy-loaded home chunk instead of the initial bundle (idempotent call).
registerSwiperElements();

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  imports: [IonContent, IonIcon, IonButton, IonSkeletonText, HeaderComponent, CardComponent],
  // Required by the Swiper Web Components (<swiper-container> / <swiper-slide>)
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private readonly content = inject(ContentService);
  private readonly navigation = inject(NavigationService);

  protected readonly addIcon = addCircleOutline;
  protected readonly newTrainingImage = 'assets/imgs/home/gym5.webp';
  protected readonly skeletonSections = [1, 2, 3];

  protected readonly sections = rxResource({
    stream: () => this.content.getHomeSections(),
  });

  protected openCard(card: TrainingCard): Promise<void> {
    return this.navigation.open(card.link);
  }

  protected startNewTraining(): Promise<void> {
    return this.navigation.open(null);
  }
}
