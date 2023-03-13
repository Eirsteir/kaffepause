import { IUser } from "@/types/User";
import { useSession } from "next-auth/react"

type Authentication = {
    session: any;
    status: string;
    user?: IUser;
    isAuthenticated: boolean;
}

export const useIsAuthenticated = (): Authentication => {
    const { data: session, status } = useSession()
    const isAuthenticated = status === "authenticated";
    const user = session?.user as IUser;

    return { session, status, user, isAuthenticated };
}