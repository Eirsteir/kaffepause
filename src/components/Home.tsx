import { Box, Typography } from '@mui/material'

import { IUser } from '../types/User';


interface IProps {
    user: IUser;
}

export default function Home({ user }: IProps) {

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                    Welcome
                </Typography>
            </Box>
        </>
    );
  };