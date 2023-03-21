import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'


import URLS from '@/URLS';

type Props = {
    children?: React.ReactNode;
}

export default function BaseNavigation({ children }: Props) {
    return (
        <Box sx={{ flexGrow: 1, padding: '.5rem', borderBottom: '1px solid #FFF', marginBottom: '1rem', background: 'transparent' }}>
          <AppBar position="static" elevation={0}>
            <Toolbar>
              <Typography variant="h5" component="a" href={URLS.LANDING} sx={{ flexGrow: 1 }}>
                kaffe
              </Typography>

                {children}
                
            </Toolbar>
          </AppBar>
        </Box>
    )
}