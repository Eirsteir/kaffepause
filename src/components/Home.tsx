import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { IUser } from '../types/User';
import BreakPlanner from './planning/BreakPlanner';


interface IProps {
    user: IUser;
}

export default function Home({ user }: IProps) {

    return (
        <>
            <Box sx={{ flexGrow: 1, padding: '2rem' }}>
                <Typography variant="h4" color='secondary' component="div" sx={{ flexGrow: 1 }}>
                    Time for a break?
                </Typography>

                <BreakPlanner /> 
            </Box>
        </>
    );
  };