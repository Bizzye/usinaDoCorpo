import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import type { TrainingCard } from '@app/core/models';

/**
 * Presentational card: renders a training and emits when it is selected.
 * Navigation is decided by the parent (container) component.
 */
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  readonly card = input.required<TrainingCard>();
  readonly selected = output<TrainingCard>();
}
