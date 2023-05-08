import Link from '@/components/navigation/Link';
import { Group } from '@/types/Group';
import URLS from '@/URLS';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

type AvatarChipsProps = {
  group: Group;
};

export default function GroupAvatarChip({ group }: AvatarChipsProps) {
  return (
    <Tooltip placement='top' title='5 godtatt, 8 ikke svart'>
      <Link href={`${URLS.GROUPS}/${group.uuid}`} noLinkStyle>
        <Chip clickable label={group.name} variant='outlined' />
      </Link>
    </Tooltip>
  );
}
