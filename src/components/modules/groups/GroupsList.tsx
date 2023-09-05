import GroupListItem from '@/components/modules/groups/GroupListItem';
import { Group } from '@/types/Group';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

interface GroupsListProps {
  groups: Group[];
}

export default function GroupsList({ groups }: GroupsListProps) {
  return (
    <List sx={{ width: '100%', maxWidth: 360 }}>
      {groups.map((group, i) => (
        <>
          <GroupListItem group={group} />
          {i !== groups.length - 1 && (
            <Divider component='li' variant='inset' />
          )}
        </>
      ))}
    </List>
  );
}
