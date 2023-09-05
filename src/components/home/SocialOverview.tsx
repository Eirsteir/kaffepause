import { useMemo } from 'react';

import Card from '@/components/elements/Card';
import FriendsList from '@/components/modules/friends/FriendsList';
import GroupsList from '@/components/modules/groups/GroupsList';
import { QueryResult } from '@/components/QueryResult';
import { useMyGroups } from '@/hooks/Groups';
import { useFriends } from '@/hooks/User';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const FriendsOverview = () => {
  const { data, loading, error } = useFriends({
    variables: { first: 10 },
  });

  const friends = useMemo(
    () => data?.friends.edges.map((edge) => edge.node),
    [data],
  );

  return (
    <QueryResult data={data?.friends} error={error} loading={loading}>
      <div>
        <Typography sx={{ paddingBottom: '1.5rem' }} variant='button'>
          Venner
        </Typography>
        <FriendsList friends={friends} />
      </div>
    </QueryResult>
  );
};

const FavoritesOverview = () => {
  const { data, loading, error } = useFriends({
    variables: { first: 10 },
  });

  const friends = useMemo(
    () => data?.friends.edges.map((edge) => edge.node),
    [data],
  );

  return (
    <QueryResult data={data?.friends} error={error} loading={loading}>
      <div>
        <Typography sx={{ paddingBottom: '1.5rem' }} variant='button'>
          Favoritter
        </Typography>
        <FriendsList friends={friends} />
      </div>
    </QueryResult>
  );
};

const GroupsOverview = () => {
  const { data, loading, error } = useMyGroups();

  return (
    <QueryResult data={data?.myGroups} error={error} loading={loading}>
      <div>
        <Typography sx={{ paddingBottom: '1.5rem' }} variant='button'>
          Grupper
        </Typography>
        <GroupsList groups={data?.myGroups} />
      </div>
    </QueryResult>
  );
};

export default function SocialOverview() {
  return (
    <Card sx={{ padding: '1rem' }}>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder='Søk etter venner og grupper'
        sx={{ width: '100%', marginBottom: '1rem' }}
        variant='outlined'
      />
      <FavoritesOverview />
      <Divider sx={{ marginBottom: '.5rem' }} />
      <GroupsOverview />
      <Divider sx={{ marginBottom: '.5rem' }} />
      <FriendsOverview />
    </Card>
  );
}
