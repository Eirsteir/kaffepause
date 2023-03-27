import { getServerSession } from 'next-auth';

import Profile from '@/components/layouts/Profile';
import { getUser } from '@/hooks/User';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { IUser } from '@/types/User';
import URLS from '@/URLS';

interface ProfilePageProps {
  user: IUser;
  actorIsUser: boolean;
}

export default function ProfilePage({ user, actorIsUser }: ProfilePageProps) {
  return <Profile actorIsUser={actorIsUser} user={user} />;
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  const requested_user_uuid = context.params.uuid;

  if (!session) {
    return {
      redirect: {
        destination:
          URLS.SIGNIN +
          '?callbackUrl=http://localhost:3000/users/' +
          requested_user_uuid,
        permanent: false,
      },
    };
  }

  if (session.user.uuid === requested_user_uuid) {
    return {
      props: {
        user: session.user,
        actorIsUser: true,
      },
    };
  }

  try {
    const {
      data: { user },
    } = await getUser(requested_user_uuid, context.req, {
      fetchPolicy: 'no-cache', // dont know how to update SSR cache from client: https://developers.wpengine.com/blog/apollo-client-cache-rehydration-in-next-js
    });

    return {
      props: {
        user: user,
        actorIsUser: false,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
