export enum Species {
  DOG = 'DOG',
  CAT = 'CAT',
  BIRD = 'BIRD',
  FISH = 'FISH'
}

export interface Pet {
  id?: number;
  name: string;
  species: Species;
  price: number;
  imageUrl?: string;
}

export type AlertSeverity = 'success' | 'info' | 'warning' | 'error';

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertSeverity;
}
