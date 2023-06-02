import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';

import Home from '@/components/home/Home';
import Landing from '@/components/landing/Landing';
import { useHasMounted } from '@/hooks/utils';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default function LandingPage({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return isAuthenticated ? <Home /> : <Landing />;
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      isAuthenticated: session !== null,
    },
  };
}
