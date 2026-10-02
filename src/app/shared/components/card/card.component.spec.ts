import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import type { TrainingCard } from '@app/core/models';
import { CARD_FIXTURE } from '@testing/fixtures';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let fixture: ComponentFixture<CardComponent>;
  let element: HTMLElement;

  async function render(card: TrainingCard): Promise<void> {
    fixture.componentRef.setInput('card', card);
    await fixture.whenStable();
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    element = fixture.nativeElement as HTMLElement;
  });

  it('should render the title and image', async () => {
    await render(CARD_FIXTURE);

    expect(element.querySelector('.title')?.textContent).toContain(CARD_FIXTURE.title);
    expect(element.querySelector('img')?.getAttribute('src')).toBe(CARD_FIXTURE.image);
  });

  it('should lazy load the decorative image', async () => {
    await render(CARD_FIXTURE);

    const image = element.querySelector('img');
    expect(image?.getAttribute('loading')).toBe('lazy');
    expect(image?.getAttribute('alt')).toBe('');
  });

  it('should show the "continuar treinando" label only when the training is in progress', async () => {
    await render(CARD_FIXTURE);
    expect(element.querySelector('.in-progress')?.textContent).toContain('continuar treinando');

    await render({ ...CARD_FIXTURE, inProgress: false });
    expect(element.querySelector('.in-progress')).toBeNull();
  });

  it('should emit the card when clicked', async () => {
    await render(CARD_FIXTURE);
    const emitted: TrainingCard[] = [];
    fixture.componentInstance.selected.subscribe((card) => emitted.push(card));

    element.querySelector<HTMLButtonElement>('button')!.click();

    expect(emitted).toEqual([CARD_FIXTURE]);
  });
});
