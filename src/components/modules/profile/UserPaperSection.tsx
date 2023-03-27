import { useRouter } from 'next/router';

import Avatar from '@/components/elements/Avatar';
import CenteredBox from '@/components/elements/CenteredBox';
import ProfileAction from '@/components/modules/profile/ProfileAction';
import Link from '@/components/navigation/Link';
import { FriendshipStatus, IUser } from '@/types/User';
import { getInitialsFromName } from '@/utils';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import AddFriendActionButton from './profile-action-buttons/AddFriendActionButton';
import FriendActionButton from './profile-action-buttons/FriendActionButton';
import IncomingFriendRequestActionButton from './profile-action-buttons/IncomingFriendRequestActionButton';
import OutgoingFriendRequestActionButton from './profile-action-buttons/OutgoingFriendRequestActionButton';

interface UserPaperSectionProps {
  user: IUser;
  actorIsUser: boolean;
}

export default function UserPaperSection({
  user,
  actorIsUser,
}: UserPaperSectionProps) {
  const areFriends =
    !actorIsUser && user.friendshipStatus === FriendshipStatus.ARE_FRIENDS;
  const canRequest =
    !actorIsUser && user.friendshipStatus === FriendshipStatus.CAN_REQUEST;
  const hasIncomingRequest =
    !actorIsUser && user.friendshipStatus === FriendshipStatus.INCOMING_REQUEST;
  const hasOutGoingRequest =
    !actorIsUser && user.friendshipStatus === FriendshipStatus.OUTGOING_REQUEST;

  return (
    <Paper sx={{ padding: '1.5rem' }} variant='outlined'>
      <CenteredBox>
        <Avatar sx={{ width: 128, height: 128 }} user={user}>
          <Typography variant='h3'>{getInitialsFromName(user.name)}</Typography>
        </Avatar>

        {actorIsUser && (
          <Link href='#'>
            <Typography sx={{ fontWeight: 500 }} variant='body2'>
              Oppdater bilde
            </Typography>
          </Link>
        )}

        {areFriends && <FriendActionButton user={user} />}

        {canRequest && <AddFriendActionButton user={user} />}

        {hasIncomingRequest && (
          <IncomingFriendRequestActionButton user={user} />
        )}

        {hasOutGoingRequest && (
          <OutgoingFriendRequestActionButton user={user} />
        )}
      </CenteredBox>
    </Paper>
  );
}
