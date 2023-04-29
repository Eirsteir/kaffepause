import URLS from '@/URLS';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

type Props = {
  children?: React.ReactNode;
};

export default function BaseNavigation({ children }: Props) {
  return (
    <Box sx={{ flexGrow: 1, height: '80px', background: 'transparent' }}>
      <AppBar
        elevation={0}
        position='static'
        sx={{
          boxShadow: 'rgba(0,0,0,0.08) 0 1px 1px',
          height: '80px',
          paddingLeft: '3.5rem',
          paddingRight: '3.5rem',
          justifyContent: 'center',
        }}>
        <Toolbar>
          <Box sx={{ flex: '1 1 0px' }}>
            <Typography
              component='a'
              href={URLS.LANDING}
              sx={{ fontWeight: 600 }}
              variant='h5'>
              kaffepause
            </Typography>
          </Box>
          {children}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
