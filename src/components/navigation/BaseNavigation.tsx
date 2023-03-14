import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'


import Link from './Link';
import URLS from '@/URLS';

type Props = {
    children?: React.ReactNode;
}

export default function BaseNavigation({ children }: Props) {
    return (
        <Box sx={{ flexGrow: 1, padding: '.5rem', borderBottom: '1px solid #DDD', marginBottom: '1rem', background: 'transparent' }}>
          <AppBar position="static" elevation={0}>
            <Toolbar>
              <Typography variant="h5" component="a" color='secondary' href={URLS.LANDING} sx={{ flexGrow: 1 }}>
                kaffe
              </Typography>

                {children}
                
            </Toolbar>
          </AppBar>
        </Box>
    )
}