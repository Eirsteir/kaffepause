import { User as NextAuthUser }  from "next-auth";

export interface IUser extends NextAuthUser{
    id: string;
    uuid: string;
    name: string;
    email: string;
    preferredLocation?: any;
}