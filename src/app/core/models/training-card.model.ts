import type { AppLink } from './app-link.model';

export interface TrainingCard {
  readonly id: string;
  readonly title: string;
  readonly image: string;
  /** Whether the user has an unfinished training for this card. */
  readonly inProgress: boolean;
  /** `null` means the feature is not available yet. */
  readonly link: AppLink | null;
}
