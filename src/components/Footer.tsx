import React, { FC, ReactElement } from 'react';

import { Box, Container, Grid, Typography } from '@mui/material';

export const Footer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#F7F7F7',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        borderTop: '1px solid #DDDDDD',
      }}>
      <Container maxWidth='lg'>
        <Grid alignItems='center' container direction='column'>
          <Grid item xs={12}>
            <Typography color='text.secondary' variant='subtitle2'>
              @ {new Date().getFullYear()} Kaffepause.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color='text.secondary' variant='subtitle2'>
              Hjem - Personvern - Kontakt
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
