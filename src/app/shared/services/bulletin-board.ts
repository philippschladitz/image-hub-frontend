import { Pin } from './pin';

export interface BulletinBoard {
  id: string;
  name: string;
  description: string;
  category: string;
  pins: Pin[];
}
