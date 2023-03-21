import * as React from 'react';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
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


enum EXPAND_OPTION {
  TIME,
  LOCATION,
  COMMENT,
}

interface BreakPlannerProps {
    user: IUser;
    breakInitiatedCallback: () => void
}

export default function BreakPlannerCard({ user, breakInitiatedCallback }: BreakPlannerProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [expandedComponent, setExpandedComponent] = React.useState<EXPAND_OPTION | undefined>(undefined);
  const [_, selectedTime, setSelectedTime] = useTimeSlots();
  const [initiateBreak, { loading }] = useIniateBreak({
    variables: {
        addressees: [], //[...invitees].map(user => user.uuid),
        startTime: selectedTime?.time,
        location: "ab856ca9-fd99-4b77-939c-b56af779b369"// location?.uuid || initialLocation?.uuid,
    },
    onCompleted: ({ initiateBreak }) => {
      if (initiateBreak.success)
        breakInitiatedCallback(); // TODO: handle errors
    },
    onError: err => alert("Noe gikk galt", err)
});

  const handleExpandClick = (expand: EXPAND_OPTION | undefined) => {
    setExpandedComponent(expand);
    setExpanded(!expanded);
  };

  const handleTimeSlotSelected = (timeSlot: TimeSlot) => {        
      setSelectedTime(timeSlot);
  };

  // TODO: venner
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardHeader
        title={
            <Typography sx={{fontWeight: 600}}>
                Planlegg en pause
            </Typography>
        }
        // subheader="Venner ^"
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
            onClick={handleExpandClick}
        >
            Gløshaugen
        </Typography>

      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleExpandClick} aria-label="add to favorites">
          <LocationOnOutlinedIcon fontSize='small'/>
        </IconButton>
        <IconButton onClick={handleExpandClick} aria-label="add to favorites">
          <AccessTimeOutlinedIcon fontSize='small'/>
        </IconButton>        
        <IconButton onClick={handleExpandClick} aria-label="add to favorites">
          <AddCommentOutlinedIcon fontSize='small'/>
        </IconButton>        
        <Button 
            variant='contained' 
            sx={{ marginLeft: 'auto' }} 
            aria-label="send-invitation"
            onClick={initiateBreak}
        >
            {loading ? 'Laster' : 'Send invitasjon'}
        </Button>


      </CardActions>

        <Divider />

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          { expandedComponent == EXPAND_OPTION.TIME && 
            <BreakPlannerTimeSelector 
              selectedTime={selectedTime} 
              handleTimeSlotSelected={handleTimeSlotSelected}
              handleExpandClick={() => handleExpandClick(undefined)}
            />
          } 


        </CardContent>
      </Collapse>
    </Card>
  );
}
