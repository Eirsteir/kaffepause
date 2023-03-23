import { User as NextAuthUser } from 'next-auth';

import { ILocation } from '@/types/Location';

export interface IUser extends NextAuthUser {
  id: string;
  uuid: string;
  name: string;
  email: string;
  preferredLocation?: ILocation;
  profilePic: string;
}
