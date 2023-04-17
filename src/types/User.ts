import { User as NextAuthUser } from 'next-auth';

import { ILocation } from '@/types/Location';

export interface UserEdge {
  __typename: string;
  node: User;
}

export interface UserConnection {
  __typename: string;
  count?: number;
  edges: UserEdge[];
}

export enum FriendshipStatus {
  CAN_REQUEST = 'CAN_REQUEST',
  ARE_FRIENDS = 'ARE_FRIENDS',
  INCOMING_REQUEST = 'INCOMING_REQUEST',
  OUTGOING_REQUEST = 'OUTGOING_REQUEST',
}

export interface User extends NextAuthUser {
  id: string;
  uuid: string;
  name: string;
  shortName: string;
  email: string;
  preferredLocation?: ILocation;
  profilePic: string;
  friends: UserConnection;
  isViewerFriend: boolean;
  friendshipStatus: FriendshipStatus;
  socialContext: string;
}
