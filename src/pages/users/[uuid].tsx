import { useRouter } from 'next/router';

import Profile from '@/components/profile/Profile';

export default function ProfilePage() {
  const router = useRouter();
  const { uuid } = router.query;
  return <Profile userId={uuid} />;
}

ProfilePage.requireAuth = true;
