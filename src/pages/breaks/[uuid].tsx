import { useRouter } from 'next/router';

import BreakDetail from '@/components/breaks/BreakDetail';

export default function BreakDetailPage() {
  const router = useRouter();
  const { uuid } = router.query;

  return <BreakDetail uuid={uuid}></BreakDetail>;
}

BreakDetailPage.requireAuth = true;
