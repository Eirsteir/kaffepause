import { User as NextAuthUser } from 'next-auth';

import { ILocation } from '@/types/Location';

export interface IUserEdge {
  __typename: string;
  node: IUser;
}

export interface IUserConnection {
  __typename: string;
  count?: number;
  edges: IUserEdge[];
}

export enum FriendshipStatus {
  CAN_REQUEST = 'CAN_REQUEST',
  ARE_FRIENDS = 'ARE_FRIENDS',
  INCOMING_REQUEST = 'INCOMING_REQUEST',
  OUTGOING_REQUEST = 'OUTGOING_REQUEST',
}

export interface IUser extends NextAuthUser {
  id: string;
  uuid: string;
  name: string;
  shortName: string;
  email: string;
  preferredLocation?: ILocation;
  profilePic: string;
  friends: IUserConnection;
  isViewerFriend: boolean;
  friendshipStatus: FriendshipStatus;
  socialContext: string;
}
