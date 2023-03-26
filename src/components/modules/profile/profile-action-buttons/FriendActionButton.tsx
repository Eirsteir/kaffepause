import { useRouter } from 'next/router';

import ProfileAction from '@/components/modules/profile/profile-action-buttons/ProfileAction';
import { IUser } from '@/types/User';
import URLS from '@/URLS';

type Props = {
  user: IUser;
};

export default function FriendActionButton({ user }: Props) {
  const router = useRouter();
  const onClick = () =>
    router.push({
      pathname: URLS.LANDING,
      query: { prefillIniviteesWith: [user.uuid] },
    });

  return (
    <ProfileAction
      action={onClick}
      actionText='Inviter til pause'
      error={undefined}
      loading={false}
      title={`Du og ${user.shortName} er venner`}
    />
  );
}
