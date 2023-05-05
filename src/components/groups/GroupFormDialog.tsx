import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import Avatar from '@/components/elements/Avatar';
import LoadingButton from '@/components/elements/LoadingButton';
import { useCreateGroup } from '@/hooks/Groups';
import { User } from '@/types/User';
import URLS from '@/URLS';
import {
  Autocomplete,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
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
  const friends = useMemo(
    () =>
      user !== undefined ? user.friends.edges.map((edge) => edge.node) : [],
    [user],
  );

  const [name, setName] = useState('');
  const [members, setMembers] = useState<User[]>([]);

  const handleAddMember = (event, value) => {
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
          <Autocomplete
            freeSolo
            getOptionLabel={(option) => option.name}
            noOptionsText='Legg til venner for å legge dem til i gruppen'
            onChange={handleAddMember}
            options={friends}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Legg til medlemmer'
                variant='outlined'
              />
            )}
          />
          {members.length > 0 && (
            <List>
              {members.map((member, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    // <IconButton aria-label='delete' edge='end' onClick={() => handleRemoveMember(member)} size='small'>
                    //   <DeleteIcon />
                    // </IconButton>
                    <Button
                      onClick={() => handleRemoveMember(member)}
                      size='small'
                      variant='outlined'>
                      Fjern
                    </Button>
                  }>
                  <ListItemAvatar>
                    <Avatar user={member} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={member.name}
                    // secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>
              ))}
            </List>
          )}
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
