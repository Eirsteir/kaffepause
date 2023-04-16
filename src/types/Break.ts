import { ILocation } from '@/types/Location';
import { IUser, IUserConnection } from '@/types/User';

export enum InvitationContext {
  CAN_REPLY = 'CAN_REPLY',
  CANNOT_REPLY = 'CANNOT_REPLY',
  HAS_ACCEPTED = 'HAS_ACCEPTED',
  HAS_DECLINED = 'HAS_DECLINED',
  HAS_IGNORED = 'HAS_IGNORED',
}

export interface IInvitation {
  __typename: string;
  id: string;
  uuid: string;
  sender: IUser;
  context: InvitationContext;
  addressees: IUserConnection;
  addresseeCount: number;
  acceptees: IUserConnection;
  subject?: IBreak;
}

export interface IBreak {
  __typename: string;
  id: string;
  uuid: string;
  title: string;
  startingAt: Date;
  kicker: string;
  hasPassed: boolean;
  isViewerInitiator: boolean;
  canViewerEditBreak: boolean;
  location: ILocation;
  invitation: IInvitation;
  participants: IUserConnection;
}
