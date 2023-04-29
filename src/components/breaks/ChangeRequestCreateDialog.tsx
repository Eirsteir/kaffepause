import { Dayjs } from 'dayjs';
import { useState } from 'react';

import Divider from '@/components/elements/Divider';
import LoadingButton from '@/components/elements/LoadingButton';
import BreakPlannerLocationSelector from '@/components/modules/planning/location/BreakPlannerLocationSelector';
import BreakPlannerTimeSelector from '@/components/modules/planning/time/BreakPlannerTimeSelector';
import dayjs from '@/dayjs';
import { useRequestChange } from '@/hooks/Breaks';
import { Break } from '@/types/Break';
import { Location } from '@/types/Location';
import { User } from '@/types/User';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

type ChangeRequestCreateDialogProps = {
  handleClose: () => void;
  open: boolean;
  initiatorShortName: User['shortName'];
  initialLocation: Location | undefined;
  initialTime: Date;
  breakUuid: Break['uuid'];
};

export default function ChangeRequestCreateDialog({
  handleClose,
  open,
  initiatorShortName,
  initialLocation,
  initialTime,
  breakUuid,
}: ChangeRequestCreateDialogProps) {
  const [location, setLocation] = useState<Location | undefined>(
    initialLocation,
  );
  const [time, setTime] = useState<Dayjs>(dayjs(initialTime));

  const [requestChange, { loading, error }] = useRequestChange();

  const handleSubmit = () => {
    const requestedTime = time.isSame(dayjs(initialTime)) ? null : time;
    const requestedLocationUuid =
      location === null || location === initialLocation ? null : location.uuid;

    requestChange({
      variables: {
        breakUuid: breakUuid,
        requestedTime: requestedTime,
        requestedLocationUuid: requestedLocationUuid,
      },
      onCompleted: () => {
        alert('Forslag sendt!');
        handleClose();
      },
    });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Foreslå ny tid eller nytt sted.</DialogTitle>
      <DialogContent>
        <DialogContentText mb={2}>
          Alle inviterte til pausen vil kunne se forslaget. Kun{' '}
          {initiatorShortName} kan vurdere det.
        </DialogContentText>

        <Typography variant='subtitle2'>
          Gjeldende tid og sted for pausen:{' '}
          <span style={{ textDecoration: 'underline' }}>
            {initialTime && `kl. ${dayjs(initialTime).format('HH:mm')}`}
            {initialLocation && `på/i ${initialLocation.title}`}
          </span>
        </Typography>
        {/* <Typography variant='body2'>
          
        </Typography> */}

        <Divider />
        <Typography variant='subtitle2'>Forslaget ditt:</Typography>

        <Grid container justifyContent='start' p={2} spacing={2}>
          <Grid item md={6} xs={12}>
            <BreakPlannerTimeSelector
              initialTimeSlot={time}
              onSelect={setTime}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <BreakPlannerLocationSelector
              initialLocation={location}
              onSelect={setLocation}
            />
          </Grid>
        </Grid>

        {error && <Typography color='error.main'>{error.message}</Typography>}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={handleClose}>Avbryt</Button>
        <LoadingButton
          loading={loading}
          onClick={handleSubmit}
          variant='contained'>
          Send forslag
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
