import type { TrainingCard } from './training-card.model';

export type HomeSectionBadge = 'plus' | 'new';

export interface HomeSection {
  readonly id: string;
  readonly title: string;
  readonly badge?: HomeSectionBadge;
  /** Renders the "new training" shortcut as the first slide. */
  readonly showNewTraining?: boolean;
  readonly items: readonly TrainingCard[];
}
