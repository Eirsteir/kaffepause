import { useRouter } from 'next/router';

import ProfileAction from '@/components/modules/profile/profile-action-buttons/ProfileAction';
import { useRemoveFriend } from '@/hooks/Friends';
import { IUser } from '@/types/User';
import URLS from '@/URLS';

import AddFriendActionButton from './AddFriendActionButton';

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

  const [removeFriend, { data, loading, error }] = useRemoveFriend({
    variables: { friend: user.uuid },
  });

  return (
    <>
      {!(data && data.unfriendUser.success) && (
        <ProfileAction
          action={onClick}
          actionText='Inviter til pause'
          error={undefined}
          loading={false}
          success={false}
          successState={<></>}
          title={`Du og ${user.shortName} er venner`}
        />
      )}
      <ProfileAction
        action={removeFriend}
        actionText={`Fjern ${user.shortName} som venn`}
        buttonProps={{ variant: 'outlined', size: 'small' }}
        error={error}
        loading={loading}
        success={data && data.unfriendUser.success}
        successState={<AddFriendActionButton user={user} />}
        title={''}
      />
    </>
  );
}
