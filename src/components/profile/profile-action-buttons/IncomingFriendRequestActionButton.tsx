import FriendActionButton from '@/components/profile/profile-action-buttons/FriendActionButton';
import ProfileAction from '@/components/profile/profile-action-buttons/ProfileAction';
import {
  useAcceptFriendRequest,
  useRejectFriendRequest,
} from '@/hooks/Friends';
import { User } from '@/types/User';

type Props = {
  user: User;
};

// TODO: handle both cases
export default function IncomingFriendRequestActionButton({ user }: Props) {
  const [
    acceptFriendRequest,
    { data: acceptData, loading: acceptLoading, error: acceptError },
  ] = useAcceptFriendRequest({ variables: { requester: user.uuid } });
  const [
    rejectFriendRequest,
    { data: rejectData, loading: rejectLoading, error: rejectError },
  ] = useRejectFriendRequest({});

  return (
    <ProfileAction
      action={acceptFriendRequest}
      actionText={`Godta ${user.shortName} som venn`}
      error={acceptError || rejectError}
      loading={acceptLoading || rejectLoading}
      success={acceptData && acceptData.acceptFriendRequest.success}
      successState={<FriendActionButton user={user} />}
      title={`${user.shortName} har send deg en forespørsel`}
    />
  );
}
