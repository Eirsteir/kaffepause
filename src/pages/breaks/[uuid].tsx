import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';

import Break from '@/components/breaks/Break';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import URLS from '@/URLS';

export default function BreakPage() {
  const router = useRouter();
  const { uuid } = router.query;

  return <Break uuid={uuid}></Break>;
}
