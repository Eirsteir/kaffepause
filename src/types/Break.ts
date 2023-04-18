import { Location } from '@/types/Location';
import { User, UserConnection } from '@/types/User';

export enum InvitationContext {
  CAN_REPLY = 'CAN_REPLY',
  CANNOT_REPLY = 'CANNOT_REPLY',
  HAS_ACCEPTED = 'HAS_ACCEPTED',
  HAS_DECLINED = 'HAS_DECLINED',
  HAS_IGNORED = 'HAS_IGNORED',
}

export interface InvitationAddresse {
  user: User;
  status: string;
  statusTitle: string;
}

export interface InvitationAddresseeEdge {
  __typename: string;
  node: InvitationAddresse;
}

export interface InvitationAddresseeConnection {
  __typename: string;
  count?: number;
  edges: InvitationAddresseeEdge[];
}

export interface Invitation {
  __typename: string;
  id: string;
  uuid: string;
  sender: User;
  context: InvitationContext;
  addressees: InvitationAddresseeConnection;
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
  location: Location;
  invitation: Invitation;
  participants: UserConnection;
}
