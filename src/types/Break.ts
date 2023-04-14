import { ILocation } from '@/types/Location';
import { IUser, IUserConnection } from '@/types/User';

export interface IInvitation {
  __typename: string;
  id: string;
  uuid: string;
  sender: IUser;
  addressees: IUserConnection;
  addresseeCount: number;
  acceptees: IUserConnection;
}

export interface IBreak {
  __typename: string;
  id: string;
  uuid: string;
  startingAt: Date;
  kicker: string;
  location: ILocation;
  invitation: IInvitation;
  participants: IUserConnection;
}
