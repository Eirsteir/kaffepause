import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import Paper from "../layout/Paper";
import TimeSlotPicker from './TimeSlotPicker';


export default function BreakPlanner() {
    const [selectedTime, setSelectedTime] = useState('');

    const handleTimeSlotSelected = (time: string) => {
        console.log(time);
      setSelectedTime(time);
    };

    return (
        <>
            <Paper>
                <Container maxWidth="sm"
                    // display='flex'
                    // justifyContent='center'
                    // alignItems='center'
                    // flexDirection='column'
                    // sx={{ maxWidth: '40%'}}
                >
                    <Typography variant='h5'>
                        Plan your break
                    </Typography>
                    
                    <Container>
                        <Typography variant='h6'>
                            Set a time
                        </Typography>

                        <TimeSlotPicker
                            selectedTime={selectedTime}
                            onTimeSlotSelected={handleTimeSlotSelected}
                        />         
                    </Container>

                    <Typography variant='h6'>
                        Set a place 
                    </Typography>

                    

                </Container>
            </Paper>
        </>
    )
}