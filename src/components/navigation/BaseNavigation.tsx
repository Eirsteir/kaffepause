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
          paddingLeft: '1rem',
          paddingRight: '1rem',
          justifyContent: 'center',
        }}>
        <Toolbar>
          <Typography component='a' href={URLS.LANDING} sx={{ flexGrow: 1, fontWeight: 600 }} variant='h5'>
            kaffepause
          </Typography>

          {children}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
