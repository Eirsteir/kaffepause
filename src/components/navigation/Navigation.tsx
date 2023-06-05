import { getServerSession, Session } from 'next-auth';

import AuthenticatedNav from '@/components/navigation/AuthenticatedNav';
import BaseNavigation from '@/components/navigation/BaseNavigation';
import UnauthedAccountMenu from '@/components/navigation/UnauthedAccountMenu';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default function Navigation({ session }: { session: Session | null }) {
  if (session && session.user) {
    return <AuthenticatedNav user={session.user} />;
  }

  return (
    <BaseNavigation>
      <UnauthedAccountMenu />
    </BaseNavigation>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      session,
    },
  };
}
