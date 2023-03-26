import ProfileAction from '@/components/modules/profile/profile-action-buttons/ProfileAction';
import { useCancelFriendRequest } from '@/hooks/Friends';
import { IUser } from '@/types/User';

import AddFriendActionButton from './AddFriendActionButton';

type Props = {
  user: IUser;
};

export default function OutgoingFriendRequestActionButton({ user }: Props) {
  const [cancelFriendRequest, { data, loading, error }] =
    useCancelFriendRequest({
      variables: { toFriend: user.uuid },
    });

  return (
    <ProfileAction
      action={cancelFriendRequest}
      actionText='Avbryt'
      error={error}
      loading={loading}
      success={data && data.cancelFriendRequest.success}
      successState={<AddFriendActionButton user={user} />}
      title={`Du har sendt ${user.shortName} en forespørsel`}
    />
  );
}
