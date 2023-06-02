import { useSession } from 'next-auth/react';

import Home from '@/components/home/Home';

export default function HomePage() {
  const session = useSession();
  console.log(session);
  return <Home />;
}
