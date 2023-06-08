import { useSnackbar } from 'material-ui-snackbar-provider';
import * as React from 'react';

import LoadingButton from '@/components/elements/LoadingButton';
import AddGroupMembersForm from '@/components/groups/AddGroupMembersForm';
import { useAddGroupMembers, useEditGroupName } from '@/hooks/Groups';
import { Group } from '@/types/Group';
import { User } from '@/types/User';
import { ApolloError } from '@apollo/client';
import EditIcon from '@mui/icons-material/Edit';
import { Box, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function RenameGroupDialogForm({ group }: { group: Group }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState<string>('');
  const [editGroupName, { loading, error }] = useEditGroupName();

  const snackbar = useSnackbar();

  const handleSubmit = (event) => {
    event.preventDefault();
    editGroupName({
      variables: { groupUuid: group.uuid, name: name },
      onCompleted: () => {
        snackbar.showMessage('Gruppen ble oppdatert!');

        handleClose();
      },
      onError: (e: ApolloError) => snackbar.showMessage(e.message),
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setName('');
    setOpen(false);
  };

  return (
    <Box pb={1}>
      <Button
        onClick={handleClickOpen}
        startIcon={<EditIcon />}
        variant='outlined'>
        Endre navnet på gruppen
      </Button>

      <Dialog fullWidth={true} maxWidth='sm' onClose={handleClose} open={open}>
        <DialogTitle>Endre navnet på gruppen</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hvis du endrer navnet på en gruppe, endres det for alle.
          </DialogContentText>
          <Box mt={2}>
            <TextField
              inputProps={{
                autoCapitalize: 'sentences',
              }}
              label='Navn på gruppen'
              onChange={(e) => setName(e.target.value)}
              size='small'
              sx={{ width: '100%' }}
              value={name}
              variant='outlined'
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Avbryt</Button>
          <LoadingButton
            loading={loading}
            onClick={handleSubmit}
            variant='contained'>
            Lagre
          </LoadingButton>
        </DialogActions>
        {error && <Typography color='error.main'>{error.message}</Typography>}
      </Dialog>
    </Box>
  );
}
