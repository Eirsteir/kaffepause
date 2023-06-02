import { useRouter } from 'next/router';

import GroupDetail from '@/components/groups/detail/GroupDetail';

export default function GroupDetailPage() {
  const router = useRouter();
  const { uuid } = router.query;

  return <GroupDetail uuid={uuid} />;
}

GroupDetailPage.requireAuth = true;
