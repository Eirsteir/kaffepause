import FriendListItem from '@/components/modules/friends/FriendListItem';
import { IUser } from '@/types/User';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

interface FriendsListProps {
  friends: IUser[];
}

export default function FriendsList({ friends }: FriendsListProps) {
  return (
    <List sx={{ width: '100%', maxWidth: 360 }}>
      {friends.map((friend, i) => (
        <>
          <FriendListItem friend={friend} />
          {i !== friends.length - 1 && (
            <Divider component='li' variant='inset' />
          )}
        </>
      ))}
    </List>
  );
}
