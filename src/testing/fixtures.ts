import type { AppNotification, HomeSection, TrainingCard, User } from '@app/core/models';

export const CARD_FIXTURE: TrainingCard = {
  id: 'card-1',
  title: 'Levantamento de Peso',
  image: 'assets/imgs/home/gym5.jpg',
  inProgress: true,
  link: null,
};

export const HOME_SECTIONS_FIXTURE: readonly HomeSection[] = [
  {
    id: 'personal',
    title: 'PERSONAL ONLINE',
    badge: 'plus',
    showNewTraining: true,
    items: [
      CARD_FIXTURE,
      { ...CARD_FIXTURE, id: 'card-2', title: 'Hipertrofia', inProgress: false },
    ],
  },
  {
    id: 'programs',
    title: 'PROGRAMAS',
    badge: 'new',
    items: [
      {
        ...CARD_FIXTURE,
        id: 'card-3',
        title: 'Desafio 30 dias',
        inProgress: false,
        link: { type: 'internal', url: '/about' },
      },
    ],
  },
  {
    id: 'contents',
    title: 'CONTEÚDOS',
    items: [],
  },
];

export const NOTIFICATIONS_FIXTURE: readonly AppNotification[] = [
  { id: 'n-1', title: 'Seu treino de hoje já está disponível!', read: false },
  { id: 'n-2', title: 'Você subiu para o nível Roxo', read: true },
];

export const USER_FIXTURE: User = {
  name: 'Leonardo Santos',
  level: 'Roxo',
  levelColor: '#6a36e8',
  avatarUrl: 'assets/imgs/profile/avatar.png',
};
