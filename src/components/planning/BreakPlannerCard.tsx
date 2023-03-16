import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';

import { getInitialsFromName } from '@/utils';
import { IUser } from '../../types/User';
import TimeSlotPicker from './TimeSlotPicker';
import { TimeSlot } from '@/types/Time';
import Button from '@mui/material/Button';
import { useIniateBreak } from '@/hooks/Breaks';


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface BreakPlannerProps {
    user: IUser;
}

export default function BreakPlannerCard({ user }: BreakPlannerProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [selectedTime, setSelectedTime] = React.useState<TimeSlot | undefined>();
  const [initiateBreak, { loading }] = useIniateBreak({
    variables: {
        addressees: [], //[...invitees].map(user => user.uuid),
        startTime: selectedTime?.time,
        location: "ab856ca9-fd99-4b77-939c-b56af779b369"// location?.uuid || initialLocation?.uuid,
    },
    onCompleted: () => {
        alert("Vent på svar og gjør deg klar til pause!");
    },
    onError: err => alert("Noe gikk galt", err)
});

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const handleTimeSlotSelected = (timeSlot: TimeSlot) => {        
      if (timeSlot.time.isSame(selectedTime?.time))
          setSelectedTime(undefined);
      else 
          setSelectedTime(timeSlot);
  };

  return (
    <Card sx={{ maxWidth: 400 }} >
      <CardHeader
        // avatar={
        //   <Avatar aria-label="break-planner">
        //     {getInitialsFromName(user.name)}
        //   </Avatar>
        // }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
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
            onClick={handleExpandClick}
        >
            kl {selectedTime?.formatted}
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
            Send invitasjon
        </Button>


      </CardActions>

        <Divider />

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Endre tid</Typography>
          <TimeSlotPicker
                selectedTime={selectedTime}
                onTimeSlotSelected={handleTimeSlotSelected}
            />   
            <Button 
                variant='contained' 
                onClick={handleExpandClick}
                sx={{ display: 'block', margin: 'auto', marginTop: '1rem' }} 
                aria-label="bekreft"
            >
                OK
            </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
}
