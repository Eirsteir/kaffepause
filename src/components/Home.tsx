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
            <Box sx={{ flexGrow: 1, paddingLeft: '2rem' }}>
                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} mb={2}>
                    Tid for en pause?
                </Typography>

                <BreakPlanner user={user} /> 
            </Box>
        </>
    );
  };