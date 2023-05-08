import { useRouter } from 'next/router';
import { useState } from 'react';

import LoadingButton from '@/components/elements/LoadingButton';
import AddGroupMembersForm from '@/components/groups/AddGroupMembersForm';
import { useCreateGroup } from '@/hooks/Groups';
import { User } from '@/types/User';
import URLS from '@/URLS';
import { Button, TextField, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/system';

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  maxWidth: '40rem',
});

export default function GroupFormDialog({
  open,
  onClose,
  user,
}: {
  user: User;
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [createGroup, { loading, error }] = useCreateGroup();

  const [name, setName] = useState('');
  const [members, setMembers] = useState<User[]>([]);

  const handleAddMember = (value: User | null) => {
    if (value && !members.includes(value)) {
      setMembers([...members, value]);
    }
  };

  const handleRemoveMember = (member: User) => {
    setMembers((current) => current.filter((m) => m.uuid !== member.uuid));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    createGroup({
      variables: { name: name, members: members.map((m) => m.uuid) },
      onCompleted: (data) => {
        if (data.createGroup.success) {
          alert('Gruppe opprettet!');
          router.push(`${URLS.GROUPS}/${data.createGroup.group.uuid}`);
        }
      },
    });
  };

  return (
    <Dialog fullWidth={true} maxWidth='sm' onClose={onClose} open={open}>
      <DialogTitle>Lag ny gruppe</DialogTitle>
      <DialogContent>
        <Form onSubmit={handleSubmit}>
          <Typography variant='h3'>Navn</Typography>

          <TextField
            label='Lag et gruppenavn'
            onChange={(e) => setName(e.target.value)}
            value={name}
            variant='outlined'
          />
          <Typography variant='h3'>Medlemmer</Typography>
          <AddGroupMembersForm
            handleRemove={handleRemoveMember}
            members={members}
            onChange={handleAddMember}
          />
        </Form>
        {error && <Typography color='error.main'>{error.message}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Avbryt</Button>
        <LoadingButton
          loading={loading}
          onClick={handleSubmit}
          variant='contained'>
          Opprett gruppe
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
