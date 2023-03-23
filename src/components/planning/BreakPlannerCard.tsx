import * as React from 'react';

import { useIniateBreak } from '@/hooks/Breaks';
import { useTimeSlots } from '@/hooks/utils';
import { TimeSlot } from '@/types/Time';
import { IUser } from '@/types/User';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import BreakPlannerFriendsSelector from './BreakPlannerFriendsSelector';
import { BreakPlannerLocationSelector } from './BreakPlannerLocationSelector';
import { BreakPlannerTimeSelector } from './BreakPlannerTimeSelector';

enum EXPAND_OPTION {
  NOT_EXPANDED,
  TIME,
  LOCATION,
  INVITEES,
}

interface BreakPlannerProps {
  user: IUser;
  breakInitiatedCallback: () => void;
}

const DEFAULT_LOCATION = {
  uuid: 'ab856ca9-fd99-4b77-939c-b56af779b369',
  title: 'Gløshaugen',
};

export default function BreakPlannerCard({ user, breakInitiatedCallback }: BreakPlannerProps) {
  const [expandedComponent, setExpandedComponent] = React.useState<EXPAND_OPTION>(EXPAND_OPTION.NOT_EXPANDED);
  const [_, selectedTime, setSelectedTime] = useTimeSlots();
  const [location, setLocation] = React.useState(user.preferredLocation || DEFAULT_LOCATION);
  const [invitees, setInvitees] = React.useState<IUser[]>([]);

  const [initiateBreak, { loading }] = useIniateBreak({
    variables: {
      addressees: invitees.map((user) => user.uuid),
      startTime: selectedTime?.time,
      location: location.uuid,
    },
    onCompleted: ({ initiateBreak }) => {
      if (initiateBreak.success) breakInitiatedCallback(); // TODO: handle errors
    },
    onError: (err) => alert('Noe gikk galt', err),
  });

  const isExpanded = () => expandedComponent !== EXPAND_OPTION.NOT_EXPANDED;

  const handleExpandClick = (expand: EXPAND_OPTION) => {
    if (expandedComponent === expand) return setExpandedComponent(EXPAND_OPTION.NOT_EXPANDED);
    setExpandedComponent(expand);
  };

  const handleTimeSlotSelected = (timeSlot: TimeSlot) => {
    setSelectedTime(timeSlot);
  };

  const handleLocationSelected = (newLocation: any) => setLocation(newLocation);

  const handleInviteesSelected = (invitees: IUser[]) => {
    setInvitees(invitees);
    handleExpandClick(EXPAND_OPTION.NOT_EXPANDED);
  };

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardHeader title={<Typography variant='h6'>Planlegg en pause</Typography>} />
      <CardContent>
        <Typography color='text.secondary' display='inline' variant='body1'>
          Inviterer til pause&nbsp;
        </Typography>
        <Typography
          display='inline'
          onClick={() => handleExpandClick(EXPAND_OPTION.TIME)}
          sx={{ textDecoration: 'underline', fontWeight: 600, cursor: 'pointer' }}
          variant='body1'>
          kl {selectedTime.formatted}
        </Typography>
        &nbsp;på&nbsp;
        <Typography
          display='inline'
          onClick={() => handleExpandClick(EXPAND_OPTION.LOCATION)}
          sx={{ textDecoration: 'underline', fontWeight: 600, cursor: 'pointer' }}
          variant='body1'>
          {location.title}
        </Typography>
        <Typography color='text.secondary' display='inline' variant='body1'>
          .
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites' onClick={() => handleExpandClick(EXPAND_OPTION.LOCATION)}>
          <LocationOnOutlinedIcon fontSize='small' />
        </IconButton>
        <IconButton aria-label='add to favorites' onClick={() => handleExpandClick(EXPAND_OPTION.TIME)}>
          <AccessTimeOutlinedIcon fontSize='small' />
        </IconButton>
        <IconButton aria-label='add to favorites' onClick={() => handleExpandClick(EXPAND_OPTION.INVITEES)}>
          <Groups2OutlinedIcon fontSize='small' />
        </IconButton>

        <Button aria-label='send-invitation' onClick={() => initiateBreak()} sx={{ marginLeft: 'auto' }} variant='contained'>
          {loading ? 'Laster' : 'Send invitasjon'}
        </Button>
      </CardActions>

      <Divider />

      <Collapse in={isExpanded()} timeout='auto' unmountOnExit>
        <CardContent>
          {expandedComponent === EXPAND_OPTION.TIME && (
            <BreakPlannerTimeSelector
              handleExpandClick={() => handleExpandClick(EXPAND_OPTION.NOT_EXPANDED)}
              handleTimeSlotSelected={handleTimeSlotSelected}
              selectedTime={selectedTime}
            />
          )}

          {expandedComponent === EXPAND_OPTION.LOCATION && (
            <BreakPlannerLocationSelector
              handleExpandClick={() => handleExpandClick(EXPAND_OPTION.NOT_EXPANDED)}
              handleLocationSelected={handleLocationSelected}
              selectedLocation={location}
            />
          )}

          {expandedComponent === EXPAND_OPTION.INVITEES && (
            <BreakPlannerFriendsSelector initialSelection={invitees} onSubmit={handleInviteesSelected} user={user} />
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}
