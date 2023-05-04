import Avatar from '@/components/elements/Avatar';
import Link from '@/components/navigation/Link';
import { Group } from '@/types/Group';
import URLS from '@/URLS';
import { Chip, Stack } from '@mui/material';

export default function GroupMembersList({
  members,
}: {
  members: Group['members'];
}) {
  return (
    <Stack direction='row' spacing={1}>
      {members.map((user, i) => (
        <Link href={`${URLS.USERS}/${user.uuid}`} key={i} noLinkStyle>
          <Chip
            avatar={<Avatar user={user} />}
            clickable
            label={user.name}
            variant='outlined'
          />
        </Link>
      ))}
    </Stack>
  );
}
