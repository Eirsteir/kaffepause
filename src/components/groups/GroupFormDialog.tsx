import { useState } from 'react';

import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  maxWidth: '40rem',
});

const SearchWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
});

const MembersList = styled('ul')({
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

const ListItem = styled('li')({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '0.5rem',
});

const MemberAvatar = styled('div')({
  width: '3rem',
  height: '3rem',
  borderRadius: '50%',
  backgroundColor: '#ddd',
});

const MemberName = styled(Typography)({
  fontWeight: 'bold',
});

export default function GroupFormDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [members, setMembers] = useState([]);

  const handleAddMember = (event, value) => {
    if (!members.includes(value)) {
      setMembers([...members, value]);
    }
  };

  const handleRemoveMember = (member) => {
    setMembers(members.filter((m) => m !== member));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Lag ny gruppe</DialogTitle>
      <DialogContent>
        <Form onSubmit={handleSubmit}>
          <TextField
            label='Gruppenavn'
            onChange={(e) => setName(e.target.value)}
            required
            value={name}
            variant='outlined'
          />
          <Autocomplete
            freeSolo
            onInputChange={handleAddMember}
            options={['Alice', 'Bob', 'Charlie', 'David']}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Legg til medlemmer'
                variant='outlined'
              />
            )}
          />
          {members.length > 0 && (
            <MembersList>
              {members.map((member, index) => (
                <ListItem key={index}>
                  <MemberAvatar />
                  <MemberName>{member}</MemberName>
                  <Button
                    onClick={() => handleRemoveMember(member)}
                    size='small'
                    variant='outlined'>
                    Fjern
                  </Button>
                </ListItem>
              ))}
            </MembersList>
          )}
        </Form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Avbryt</Button>
        <Button onClick={handleSubmit} variant='contained'>
          Opprett gruppe
        </Button>
      </DialogActions>
    </Dialog>
  );
}
