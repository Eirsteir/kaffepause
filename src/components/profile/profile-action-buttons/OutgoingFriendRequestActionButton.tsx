import AddFriendActionButton from '@/components/profile/profile-action-buttons/AddFriendActionButton';
import ProfileAction from '@/components/profile/profile-action-buttons/ProfileAction';
import { useCancelFriendRequest } from '@/hooks/Friends';
import { User } from '@/types/User';

type Props = {
  user: User;
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
