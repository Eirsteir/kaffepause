import { ILocation } from '@/types/Location';
import { IUser, IUserConnection } from '@/types/User';

export interface IInvitation {
  __typename: string;
  id: string;
  uuid: string;
  sender: IUser;
}

export interface IBreak {
  __typename: string;
  id: string;
  uuid: string;
  startingAt: Date;
  location: ILocation;
  invitation: IInvitation;
  participants: IUserConnection;
}
