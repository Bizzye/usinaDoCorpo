export interface ICard {
    image: string;
    backgroundImage: string;
    title: string;
    hasTraining: boolean;
    link: string;
    linkType: 'Internal' | 'External';
}