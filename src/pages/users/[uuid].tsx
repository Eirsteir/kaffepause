import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';

import Profile from '@/components/layouts/Profile';
import { getUser } from '@/hooks/User';
import { IUser } from '@/types/User';
import URLS from '@/URLS';

interface ProfilePageProps {
  user: IUser;
  actorIsUser: boolean;
}

export default function ProfilePage({ user, actorIsUser }: ProfilePageProps) {
  return <Profile actorIsUser={actorIsUser} user={user} />;
}
import { authOptions } from '@/pages/api/auth/[...nextauth]';

// TODO: must be a better way to do this
export async function getServerSideProps(context) {
  // const session = await getSession({ req });
  // const session = await getServerSession(req, res, authOptions);
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
  console.log();
  console.log(session.user.uuid === requested_user_uuid);
  console.log('SESSION: ', session.user.uuid);
  console.log('REQUESTED: ', requested_user_uuid);
  console.log();

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
    } = await getUser(requested_user_uuid, context.req);

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
