import { useState } from 'react';

import ChangeRequestCreateDialog from '@/components/breaks/ChangeRequestCreateDialog';
import dayjs from '@/dayjs';
import { Break, ChangeRequest } from '@/types/Break';
import { Location } from '@/types/Location';
import { User } from '@/types/User';
import { Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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

  return (
    <>
      <Tooltip
        placement='top'
        title='Hvis noe ikke passer for deg kan du foreslå et nytt tidspunkt eller sted som alle inviterte kan se.'>
        <Typography sx={{ marginBottom: '1rem' }} variant='h3'>
          Endringsforslag
        </Typography>
      </Tooltip>
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
          <Box>
            <Button onClick={() => toggleOpen(true)} variant='contained'>
              Foreslå en endring
            </Button>
          </Box>
        </>
      )}

      <ChangeRequestCreateDialog
        breakUuid={breakUuid}
        handleClose={handleClose}
        initialLocation={initialLocation}
        initialTime={initialTime}
        initiatorShortName={initiatorShortName}
        open={open}
      />
    </>
  );
}
