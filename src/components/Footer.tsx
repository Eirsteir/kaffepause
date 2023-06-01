import React, { FC, ReactElement } from 'react';

import Divider from '@/components/elements/Divider';
import { Box, Container, Grid, Typography } from '@mui/material';

export const Footer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        width: '100%',
        paddingBottom: '2rem',
        bottom: 0,
        position: 'absolute',
      }}>
      <Container maxWidth='lg'>
        <Divider />
        <Grid alignItems='center' container spacing={1}>
          <Grid item sm={6} xs={12}>
            <Typography color='text.primary' variant='subtitle2'>
              © 2023 Kaffepause · Laget med 💙 av meg.
            </Typography>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Typography color='text.primary' variant='subtitle2'>
              Jeg setter stor pris på tilbakemeldinger! Kontakt meg gjerne på
              Instagram eller GitHub.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
