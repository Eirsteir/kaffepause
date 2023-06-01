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
        <Grid alignItems='center' container spacing={0}>
          <Grid item xs={12}>
            <Typography color='text.primary' variant='subtitle2'>
              © 2023 Kaffepause · Laget med 💙 av meg. Jeg setter stor pris på
              tilbakemeldinger! Kontakt meg gjerne på Instagram eller GitHub.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
