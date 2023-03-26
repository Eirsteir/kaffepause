import ProfileAction from '@/components/modules/profile/profile-action-buttons/ProfileAction';
import { useAddFriend } from '@/hooks/Friends';
import { IUser } from '@/types/User';

import OutgoingFriendRequestActionButton from './OutgoingFriendRequestActionButton';

type Props = {
  user: IUser;
};

export default function AddFriendActionButton({ user }: Props) {
  const [addFriend, { data, loading, error }] = useAddFriend({
    variables: { toFriend: user.uuid },
  });

  return (
    <ProfileAction
      action={addFriend}
      actionText={`Legg til ${user.shortName}`}
      error={error}
      loading={loading}
      success={data && data.sendFriendRequest.success}
      successState={<OutgoingFriendRequestActionButton user={user} />}
      title={user.socialContext}
    />
  );
}
