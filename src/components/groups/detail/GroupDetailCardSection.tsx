import Card from '@/components/elements/Card';
import Divider from '@/components/elements/Divider';
import AddMembersDialogForm from '@/components/groups/detail/AddMembersDialogForm';
import RenameGroupDialogForm from '@/components/groups/detail/RenameGroupDialogForm';
import { CardContent, Typography } from '@mui/material';

export default function GroupDetailCardSection({ group }: { group: Group }) {
  return (
    <Card sx={{ padding: 2 }}>
      <CardContent>
        <Typography variant='subtitle2'>Medlem siden 1. mai 2023</Typography>
        <Divider />
        <AddMembersDialogForm group={group} />
        <RenameGroupDialogForm group={group} />
      </CardContent>
    </Card>
  );
}
