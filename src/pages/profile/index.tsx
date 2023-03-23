import { getSession } from 'next-auth/react';

import Profile from '@/components/layouts/Profile';
import { IUser } from '@/types/User';
import URLS from '@/URLS';

interface ProfilePageProps {
  user: IUser;
}

export default function ProfilePage({ user }: ProfilePageProps) {
  return <Profile user={user} />;
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: { destination: URLS.SIGNIN },
    };
  }
  return {
    props: {
      user: session.user,
    },
  };
}
