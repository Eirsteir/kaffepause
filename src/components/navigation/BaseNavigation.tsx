import URLS from '@/URLS';
import { Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

type Props = {
  children?: React.ReactNode;
};

export default function BaseNavigation({ children }: Props) {
  return (
    <Box sx={{ flexGrow: 1, height: '80px' }}>
      <AppBar
        elevation={0}
        sx={{
          boxShadow: 'rgba(0,0,0,0.08) 0 1px 1px',
          height: '80px',
          justifyContent: 'center',
        }}>
        <Container maxWidth='lg'>
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
        </Container>
      </AppBar>
    </Box>
  );
}
