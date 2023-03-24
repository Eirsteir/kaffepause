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
  console.log(user);
  return <Profile actorIsUser={actorIsUser} user={user} />;
}

// TODO: must be a better way to do this
export async function getServerSideProps({ req, params: { uuid } }) {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: { destination: URLS.SIGNIN },
    };
  }

  if (session.user.uuid === uuid) {
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
    } = await getUser(uuid, req);

    return {
      props: {
        user: user,
        actorIsUser: uuid === session.user,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
