import * as React from 'react';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useIniateBreak } from '@/hooks/Breaks';
import { useTimeSlots } from '@/hooks/utils';
import { TimeSlot } from '@/types/Time';
import Button from '@mui/material/Button';
import { IUser } from '../../types/User';
import { BreakPlannerTimeSelector } from './BreakPlannerTimeSelector';
import { BreakPlannerLocationSelector } from './BreakPlannerLocationSelector';


enum EXPAND_OPTION {
  NOT_EXPANDED,
  TIME,
  LOCATION,
  INVITEES,
}

interface BreakPlannerProps {
    user: IUser;
    breakInitiatedCallback: () => void
}

const DEFAULT_LOCATION = {
  uuid: "ab856ca9-fd99-4b77-939c-b56af779b369", 
  title: 'Gløshaugen'
}

export default function BreakPlannerCard({ user, breakInitiatedCallback }: BreakPlannerProps) {
  const [expandedComponent, setExpandedComponent] = React.useState<EXPAND_OPTION>(EXPAND_OPTION.NOT_EXPANDED);
  const [_, selectedTime, setSelectedTime] = useTimeSlots();
  const [location, setLocation] = React.useState(user.preferredLocation || DEFAULT_LOCATION);

  const [initiateBreak, { loading }] = useIniateBreak({
    variables: {
        addressees: [], //[...invitees].map(user => user.uuid),
        startTime: selectedTime?.time,
        location: location.uuid,
    },
    onCompleted: ({ initiateBreak }) => {
      if (initiateBreak.success)
        breakInitiatedCallback(); // TODO: handle errors
    },
    onError: err => alert("Noe gikk galt", err)
});

const isExpanded = () => expandedComponent !== EXPAND_OPTION.NOT_EXPANDED;
  
const handleExpandClick = (expand: EXPAND_OPTION) => {
      setExpandedComponent(expand);
  };

  const handleTimeSlotSelected = (timeSlot: TimeSlot) => {        
      setSelectedTime(timeSlot);
  };

  const handleLocationSelected = (newLocation: any) => setLocation(newLocation);

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardHeader
        title={
            <Typography sx={{fontWeight: 600}}>
                Planlegg en pause
            </Typography>
        }
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary" display="inline">
          Du inviterer til pause&nbsp;
        </Typography>
        <Typography 
            variant="body1" 
            sx={{ textDecoration: 'underline', fontWeight: 600, cursor: 'pointer'}}
            display="inline"
            onClick={() => handleExpandClick(EXPAND_OPTION.TIME)}
        >
            kl {selectedTime.formatted}
        </Typography>
        &nbsp;på&nbsp; 
        <Typography 
            variant="body1" 
            sx={{ textDecoration: 'underline', fontWeight: 600, cursor: 'pointer'}}
            display="inline"
            onClick={() => handleExpandClick(EXPAND_OPTION.LOCATION)}
        >
            {location.title} 

        </Typography>

      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={() => handleExpandClick(EXPAND_OPTION.LOCATION)} aria-label="add to favorites">
          <LocationOnOutlinedIcon fontSize='small'/>
        </IconButton>
        <IconButton onClick={() => handleExpandClick(EXPAND_OPTION.TIME)} aria-label="add to favorites">
          <AccessTimeOutlinedIcon fontSize='small'/>
        </IconButton>        
        <IconButton onClick={() => handleExpandClick(EXPAND_OPTION.INVITEES)} aria-label="add to favorites">
          <Groups2OutlinedIcon fontSize='small'/>
        </IconButton>        
        
        <Button 
            variant='contained' 
            sx={{ marginLeft: 'auto' }} 
            aria-label="send-invitation"
            onClick={() => initiateBreak()}
        >
            {loading ? 'Laster' : 'Send invitasjon'}
        </Button>


      </CardActions>

      <Divider />

      <Collapse in={isExpanded()} timeout="auto" unmountOnExit>
        <CardContent>
          { expandedComponent == EXPAND_OPTION.TIME && 
            <BreakPlannerTimeSelector 
              selectedTime={selectedTime} 
              handleTimeSlotSelected={handleTimeSlotSelected}
              handleExpandClick={() => handleExpandClick(EXPAND_OPTION.NOT_EXPANDED)}
            />
          } 

          { expandedComponent == EXPAND_OPTION.LOCATION && 
            <BreakPlannerLocationSelector 
              selectedLocation={location} 
              handleLocationSelected={handleLocationSelected}
              handleExpandClick={() => handleExpandClick(EXPAND_OPTION.NOT_EXPANDED)}
            />
          } 


        </CardContent>
      </Collapse>
    </Card>
  );
}
