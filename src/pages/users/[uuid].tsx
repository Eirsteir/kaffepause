import { getServerSession } from 'next-auth';

import Profile from '@/components/profile/Profile';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { User } from '@/types/User';
import URLS from '@/URLS';

interface ProfilePageProps {
  userId: User['uuid'];
  actorIsUser: boolean;
}

export default function ProfilePage({ userId, actorIsUser }: ProfilePageProps) {
  return <Profile actorIsUser={actorIsUser} userId={userId} />;
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: URLS.SIGNIN,
        permanent: false,
      },
    };
  }

  const requested_user_uuid = context.params.uuid;

  return {
    props: {
      userId: context.params.uuid,
      actorIsUser: session.user.uuid === requested_user_uuid,
    },
  };
}
