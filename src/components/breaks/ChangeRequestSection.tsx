import { Dayjs } from 'dayjs';
import { useState } from 'react';

import CenteredBox from '@/components/elements/CenteredBox';
import LoadingButton from '@/components/elements/LoadingButton';
import BreakPlannerLocationSelector from '@/components/modules/planning/location/BreakPlannerLocationSelector';
import BreakPlannerTimeSelector from '@/components/modules/planning/time/BreakPlannerTimeSelector';
import dayjs from '@/dayjs';
import { useRequestChange } from '@/hooks/Breaks';
import { Break, ChangeRequest } from '@/types/Break';
import { Location } from '@/types/Location';
import { User } from '@/types/User';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const ChangeRequestItem = ({
  changeRequest,
}: {
  changeRequest: ChangeRequest;
}) => {
  const time =
    changeRequest.requestedTime &&
    dayjs(changeRequest.requestedTime).format('HH:mm');
  const locationTitle = changeRequest.requestedLocation?.title;

  return (
    <Typography mb={1} variant='subtitle2'>
      {changeRequest.requestedBy.shortName} foreslo:{' '}
      <span style={{ textDecoration: 'underline' }}>
        {time && `kl. ${time}`}
        {locationTitle && `på/i ${locationTitle}`}
      </span>
    </Typography>
  );
};

export default function ChangeRequestSubSection({
  changeRequests,
  initialLocation,
  initialTime,
  initiatorShortName,
  breakUuid,
  isExpired,
}: {
  breakUuid: Break['uuid'];
  changeRequests: ChangeRequest[];
  initialLocation: Location | undefined;
  initialTime: Date;
  initiatorShortName: User['shortName'];
  isExpired: Break['isExpired'];
}) {
  const [open, toggleOpen] = useState<boolean>(false);
  const handleClose = () => toggleOpen(false);

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
        toggleOpen(false);
      },
    });
  };
  return (
    <>
      <Typography sx={{ marginBottom: '1rem' }} variant='h3'>
        Endringsforslag
      </Typography>
      {isExpired ? (
        <Typography mb={1.5} variant='subtitle2'>
          Du kan ikke komme med endringsforslag lengre.
        </Typography>
      ) : (
        <>
          {changeRequests.length === 0 && (
            <Typography mb={1.5} variant='subtitle2'>
              Det er ingen endringsforslag enda.
            </Typography>
          )}
          {changeRequests.map((changeRequest, i) => (
            <ChangeRequestItem changeRequest={changeRequest} key={i} />
          ))}
          <CenteredBox>
            <Button onClick={() => toggleOpen(true)} variant='contained'>
              Foreslå en endring
            </Button>
          </CenteredBox>
        </>
      )}

      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Foreslå ny tid eller nytt sted.</DialogTitle>
        <DialogContent>
          <DialogContentText mb={2}>
            Alle inviterte til pausen vil kunne se forslaget. Kun{' '}
            {initiatorShortName} kan vurdere det.
          </DialogContentText>

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
    </>
  );
}
