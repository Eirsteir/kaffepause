import { ILocation } from '@/types/Location';
import { UserConnection, User } from '@/types/User';

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
  sender: User;
  context: InvitationContext;
  addressees: UserConnection;
  addresseeCount: number;
  acceptees: UserConnection;
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
  participants: UserConnection;
}
