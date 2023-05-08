import * as React from 'react';

import LoadingButton from '@/components/elements/LoadingButton';
import AddGroupMembersForm from '@/components/groups/AddGroupMembersForm';
import { useAddGroupMembers } from '@/hooks/Groups';
import { Group } from '@/types/Group';
import { User } from '@/types/User';
import AddIcon from '@mui/icons-material/Add';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddMembersDialogForm({ group }: { group: Group }) {
  const [open, setOpen] = React.useState(false);

  const [users, setUsers] = React.useState<User[]>([]);
  const [addGroupMembers, { loading, error }] = useAddGroupMembers();

  const handleAddMember = (value) => {
    if (value && !users.includes(value)) {
      setUsers([...users, value]);
    }
  };

  const handleRemoveMember = (newUser: User) => {
    setUsers((current) => current.filter((u) => u.uuid !== newUser.uuid));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addGroupMembers({
      variables: { groupUuid: group.uuid, userUuids: users.map((u) => u.uuid) },
      onCompleted: () => {
        alert('Brukerne ble lagt til!');
        handleClose();
      },
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setUsers([]);
    setOpen(false);
  };
  return (
    <div>
      <Button
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
        variant='contained'>
        Legg til medlemmer
      </Button>
      <Dialog fullWidth={true} maxWidth='sm' onClose={handleClose} open={open}>
        <DialogTitle>Legg til personer</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <AddGroupMembersForm
              handleRemove={handleRemoveMember}
              members={users}
              onChange={handleAddMember}
              size='small'
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Avbryt</Button>
          <LoadingButton
            loading={loading}
            onClick={handleSubmit}
            variant='contained'>
            Legg til medlemmer
          </LoadingButton>
        </DialogActions>
        {error && <Typography color='error.main'>{error.message}</Typography>}
      </Dialog>
    </div>
  );
}
