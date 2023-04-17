import Avatar from '@/components/elements/Avatar';
import CenteredBox from '@/components/elements/CenteredBox';
import Link from '@/components/navigation/Link';
import AddFriendActionButton from '@/components/profile/profile-action-buttons/AddFriendActionButton';
import FriendActionButton from '@/components/profile/profile-action-buttons/FriendActionButton';
import IncomingFriendRequestActionButton from '@/components/profile/profile-action-buttons/IncomingFriendRequestActionButton';
import OutgoingFriendRequestActionButton from '@/components/profile/profile-action-buttons/OutgoingFriendRequestActionButton';
import { FriendshipStatus, User } from '@/types/User';
import { getInitialsFromName } from '@/utils';
import { Card } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface UserPaperSectionProps {
  user: User;
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
    <Paper
      elevation={0}
      sx={{ padding: '1.5rem', boxShadow: '0 6px 20px rgba(0,0,0,0.2)' }}>
      <CenteredBox>
        <Avatar
          sx={{ width: 128, height: 128, fontSize: '2rem' }}
          user={user}
        />

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
