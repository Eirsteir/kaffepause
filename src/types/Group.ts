import { User } from '@/types/User';

export interface Group {
  id: string;
  uuid: string;
  name: string;
  created: Date;
  creator: {
    id: User['id'];
    uuid: User['uuid'];
    name: User['name'];
    shortName: User['shortName'];
  };
  members: {
    id: User['id'];
    uuid: User['uuid'];
    name: User['name'];
    shortName: User['shortName'];
  }[];
}
