import OutgoingFriendRequestActionButton from '@/components/profile/profile-action-buttons/OutgoingFriendRequestActionButton';
import ProfileAction from '@/components/profile/profile-action-buttons/ProfileAction';
import { useAddFriend } from '@/hooks/Friends';
import { User } from '@/types/User';

type Props = {
  user: User;
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
