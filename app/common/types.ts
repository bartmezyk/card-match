export interface CardInterface {
  pairId: number;
  name: string;
}

export interface GameCardInterface extends CardInterface {
  id: number;
}